const body = document.querySelector('body');
const gameFrame = document.querySelector('.game-frame');
const btnStart = document.querySelector('.game-frame__start');
const popup = document.querySelector('.game-frame__pop-up');

const bait = document.createElement('div');
bait.setAttribute('class', 'bait');
bait.setAttribute('class', 'bait -display-none');
gameFrame.append(bait);

let snake = [];
let tail = {
    x: 0,
    y: 0
};
let baitCoordinate = {
    x: 0,
    y: 0
};
let direct = 'UP';
let directN = 38;
const template = /\d/g;


// create a node for snake
const createNode = (x, y) => {
    const nodeSnake = document.createElement('div');
    gameFrame.append(nodeSnake);
    nodeSnake.setAttribute('class', 'snake');

    nodeSnake.style.left = `${x}rem`;
    nodeSnake.style.top = `${y}rem`;

    return nodeSnake;
};

// initialize snake
const initialize = () => {
    snake.push(createNode(20, 20), createNode(22, 20), createNode(24, 20));
};

// convert an array of string into a number
const convert = (value) => {
    return value.match(template).reduce((sum, item) => sum = sum * 10 + Number(item), 0);
};

// step of each move
let step = 2;

// snake moves
const move = (direct) => {
    //save the coordinate of snake's tail
    tail = {
        x: convert(snake[snake.length - 1].style.left),
        y: convert(snake[snake.length - 1].style.top)
    }

    // move snake's tail to the right by 1 unit
    snake[snake.length - 1].style.left = snake[snake.length - 2].style.left;
    snake[snake.length - 1].style.top = snake[snake.length - 2].style.top;

    // move the elements of the Snake to the right by 1 unit
    for (let i = snake.length - 2; i >= 1; i--) {

        snake[i].style.left = snake[i - 1].style.left;
        snake[i].style.top = snake[i - 1].style.top;

        snake[i].style.borderRadius = '1rem 1rem 1rem 1rem';
        // // add style for snake's body
        // if (convert(snake[i].style.left) < convert(snake[i - 1].style.left) && convert(snake[i].style.top) < convert(snake[i + 1].style.top)) {
        //     snake[i].style.borderRadius = '1rem 0 0 0';
        // } else if (convert(snake[i].style.left) > convert(snake[i + 1].style.left) && convert(snake[i].style.top) < convert(snake[i - 1].style.top)) {
        //     snake[i].style.borderRadius = '0 1rem 0 0';
        // } else if (convert(snake[i].style.left) > convert(snake[i - 1].style.left) && convert(snake[i].style.top) > convert(snake[i + 1].style.top)) {
        //     snake[i].style.borderRadius = '0 0 1rem 0';
        // } else if (convert(snake[i].style.left) < convert(snake[i + 1].style.left) && convert(snake[i].style.top) > convert(snake[i - 1].style.top)) {
        //     snake[i].style.borderRadius = '0 0 0 1rem';
        // } else {
        //     // snake[i].style.borderRadius = '0';
        // }
    }

    // add style for snake's tail
    let check = convert(snake[snake.length - 1].style.left) - convert(snake[snake.length - 2].style.left);
    if (check === 0) {
        check = convert(snake[snake.length - 1].style.top) - convert(snake[snake.length - 2].style.top);
        if (check > 0) {
            snake[snake.length - 1].style.borderRadius = '0 0 1rem 1rem';
        } else {
            snake[snake.length - 1].style.borderRadius = '1rem 1rem 0 0';
        }
    } else if (check > 0) {
        snake[snake.length - 1].style.borderRadius = '0 1rem 1rem 0';
    } else {
        snake[snake.length - 1].style.borderRadius = '1rem 0 0 1rem';
    }

    // assign a new coordinate of snake's head
    let newX, newY;
    switch (direct) {
        case 'UP':
            newY = convert(snake[0].style.top) - step;
            snake[0].style.top = `${newY}rem`;
            // set style for snake's head
            snake[0].style.borderRadius = '1rem 1rem 0 0';
            break;
        case 'DOWN':
            newY = convert(snake[0].style.top) + step;
            snake[0].style.top = `${newY}rem`;
            snake[0].style.borderRadius = '0 0 1rem 1rem';
            break;
        case 'LEFT':
            newX = convert(snake[0].style.left) - step;
            snake[0].style.left = `${newX}rem`;
            snake[0].style.borderRadius = '1rem 0 0 1rem';
            break;
        case 'RIGHT':
            newX = convert(snake[0].style.left) + step;
            snake[0].style.left = `${newX}rem`;
            snake[0].style.borderRadius = '0 1rem 1rem 0';
            break;
    }
}


// check if snake's head touches the wall
let checkHead = () => {
    let x = convert(snake[0].style.left);
    let y = convert(snake[0].style.top);

    if (x < 2 | x > 50 | y < 2 | y > 50) {
        body.removeEventListener('keyup', call);
        clearInterval(play);
    }
}

const displayBait = () => {
    const x = Math.floor(Math.random() * 48) + 2;
    const y = Math.floor(Math.random() * 48) + 2;

    baitCoordinate.x = (x % 2 === 0) ? x : x - 1;
    baitCoordinate.y = (y % 2 === 0) ? y : y - 1;

    bait.style.left = `${baitCoordinate.x}rem`;
    bait.style.top = `${baitCoordinate.y}rem`;
}

const eat = () => {
    let x = convert(snake[0].style.left);
    let y = convert(snake[0].style.top);

    if (x === baitCoordinate.x && y === baitCoordinate.y) {
        snake.push(createNode(tail.x, tail.y));

        // reset style of the tail before
        snake[snake.length - 2].style.borderRadius = '0';

        displayBait();
    }
}

const call = (e) => {
    if (((e.keyCode === 37 && directN !== 39) | (e.keyCode === 39 && directN !== 37) |
        (e.keyCode === 38 && directN !== 40) | (e.keyCode === 40 && directN !== 38)) &&
        e.keyCode !== directN) {
        switch (e.keyCode) {
            case 37:
                directN = e.keyCode;
                direct = 'LEFT';
                break;
            case 38:
                directN = e.keyCode;
                direct = 'UP';
                break;
            case 39:
                directN = e.keyCode;
                direct = 'RIGHT';
                break;
            case 40:
                directN = e.keyCode;
                direct = 'DOWN';
                break;
        };
    }
};

let play;

btnStart.addEventListener('click', e => {
    popup.setAttribute('class', '-display-none');

    initialize();

    bait.setAttribute('class', 'bait -display-block');
    displayBait();

    body.addEventListener('keyup', call);

    play = setInterval(() => {
        move(direct);
        checkHead();
        eat();
    }, 100);
});





