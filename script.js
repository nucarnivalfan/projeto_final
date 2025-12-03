const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 8;
const PADDLE_SPEED = 7;

let player1 = { y: HEIGHT / 2 - PADDLE_HEIGHT / 2, vy: 0 };
let player2 = { y: HEIGHT / 2 - PADDLE_HEIGHT / 2, vy: 0 };

let ball = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    vx: 5,
    vy: 5,
};

function drawRect(x, y, w, h, color) {
    ctx.fillStyle - color;
    ctx.fillRect(x, y, w, h);
}

function drawGame() {
    drawRect(0, 0, WIDTH, HEIGHT, 'black');

    ctx.strokeStyle = 'white';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx. moveTo(WIDTH / 2, 0);
    ctx. lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();

    drawRect(10, player1.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    drawRect(WIDTH - 10 - PADDLE_WIDTH, player2.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

    drawRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE, 'white');
}

function updatePaddles(){

    player1.y += player1.vy;
    if (player1.y < 0) player1.y = 0;
    if (player1.y > HEIGHT - PADDLE_HEIGHT) player2.y = HEIGHT - PADDLE_HEIGHT;
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball. vy;

    if (ball.y < 0 || ball.y > HEIGHT - BALL_SIZE) {
        ball.vy = -ball.vy;
    }

    if (ball.x <=10 + PADDLE_WIDTH &&
        ball.y + BALL_SIZE > player1.y &&
        ball.y < player1.y + PADDLE_HEIGHT) {

            ball.vx = -ball.vx;
            ball.vx *= ball.speedMultplier;
        }

        if(ball.x + BALL_SIZE >= WIDTH - 10 - PADDLE_WIDTH &&
           ball.y + BALL_SIZE > player2.y &&
           ball.y < player2.y + PADDLE_HEIGHT) {

            ball.vx = -ball.vx;
            ball.vx *= ball.speedMultplier;
           }

           if (ball.x < 0) {
            scoreDisplay.player2++;
            updateScore ();
            resetBall(-1);
           }

           if (ball.x > WIDTH) {
            scorePlayer1++;
            updateScore();
            resetBall(1);
           }
}

function resetBall(direction = 1) {
    ball.x = WIDTH / 2 - BALL_SIZE / 2;
    ball.x = HEIGHT / 2 - BALL_SIZE / 2;
    ball.vx = 5 * direction;
    ball.vy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2);
}

function updateScore() {
    scoreDisplay.textContent = `${score.Player1} - ${score.player2}`;
}

document.addEventListener('keydown', (e) => {
    switch (e.key.toLocaleLowerCase()) {
        case 'w':
            player1.vy = -PADDLE_SPEED;
            break;
            case 's':
                player1.vy = PADDLE_SPEED;
                break;
                case 'arrowup':
                    player2.vy = -PADDLE_SPEED;
                    break;
                    case 'arrowdown':
                        player2.vy = PADDLE_SPEED;
                        break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key.toLocaleLowerCase()) {
        case 'w':
            case 's':
                player1.vy = 0;
                break;
                case 'arrowup':
                    case 'arrowdown':
                        player2.vy = 0;
                        break;
    }
});

function gameLoop() {
    updatePaddles();
    updateBall();
    drawGame();

    gameLoopId = requestAnimationFrame(gameLoop);
}

updateScore();
gameLoop();

const canvas = document.getElementById('pongGame');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('resetButton');

const WIDTH =