const point = document.querySelector('.point');

let abc = 0;

point.textContent = abc;

setInterval(() => {
    abc += 1;
    point.textContent = abc;
}, 1000);