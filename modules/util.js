export { convert, createCourt };

// A regex gets all number using for converting
const template = /\d/g;

// Converting an array of string into a number
const convert = (value) => {
    return value.match(template).reduce((sum, item) => sum = sum * 10 + Number(item), 0);
};

/* create game's court */
const createCourt = () => {
    let canvas = document.getElementById('game-frame__court'); // game frame wall and court
    let context = canvas.getContext('2d');
    let j = 0, k = 0;
    for (let i = 0; i <= 480; i += 20) {
        if (i % 40 == 0) {
            j = 0;
            k = 480;
        } else {
            j = 20;
            k = 460;
        }

        for (j; j <= k; j += 40) {
            context.beginPath();
            context.rect(j, i, 20, 20);
            context.fillStyle = '#a2d149';
            context.fill();
        }
    }
}
