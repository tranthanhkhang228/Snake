import { Snake } from './snake_module/snake.js';
import { Bait } from './modules/bait.js';
import { Game } from './modules/game.js';
import { createCourt } from './modules/util.js';


/* 
    Getting game's element: body tag, popup to start game, gameframe, bait
*/
const body = document.querySelector('body'); // body element

const gameBegin = document.querySelector('.game-begin');
const gameStart = document.querySelector('.game__start');

const gamePlay = document.querySelector('.game-play');
const gameFrame = document.querySelector('.game-frame'); // game frame

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
const setFirstDirect = (e) => {
    let check = false;

    switch (e.keyCode) {
        case 37:
            direct = 'LEFT';
            directN = 37;

            check = true;
            break;
        case 38:
            direct = 'UP';
            directN = 38;

            check = true;
            break;
        case 40:
            direct = 'DOWN';
            directN = 40;

            check = true;
            break;
    };

    if (check) {
        // remove setDirect
        body.removeEventListener('keyup', setFirstDirect);

        // create game
        game = new Game(body, gameFrame, snake, bait, step, direct, directN);

        //run game
        game.start();
    }
};



/* 
    Starting game
    Click the start button to start game
*/
gameStart.addEventListener('click', e => {
    // hide popup
    // popup.setAttribute('class', '-display-none');
    gameBegin.setAttribute('class', '-display-none');
    gamePlay.classList.remove('-display-none');

    // create court
    createCourt();

    // create snake
    snake = new Snake(gameFrame, [{ x: 20, y: 20 }, { x: 22, y: 20 }, { x: 24, y: 20 }]);

    // observing a keyup event to set default value for snake's direct
    body.addEventListener('keyup', setFirstDirect);
});












