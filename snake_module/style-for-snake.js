import { convert } from '../util.js';

export { styleSnakeHead, styleSnakeBody, styleSnakeTail };

const styleSnakeHead = (head, neck, direct, directN) => {
    switch (direct) {
        case 'UP':
            // set style for snake's head
            head.style.borderRadius = '1rem 1rem 0 0';

            //set style for snake's neck when snake veer off
            if (directN === 39) {
                //right veer off the top
                neck.style.borderRadius = '0 0 2rem 0';
            }
            else if (directN === 37) {
                //left veer off the top
                neck.style.borderRadius = '0 0 0 2rem';

            } else {
                neck.style.borderRadius = '0';
            }
            break;
        case 'DOWN':
            head.style.borderRadius = '0 0 1rem 1rem';

            if (directN === 39) {
                //right veer off the bottom
                neck.style.borderRadius = '0 2rem 0 0';
            }
            else if (directN === 37) {
                //left veer off the bottom
                neck.style.borderRadius = '2rem 0 0 0';
            } else {
                neck.style.borderRadius = '0';
            }
            break;
        case 'LEFT':
            head.style.borderRadius = '1rem 0 0 1rem';

            if (directN === 38) {
                //top veer off the left
                neck.style.borderRadius = '0 2rem 0 0';
            }
            else if (directN === 40) {
                //bottom veer off the left
                neck.style.borderRadius = '0 0 2rem 0';
            } else {
                neck.style.borderRadius = '0';
            }
            break;
        case 'RIGHT':
            head.style.borderRadius = '0 1rem 1rem 0';

            if (directN === 38) {
                //top veer off the right
                neck.style.borderRadius = '2rem 0 0 0';
            }
            else if (directN === 40) {
                //bottom veer off the left
                neck.style.borderRadius = '0 0 0 2rem';
            } else {
                neck.style.borderRadius = '0';
            }

    }
}

const styleSnakeBody = (snake) => {
    for (let i = snake.length - 2; i >= 1; i--) {
    }
}

const styleSnakeTail = (tail, beforetail) => {
    let check = convert(tail.style.left) - convert(beforetail.style.left);
    if (check === 0) {
        check = convert(tail.style.top) - convert(beforetail.style.top);
        if (check > 0) {
            tail.style.borderRadius = '0 0 1rem 1rem';
        } else {
            tail.style.borderRadius = '1rem 1rem 0 0';
        }
    } else if (check > 0) {
        tail.style.borderRadius = '0 1rem 1rem 0';
    } else {
        tail.style.borderRadius = '1rem 0 0 1rem';
    }
}