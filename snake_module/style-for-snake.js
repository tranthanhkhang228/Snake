import { convert } from '../util.js';

export { styleSnakeHead, styleSnakeBody, styleSnakeTail };

const styleSnakeHead = (head, neck, direct, directN) => {
    const nose = Array.from(head.children)[0];
    const eye1 = Array.from(head.children)[1];
    const eye2 = Array.from(head.children)[2];
    // const iris1 = Array.from(eye1.chilren)[0];
    // const iris2 = Array.from(eye2.chilren)[0];

    switch (direct) {
        case 'UP':
            // set style for snake's nose
            nose.classList.remove('head__nose--left', 'head__nose--right', '-left-right');
            nose.classList.add('head__nose--top', '-top-bot');

            // set style for snake's eyes
            eye1.classList.remove('head__eyes--left', 'head__eyes--right', '-eye-1--left', '-eye-1--right');
            eye1.classList.add('head__eyes--top', '-eye-1--top');
            eye2.classList.remove('head__eyes--left', 'head__eyes--right', '-eye-2--left', '-eye-2--right');
            eye2.classList.add('head__eyes--top', '-eye-2--top');

            // head.style.borderRadius = '1rem 1rem 0 0';

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
            // set style for snake's nose
            nose.classList.remove('head__nose--left', 'head__nose--right', '-left-right');
            nose.classList.add('head__nose--bot', '-top-bot');

            // set style for snake's eyes
            eye1.classList.remove('head__eyes--left', 'head__eyes--right', '-eye-1--left', '-eye-1--right');
            eye1.classList.add('head__eyes--bot', '-eye-1--bot');
            eye2.classList.remove('head__eyes--left', 'head__eyes--right', '-eye-2--left', '-eye-2--right');
            eye2.classList.add('head__eyes--bot', '-eye-2--bot');

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
            // set style for snake's nose
            nose.classList.remove('head__nose--top', 'head__nose--bot', '-top-bot');
            nose.classList.add('head__nose--left', '-left-right');

            // set style for snake's eyes
            eye1.classList.remove('head__eyes--top', 'head__eyes--bot', '-eye-1--top', '-eye-1--bot');
            eye1.classList.add('head__eyes--left', '-eye-1--left');
            eye2.classList.remove('head__eyes--top', 'head__eyes--bot', '-eye-2--top', '-eye-2--bot');
            eye2.classList.add('head__eyes--left', '-eye-2--left');


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
            // set style for snake's nose
            nose.classList.remove('head__nose--top', 'head__nose--bot', '-top-bot');
            nose.classList.add('head__nose--right', '-left-right');

            // set style for snake's eyes
            eye1.classList.remove('head__eyes--top', 'head__eyes--bot', '-eye-1--top', '-eye-1--bot');
            eye1.classList.add('head__eyes--right', '-eye-1--right');
            eye2.classList.remove('head__eyes--top', 'head__eyes--bot', '-eye-2--top', '-eye-2--bot');
            eye2.classList.add('head__eyes--right', '-eye-2--right');

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