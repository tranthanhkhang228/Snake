import { convert } from '../modules/util.js';

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
        this.createHead();
        this.createTail();
    }

    get nodes() {
        return this.nodes;
    }

    createHead() {
        const nose = document.createElement('div');
        const eye1 = document.createElement('div');
        const eye2 = document.createElement('div');
        const iris1 = document.createElement('div');
        const iris2 = document.createElement('div');

        nose.setAttribute('class', 'head__nose head__nose--left -left-right');
        eye1.setAttribute('class', 'head__eyes head__eyes--left -eye-1--left');
        eye2.setAttribute('class', 'head__eyes head__eyes--left -eye-2--left');
        iris1.setAttribute('class', 'head__iris head__iris--left');
        iris2.setAttribute('class', 'head__iris head__iris--left');

        eye1.append(iris1);
        eye2.append(iris2);

        this.nodes[0].style.zIndex = '2';
        this.nodes[0].append(nose, eye1, eye2);
    }

    createTail() {
        this.nodes[2].style.borderRadius = '0 1rem 1rem 0';
    }

    // Creating a node for snake at x, y
    // Returning a div element as a snake's node
    createNode(x, y) {
        const node = document.createElement('div');
        this.gameFrame.append(node);
        node.setAttribute('class', 'body');

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