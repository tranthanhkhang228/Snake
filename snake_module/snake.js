import { convert } from '../util.js';

export { Snake };

class Snake {
    nodes = []; // arr of snake's node
    gameFrame = document.createElement('div'); // a HTML element that a snake belongs to
    tail = {
        x: 0,
        x: 0,
        border: ''
    }; // information of snake's tail

    constructor(gameFrame, arr) {
        this.gameFrame = gameFrame;

        this.nodes.push(this.createNode(arr[0].x, arr[0].y), this.createNode(arr[1].x, arr[1].y), this.createNode(arr[2].x, arr[2].y));
    }

    get nodes() {
        return this.nodes;
    }

    // Creating a node for snake at x, y
    // Returning a div element as a snake's node
    createNode(x, y) {
        const node = document.createElement('div');
        this.gameFrame.append(node);
        node.setAttribute('class', 'snake');

        node.style.left = `${x}rem`;
        node.style.top = `${y}rem`;

        return node;
    }

    // Adding a node to a snake
    // Pushing a node into a snake's the end
    pushNode() {
        this.nodes.push(this.createNode(this.tail.x, this.tail.y));

        // reset style of the tail before
        this.nodes[this.nodes.length - 2].style.borderRadius = '0';

        // add border radius of the old tail for the new tail
        this.nodes[this.nodes.length - 1].style.borderRadius = this.tail.border;
    }

    setTail(tail) {
        this.tail = {
            x: convert(tail.style.left),
            y: convert(tail.style.top),
            border: tail.style.borderRadius
        }
    }
}