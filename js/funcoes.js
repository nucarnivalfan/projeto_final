const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
ctx.fillStyle = '#fff';
let ball = {
    x: W / 2,
    y: H / 2,
    radius: 7,
    speed: 5,
    velocityX: 5,
    velocityY: 5
};
const paddleWidth = 10;
const paddleHeight = 80;
let user = {
    x: 0,
    y: H / 2 - paddleHeight / 2,
    score: 0
};
let com = {
    x: W - paddleWidth,
    y: H / 2 - paddleHeight / 2,
    score: 0,
    speed: 6,
};
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}
function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = '32px Arial';
    ctx.fillText(text, x, y);
}
function drawNet() {
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.strokeStyle = '#888';
    ctx.stroke();
    ctx.setLineDash([]);
}
function resetBall() {
    ball.x = W / 2;
    ball.y = H / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX; 
}
function collision(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    p.top = p.y;
    p.bottom = p.y + paddleHeight;
    p.left = p.x;
    p.right = p.x + paddleWidth;
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if (ball.y + ball.radius > H || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < W / 2) ? user : com;

    // 2. Colisão com as Pás
    if (collision(ball, player)) {
        // Inverte a direção horizontal da bola
        ball.velocityX = -ball.velocityX;

        // Opcional: Aumenta a velocidade
        if (ball.speed < 15) { // Limite de velocidade
            ball.speed += 0.5;
        }
        
        // Aplica um pequeno efeito na vertical (torna o jogo mais interessante)
        let collidePoint = ball.y - (player.y + paddleHeight / 2);
        collidePoint = collidePoint / (paddleHeight / 2);
        let angleRad = collidePoint * (Math.PI / 4); // Ângulo máximo de 45 graus (PI/4)

        // Atualiza as velocidades usando o ângulo
        ball.velocityX = ball.speed * Math.cos(angleRad) * (ball.x < W / 2 ? 1 : -1);
        ball.velocityY = ball.speed * Math.sin(angleRad);
    }
    
    // 3. Pontuação
    // Se a bola sair pela direita (ponto para o usuário)
    if (ball.x - ball.radius > W) {
        user.score++;
        resetBall();
    } 
    // Se a bola sair pela esquerda (ponto para a IA)
    else if (ball.x + ball.radius < 0) {
        com.score++;
        resetBall();
    }
    
    // 4. Movimento da IA (COM) - Lógica simples de seguir a bola
    // Move a pá da IA (com) suavemente em direção ao centro da bola
    let targetY = ball.y - paddleHeight / 2;
    com.y += (targetY - com.y) * 0.1; 
    
    // Garante que a pá da IA não saia dos limites
    com.y = Math.max(0, Math.min(com.y, H - paddleHeight));
}

// --- Funções de Eventos (Controle do Jogador) ---

// Move a pá do usuário com o mouse
canvas.addEventListener('mousemove', function(event) {
    // Calcula a posição do mouse em relação ao canvas
    let rect = canvas.getBoundingClientRect();
    let mouseY = event.clientY - rect.top;

    // Ajusta a posição da pá para que o meio da pá siga o mouse
    user.y = mouseY - paddleHeight / 2;

    // Garante que a pá do usuário não saia dos limites
    user.y = Math.max(0, Math.min(user.y, H - paddleHeight));
});

// --- Função Principal de Renderização ---

// Desenha todos os elementos do jogo
function render() {
    // 1. Limpa a tela (não necessário aqui, pois o canvas é redesenhado)
    // O fundo preto já é pintado novamente no drawRect principal
    
    // Desenha o fundo preto (ou limpa a tela)
    drawRect(0, 0, W, H, "#000");

    // Desenha a rede (linha pontilhada central)
    drawNet();

    // Desenha as pontuações
    drawText(user.score, W / 4, H / 6, "#fff");
    drawText(com.score, 3 * W / 4, H / 6, "#fff");

    // Desenha as pás (paletas)
    drawRect(user.x, user.y, paddleWidth, paddleHeight, user.color);
    drawRect(com.x, com.y, paddleWidth, paddleHeight, com.color);
    
    // Desenha a bola
    drawCircle(ball.x, ball.y, ball.radius, "#fff");
}

// O Loop Principal do Jogo
// Chama update e render 60 vezes por segundo (FPS)
function gameLoop() {
    update();
    render();
}

// Inicia o jogo
let fps = 60;
setInterval(gameLoop, 1000 / fps); 