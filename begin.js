import { Snake } from './snake_module/snake.js';
import { Bait } from './bait.js';
import { Game } from './game.js';

/* 
    Getting game's element: body tag, popup to start game, gameframe, bait
*/
const body = document.querySelector('body'); // body element
const gameFrame = document.querySelector('.game-frame'); // game frame

const popup = document.querySelector('.game-frame__pop-up'); // a popup includes a start button
const btnStart = document.querySelector('.game-frame__start'); // a element button uses to start game

const baitElement = document.querySelector('.bait'); // bait element

/*
    Creating game's objects and parameters: snake, bait, snake's step, snake's direct
*/
let snake;
let bait = new Bait(0, 0, baitElement);
bait.hideBait(); // hide the bait until start game
let step = 2; // step of each move, snake's step: 2 rem is one step in the screen
let direct; //
let directN; // the currently direct of a snake
let game; // the game controller

/*
    set default value for snake's direct
*/
const setDirect = (e) => {
    switch (e.keyCode) {
        case 37:
            direct = 'LEFT';
            directN = 37;
            break;
        case 38:
            direct = 'UP';
            directN = 38;
            break;
        case 39:
            direct = 'RIGHT';
            directN = 39;
            break;
        case 40:
            direct = 'DOWN';
            directN = 40;
            break;
    };

    // remove setDirect
    body.removeEventListener('keyup', setDirect);

    // create game
    game = new Game(body, snake, bait, step, direct, directN);

    //run game
    game.start();
};

/* 
    Starting game
    Click the start button to start game
*/
btnStart.addEventListener('click', e => {
    // hide popup
    popup.setAttribute('class', '-display-none');

    // create snake
    snake = new Snake(gameFrame, [{ x: 20, y: 20 }, { x: 22, y: 20 }, { x: 24, y: 20 }]);

    // observing a keyup event to set default value for snake's direct
    body.addEventListener('keyup', setDirect);
});





