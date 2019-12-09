import { convert } from './util.js';
import { styleSnakeHead, styleSnakeBody, styleSnakeTail } from './snake_module/style-for-snake.js';

export { Game };

class Game {
    play; // a setInterval uses for running game
    snake = []; // snake's nodes (different to snake object)

    constructor(body, snakeO, bait, step, direct, directN) {
        this.snakeO = snakeO;
        this.bait = bait;
        this.step = step;
        this.direct = direct;
        this.directN = directN;

        this.snake = [...snakeO.nodes];
        this.body = body;
    }

    start() {
        // display bait
        this.bait.displayBait();
        this.bait.createBait();

        // observe keyboard click to change the direct of snake
        this.body.addEventListener('keyup', e => {
            this.navigateSnake(e, this);
        });

        // run game
        this.play = setInterval(() => {
            this.moveSnake();
            this.checkHead();
            if (this.checkEat()) {
                this.snakeO.pushNode();
                this.snake = this.snakeO.nodes;
                this.bait.createBait();
            }
        }, 140);
    }

    navigateSnake(e, game) {
        if (((e.keyCode === 37 && game.directN !== 39) | (e.keyCode === 39 && game.directN !== 37) |
            (e.keyCode === 38 && game.directN !== 40) | (e.keyCode === 40 && game.directN !== 38)) &&
            e.keyCode !== game.directN) {
            switch (e.keyCode) {
                case 37:
                    game.direct = 'LEFT';
                    break;
                case 38:
                    game.direct = 'UP';
                    break;
                case 39:
                    game.direct = 'RIGHT';
                    break;
                case 40:
                    game.direct = 'DOWN';
                    break;
            };
        }
    }

    moveSnake() {
        //save the information of snake's tail
        this.snakeO.setTail(this.snake[this.snake.length - 1]);

        // move snake's tail to the right by 1 unit
        this.assignNodeAToNodeB(this.snake[this.snake.length - 2], this.snake[this.snake.length - 1]);

        // move the elements of the Snake to the right by 1 unit
        for (let i = this.snake.length - 2; i >= 1; i--) {
            //set border radius of the previous node for the following node.
            this.snake[i].style.borderRadius = this.snake[i - 1].style.borderRadius;

            this.assignNodeAToNodeB(this.snake[i - 1], this.snake[i]);
        }

        // shadow for snake's body
        styleSnakeBody(this.snake);

        // add style for snake's tail
        styleSnakeTail(this.snake[this.snake.length - 1], this.snake[this.snake.length - 2]);

        // assign a new coordinate to snake's head
        this.assignSnakeHead();
    }

    // assgin a node for another
    assignNodeAToNodeB(A, B) {
        B.style.left = A.style.left;
        B.style.top = A.style.top;
    }

    // assign a new coordinate to snake's head
    assignSnakeHead() {
        let newX, newY;
        let oldDirect = this.directN;
        switch (this.direct) {
            case 'UP':
                newY = convert(this.snake[0].style.top) - this.step;
                this.snake[0].style.top = `${newY}rem`;
                this.directN = 38;
                break;
            case 'DOWN':
                newY = convert(this.snake[0].style.top) + this.step;
                this.snake[0].style.top = `${newY}rem`;
                this.directN = 40;
                break;
            case 'LEFT':
                newX = convert(this.snake[0].style.left) - this.step;
                this.snake[0].style.left = `${newX}rem`;
                this.directN = 37;
                break;
            case 'RIGHT':
                newX = convert(this.snake[0].style.left) + this.step;
                this.snake[0].style.left = `${newX}rem`;
                this.directN = 39;
                break;
        }

        // add style for snake's head
        styleSnakeHead(this.snake[0], this.snake[1], this.direct, oldDirect);
    }

    // Checking if snake ate a bait or not
    checkEat() {
        let x = convert(this.snake[0].style.left);
        let y = convert(this.snake[0].style.top);

        let check = false;
        if (x === this.bait.x && y === this.bait.y) check = true;

        return check;
    }

    // check if snake's head touches the wall
    checkHead() {
        let x = convert(this.snake[0].style.left);
        let y = convert(this.snake[0].style.top);

        if (x < 2 | x > 50 | y < 2 | y > 50) {
            this.body.removeEventListener('keyup', this.navigateSnake);
            clearInterval(this.play);
        }
    }
}

