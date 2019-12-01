const gameFrame = document.querySelector('.game-frame');

const template = /\d/g;

let soDot = 3;
let ran = [];

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
    if ( x <= 0 | x >= 50 | y <= 0 | y >= 50 ) {
        clearInterval(play);
    }
}

initialize();

let play = setInterval(() => {
    move('RIGHT');
    checkHead();
}, 500);