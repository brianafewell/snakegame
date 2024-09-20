const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snake = [{ x: 10, y: 10 }];
let foodX = Math.floor(Math.random() * 25);
let foodY = Math.floor(Math.random() * 25);
let direction = 'right';

let score = 0;

const gridSize = 30;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

function draw() {
    ctx.fillStyle = '#964B00';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    ctx.fillStyle = '#960000';
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);

    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 10, 10);
}

function update() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === 'right') {
        headX++;
    } else if (direction === 'left') {
        headX--;
    } else if (direction === 'up') {
        headY--;
    } else if (direction === 'down') {
        headY++;
    }

    snake.unshift({ x: headX, y: headY });

    if (headX < 0 || headX >= gridWidth || headY < 0 || headY >= gridHeight) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === headX && snake[i].y === headY) {
            gameOver();
        }
    }

    if (headX === foodX && headY === foodY) {
        score++;
        foodX = Math.floor(Math.random() * gridWidth);
        foodY = Math.floor(Math.random() * gridHeight);
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('We cleaned up!', canvas.width / 2, canvas.height / 2);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
});

let gameInterval = setInterval(function () {
    draw();
    update();
}, 100);