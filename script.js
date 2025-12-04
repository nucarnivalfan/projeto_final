const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

let gameRunning = false;

const ball = {
    x: W / 2,
    y: H / 2,
    radius: 7,
    speed: 5,
    dx: 5,
    dy: 5,
    color: 'white'
};

const player = {
    x: 10,
    y: H / 2 - 40,
    width: 10,
    height: 80,
    speed: 6,
    dy: 0,
    score: 0,
    color: 'lightblue'
};

const computer = {
    x: W - 20,
    y: H / 2 - 40,
    width: 10,
    height: 80,
    speed: 4,
    dy: 0,
    score: 0,
    color: 'lightcoral'
};

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(player.score, W / 4, 30);
    ctx.fillText(computer.score, W * 3 / 4, 30);
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > H || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();

    } else if (ball.x + ball.radius > W) {
        player.score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = W / 2;
    ball.y = H / 2;

    ball.dx = -ball.dx;

    if (gameRunning) {

    ball.dy = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
} else {
    ball.dy = 0;
}
}

function moveComputer() {
    
    const targetY = ball.y - computer.height / 2;
    const difference = targetY - computer.y;

    if (difference > 0) {
        computer.y += Math.min(computer.speed, difference);
    } else if (difference < 0) {
        computer.y += Math.max(-computer.speed, difference);
    }

computer.y = Math.max(0, Math.min(computer.y, H - computer.height));

}

function movePlayer() {
    player.y += player.dy;

    player.y = Math.max(0, Math.min(player.y, H - player.height));
}

function checkCollision(b, p) {

    const p_top = p.y;
    const p_bottom = p.y + p.height;
    const p_left = p.x;
    const p_right = p.x + p.width;

    const b_top = b.y - b.radius;
    const b_bottom = b.y + b.radius;
    const b_left = b.x - b.radius;
    const b_right = b.x + b.radius;
    
    return b_right > p_left && b_left < p_right && b_bottom > p_top && b_top < p_bottom;
}

function handleCollision() {

    if (checkCollision(ball, player)) {

        if (ball.dx < 0) {
            ball.dx = -ball.dx;
        }

        let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height / 2);
        ball.dy = collidePoint * ball.speed * 1.5;
    }

    if (checkCollision(ball, computer)) {

        if (ball.dx > 0) {
            ball.dx = -ball.dx;
        }

        let collidePoint = (ball.y - (computer.y + computer.height / 2));
        collidePoint = collidePoint / (computer.height / 2);
        ball.dy = collidePoint * ball.speed * 1.5;
    }
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;

        ball.dy = (Math.random() > 0.5 ? 1 : -1) * ball.speed;

        document.getElementById('startResetButton').textContent = "REINICIAR JOGO";       
    }
}

function resetGame() {
    gameRunning = false;

    player.score = 0;
    computer. score = 0;
    player.y = H / 2 - player.height / 2;
    computer.y = H / 2 - computer.height / 2;
    player.dy = 0;

    resetBall();

    document.getElementById('startResetButton').textContent = "INICIAR JOGO";
}

function gameLoop () {

    drawRect(0, 0, W, H, 'black');
    drawRect(W / 2 - 1, 0, 2, H, 'white');

    if (gameRunning) {
    moveBall();
    moveComputer();
    handleCollision();
    movePlayer();
}

    drawRect (player.x, player.y, player.width, player.height, player.color);
    drawRect (computer.x, computer.y, computer.width, computer.height, computer.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawScore();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toLocaleLowerCase();

    if ((event.key === 'w' || event.key === 's') && !gameRunning) {
        startGame();
    }

    if (event.key === 'w' || event.key === 'W') {
        player.dy = -player.speed;
    }
    if (event.key === 's' || event.key === 'S') {
        player.dy = player.speed;
    }
});

document.addEventListener('keyup', (event) => {

    if (event.key === 'w' || event.key === 'W' || event.key === 's' || event.key === 'S') {
        player.dy = 0;
    }
});

const startResetButton = document.getElementById('startResetButton');
startResetButton.addEventListener('click', () => {
    if (gameRunning) {
        resetGame();
    } else {
        startGame();
    }
});

resetGame();
gameLoop();