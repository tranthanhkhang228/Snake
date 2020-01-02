import { convert } from './util.js';
import { Snake } from '../snake_module/snake.js';
import { styleSnakeHead, styleSnakeTail } from '../snake_module/style-for-snake.js';

export { Game };

class Game {
    play; // a setInterval uses for running game
    snake = []; // snake's nodes (different to snake object)
    point = 0; // game's point

    _setDirect; // use for removeEventListener
    _setFirstDirect; // use for removeEventListener

    constructor(body, gameFrame, snakeO, bait, step, direct, directN) {
        this.gamePoint = document.querySelector('.point'); // paragraph use for displaying game's point
        this.gameRestart = document.querySelector('.game-play__restart'); // button restart game
        this.gamePause = document.querySelector('.game-play__pause'); // button pause game

        this.body = body; // body HTML element
        this.gameFrame = gameFrame;
        this.step = step; // snake's step

        this.bait = bait;

        this.snakeO = snakeO; // snake object
        this.snake = [...this.snakeO.nodes]; // snake's nodes array

        this.direct = direct; // direct use for navigating snake
        this.directN = directN; // snake's current direct
    }

    start() {
        // display bait
        this.bait.displayBait();
        this.bait.createBait();

        let _game = this;
        // observe keyboard click to change snake's direct
        this.body.addEventListener('keyup', function _setDirect(e) {
            _game.navigateSnake(e, _game);
            _game._setDirect = _setDirect;
        });

        // observe to restart game
        this.gameRestart.addEventListener('click', function _restart(e) {
            _game.restart();
            this.removeEventListener('click', _restart); // remove to save memory and avoid save redundant event too much time
        });

        // observe to pause game
        this.gamePause.addEventListener('click', function _pause(e) {
            _game.pause();
            this.removeEventListener('click', _pause); // remove to save memory and avoid save redundant event too much time
        });

        // run game
        this.play = setInterval(() => {
            this.moveSnake();
            this.checkLose();
            if (this.checkEat()) {
                this.snakeO.pushNode();
                this.snake = this.snakeO.nodes;
                this.bait.createBait();

                this.addPoint();
            }
        }, 140);
    }

    restart() {
        clearInterval(this.play); // stop current game
        this.body.removeEventListener('keyup', this._setDirect); // remove observable of changing snake's direct to avoid set redundant direct

        // remove current snake from game frame
        let snake = document.querySelectorAll('.body');
        for (let i = 0; i < snake.length; i++) {
            snake[i].parentNode.removeChild(snake[i]);
        }

        // create a new snake
        this.snakeO = new Snake(this.gameFrame, [{ x: 20, y: 20 }, { x: 22, y: 20 }, { x: 24, y: 20 }]);
        this.snake = [...this.snakeO.nodes];

        // reset game's point
        this.point = 0;
        this.gamePoint.textContent = this.point;

        // set the new direct to start game again
        let _game = this;
        this.body.addEventListener('keyup', function _setFirstDirect(e) {
            _game._setFirstDirect = _setFirstDirect;
            _game.setFirstDirect(e);
        });
    }

    // set the first direct when restart game
    setFirstDirect(e) {
        let check = false;

        switch (e.keyCode) {
            case 37:
                this.direct = 'LEFT';
                this.directN = 37;

                check = true;
                break;
            case 38:
                this.direct = 'UP';
                this.directN = 38;

                check = true;
                break;
            case 40:
                this.direct = 'DOWN';
                this.directN = 40;

                check = true;
                break;
        };

        if (check) {
            this.body.removeEventListener('keyup', this._setFirstDirect);

            this.start();
        }
    }

    pause() {

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

    // add point when snake eat a bait
    addPoint() {
        this.point++;
        this.gamePoint.textContent = this.point;
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
    checkLose() {
        let x = convert(this.snake[0].style.left);
        let y = convert(this.snake[0].style.top);

        if (x < 2 | x > 50 | y < 2 | y > 50) {
            this.body.removeEventListener('keyup', this.navigateSnake);
            clearInterval(this.play);
        }

        for (let i = 1; i < this.snake.length; i++) {
            let nodeX = convert(this.snake[i].style.left);
            let nodeY = convert(this.snake[i].style.top);
            if (nodeX === x && nodeY === y) {
                this.body.removeEventListener('keyup', this.navigateSnake);
                clearInterval(this.play);
            }
        }
    }
}

