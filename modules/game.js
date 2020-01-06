import { convert, createCourt } from './util.js';
import { Snake } from '../snake_module/snake.js';
import { Bait } from './bait.js';
import { styleSnakeHead, styleSnakeTail } from '../snake_module/style-for-snake.js';

export { Game };

class Game {
    play; // a setInterval uses for running game
    snake = []; // snake's nodes (different to snake object)
    point = 0; // game's point

    // event listeners, save to use for removeEventListenr when it's necessary
    _setFirstDirect;
    _setDirect;
    _restart;

    constructor(body, gameFrame, snakeO, bait, step, direct, directN) {
        this.gamePoint = document.querySelector('.point'); // paragraph use for displaying game's point
        this.gameRestart = document.querySelector('.game-play__restart'); // button restart game

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

        // add listeners to control game
        this.addListener();

        this.runGame();
    }

    restart() {
        let _game = this;

        // reset the current game's point
        this.point = 0;
        this.gamePoint.textContent = this.point;

        // remove all event listeners to avoid stacking up events
        this.removeListener();

        // stop the current game
        clearInterval(this.play);

        // delete the current snake from game frame
        let oSnake = document.querySelectorAll('.body');
        oSnake.forEach(element => element.parentNode.removeChild(element));

        // create a new snake
        this.snakeO = new Snake(this.gameFrame, [{ x: 20, y: 20 }, { x: 22, y: 20 }, { x: 24, y: 20 }]);
        this.snake.length = 0;
        this.snake = [...this.snakeO.nodes];

        // create a new bait
        this.bait.createBait();

        // observe to start game again
        this.body.addEventListener('keyup', function _setFirstDirect(e) {
            console.log('setFirst');

            _game._setFirstDirect = _setFirstDirect;
            _game.checkToRunGameAgain(e);
        })
    }

    pause() {
    }

    runGame() {
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

    // use to navigate snake, restart and pause game
    addListener() {
        let _game = this;

        // observe keyboard click to change snake's direct
        this.body.addEventListener('keyup', function _setDirect(e) {
            console.log('direct');
            _game._setDirect = _setDirect;

            _game.navigateSnake(e);
        });

        // observe to restart game
        this.gameRestart.addEventListener('click', function _restart(e) {
            console.log('restart');
            _game._restart = _restart;

            e.target.blur();

            _game.restart();
        });
    }

    // remove all event listeners to avoid stacking up events
    removeListener() {
        this.body.removeEventListener('keyup', this._setDirect);
        this.gameRestart.removeEventListener('click', this._restart);
    }

    checkToRunGameAgain(e) {
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
            // remove setFirstDirect to avoid stacking up events
            this.body.removeEventListener('keyup', this._setFirstDirect);

            // run game again
            this.addListener();
            this.runGame();
        }
    };

    navigateSnake(e) {
        if (((e.keyCode === 37 && this.directN !== 39) | (e.keyCode === 39 && this.directN !== 37) |
            (e.keyCode === 38 && this.directN !== 40) | (e.keyCode === 40 && this.directN !== 38)) &&
            e.keyCode !== this.directN) {
            switch (e.keyCode) {
                case 37:
                    this.direct = 'LEFT';
                    break;
                case 38:
                    this.direct = 'UP';
                    break;
                case 39:
                    this.direct = 'RIGHT';
                    break;
                case 40:
                    this.direct = 'DOWN';
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
        let _game = this;

        let x = convert(this.snake[0].style.left);
        let y = convert(this.snake[0].style.top);

        if (x < 2 | x > 50 | y < 2 | y > 50) {
            this.body.removeEventListener('keyup', _game._setDirect);
            clearInterval(this.play);
        }

        for (let i = 1; i < this.snake.length; i++) {
            let nodeX = convert(this.snake[i].style.left);
            let nodeY = convert(this.snake[i].style.top);
            if (nodeX === x && nodeY === y) {
                this.body.removeEventListener('keyup', _game._setDirect);
                clearInterval(this.play);
            }
        }
    }
}

