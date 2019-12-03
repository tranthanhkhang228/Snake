const body = document.querySelector('body');
const gameFrame = document.querySelector('.game-frame');

const bait = document.createElement('div');
bait.setAttribute('class', 'bait');
gameFrame.append(bait);

const template = /\d/g;

let soDot = 3;
let ran = [];
let tail = {
    x: 0,
    y: 0
};
let baitCoordinate = {
    x: 0,
    y: 0
};

const createNode = (x, y) => {
    const nodeSnake = document.createElement('div');
    gameFrame.append(nodeSnake);
    nodeSnake.setAttribute('class', 'snake');

    nodeSnake.style.left = `${x}rem`;
    nodeSnake.style.top = `${y}rem`;

    return nodeSnake;
};

const initialize = () => {
    ran.push(createNode(20, 20), createNode(22, 20), createNode(24, 20));
};

const convert = (value) => {
    return value.match(template).reduce((sum, item) => sum = sum * 10 + Number(item), 0);
};

let step = 2;

const move = (direct) => {
    tail = {
        x: convert(ran[ran.length-1].style.left),
        y: convert(ran[ran.length-1].style.top)
    }

    let newX, newY;
    for (let i = ran.length - 1; i >= 1; i--) {
        ran[i].style.left = ran[i - 1].style.left;
        ran[i].style.top = ran[i - 1].style.top;
    }
    switch (direct) {
        case 'UP':
            newY = convert(ran[0].style.top) - step;
            ran[0].style.top = `${newY}rem`;
            break;
        case 'DOWN':
            newY = convert(ran[0].style.top) + step;
            ran[0].style.top = `${newY}rem`;
            break;
        case 'LEFT':
            newX = convert(ran[0].style.left) - step;
            ran[0].style.left = `${newX}rem`;
            break;
        case 'RIGHT':
            newX = convert(ran[0].style.left) + step;
            ran[0].style.left = `${newX}rem`;
            break;
    }
}

let checkHead = () => {
    let x = convert(ran[0].style.left);
    let y = convert(ran[0].style.top);

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
    let x = convert(ran[0].style.left);
    let y = convert(ran[0].style.top);

    if (x === baitCoordinate.x && y === baitCoordinate.y) {
        ran.push(createNode(tail.x, tail.y));
        displayBait();
    }
}

initialize();
displayBait();

let direct = 'UP';

const call = (e) => {
    switch (e.keyCode) {
        case 37:
            direct = 'LEFT';
            break;
        case 38:
            direct = 'UP';
            break;
        case 39:
            direct = 'RIGHT';
            break;
        case 40:
            direct = 'DOWN';
            break;
    };
};

body.addEventListener('keyup', call);


let play = setInterval(() => {
    move(direct);
    checkHead();
    eat();
}, 200);



