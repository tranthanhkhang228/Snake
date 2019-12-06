export { Bait };

class Bait {
    bait = document.createElement('div');

    constructor(x, y, bait) {
        this.x = x;
        this.y = y;
        this.bait = bait;
        this.hideBait();
    }

    hideBait() {
        this.bait.setAttribute('class', 'bait -display-none');
    }

    displayBait() {
        this.bait.setAttribute('class', 'bait -display-block');
    }

    createBait() {
        const x = Math.floor(Math.random() * 48) + 2;
        const y = Math.floor(Math.random() * 48) + 2;

        this.x = (x % 2 === 0) ? x : x - 1;
        this.y = (y % 2 === 0) ? y : y - 1;

        this.bait.style.left = `${this.x}rem`;
        this.bait.style.top = `${this.y}rem`;
    }
}