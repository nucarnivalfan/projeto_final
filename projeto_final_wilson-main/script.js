/* =======================================
   1. DADOS: LISTA DE JOGOS (GAMES)
   ======================================= */
const games = [
    // 1. O PONG (Mantém link para 'pong.html' se existir, ou usa a Wikipedia)
    {
      title: "Clássico Pong",
      author: "Game Library", 
      category: "pong",
      cover: "./img/pong.png", 
      link: "https://pt.wikipedia.org/wiki/Pong", // Link interno mantido para 'pong.html'
      wikipedia_link: "https://pt.wikipedia.org/wiki/Pong" // Adicionado link da Wikipedia como fallback/info
    },
   
    // 2. Crash Bandicoot
    {
        title: "Crash Bandicoot",
        author: "Naughty Dog",
        category: "crash-bandicoot",
        cover: "./img/Crash bandicoot.png",
        link: "https://pt.wikipedia.org/wiki/Crash_Bandicoot_(jogo_eletr%C3%B4nico)", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Crash_Bandicoot_(jogo_eletr%C3%B4nico)"
    },
   
    // 3. Donkey Kong Country
    {
        title: "Donkey Kong Country",
        author: "Rare",
        category: "donkey-kong",
        cover: "./img/Donkey Kong Country (1994).png",
        link: "https://pt.wikipedia.org/wiki/Donkey_Kong_Country", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Donkey_Kong_Country"
    },

    // 4. Metal Slug
    {
        title: "Metal Slug",
        author: "SNK",
        category: "metal-slug",
        cover: "./img/metal_slug.png",
        link: "https://pt.wikipedia.org/wiki/Metal_Slug", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Metal_Slug"
    },

     // 5. Mortal Kombat
    {
        title: "Mortal Kombat",
        author: "Midway",
        category: "mortal-kombat",
        cover: "./img/mortal_kombat.png",
        link: "https://pt.wikipedia.org/wiki/Mortal_Kombat", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Mortal_Kombat"
    },

    // 6. Pac-Man
    {
        title: "Pac-Man",
        author: "Namco",
        category: "pac-man",
        cover: "./img/pac_man.png",
        link: "https://pt.wikipedia.org/wiki/Pac-Man", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Pac-Man"
    },

    // 7. Sonic
    {
        title: "Sonic the Hedgehog",
        author: "Sega",
        category: "sonic",
        cover: "./img/sonic.png",
        link: "https://pt.wikipedia.org/wiki/Sonic_the_Hedgehog", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Sonic_the_Hedgehog"
    },

     // 8. Space Invaders
    {
        title: "Space Invaders",
        author: "Taito",
        category: "space invaders",
        cover: "./img/space_invaders.png",
        link: "https://pt.wikipedia.org/wiki/Space_Invaders", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Space_Invaders"
    },
    
     
    // 9. Street Fighter II
    {
        title: "Street Fighter II",
        author: "Capcom",
        category: "street-fighter",
        cover: "./img/street fighter.png",
        link: "https://pt.wikipedia.org/wiki/Street_Fighter_II", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Street_Fighter_II"
    },

     // 10. Super Mario Bros
    {
        title: "Super Mario Bros",
        author: "Nintendo",
        category: "super-mario",
        cover: "./img/super_mario_bros.png",
        link: "https://pt.wikipedia.org/wiki/Super_Mario_Bros.", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Super_Mario_Bros."
    },

    // 11. Super Mario World
    {
        title: "Super Mario World",
        author: "Nintendo",
        category: "super-mario-world",
        cover: "./img/super mario world.png",
        link: "https://pt.wikipedia.org/wiki/Super_Mario_World", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/Super_Mario_World"
    },
    
    // 12. The Legend of Zelda
    {
        title: "The Legend of Zelda",
        author: "Nintendo",
        category: "zelda",
        cover: "./img/zelda.png",
        link: "https://pt.wikipedia.org/wiki/The_Legend_of_Zelda", // CORRIGIDO
        wikipedia_link: "https://pt.wikipedia.org/wiki/The_Legend_of_Zelda"
    },
   
    
];

/* =======================================
   2. DOM & VARIÁVEIS DE ESTADO
   ======================================= */
const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryList = document.getElementById('categoryList');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');
const themeSwitchBtn = document.getElementById('theme-switch-btn');
const themeIcon = document.getElementById('theme-icon');

let currentFilter = 'todos';
let currentSearchTerm = '';
let currentSort = 'title';

/* =======================================
   3. RENDERIZAÇÃO E FILTRAGEM
   ======================================= */

function createGameCard(game) {
    const coverUrl = game.cover || 'https://via.placeholder.com/200x250?text=Sem+Capa'; 
    
    // Determina qual link usar. Prioriza o link interno (pong.html) ou usa o da Wikipedia.
    const finalLink = game.link && game.link !== '#' ? game.link : game.wikipedia_link || '#';
    const isExternal = finalLink.startsWith('http'); // Para adicionar target="_blank"

    return `
        <a href="${finalLink}" class="book" ${isExternal ? 'target="_blank"' : ''}>
            <div class="cover">
                <img src="${coverUrl}" alt="Capa do jogo ${game.title}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/200x250?text=Sem+Capa';"/>
            </div>
            <div class="meta">
                <h4>${game.title}</h4>
                <p>Por: ${game.author}</p>
                <div class="tags">
                    <span class="tag">${game.category.replace(/-/g, ' ')}</span>
                </div>
            </div>
        </a>
    `;
}

function updateGrid() {
    let filtered = games.filter(game => {
        // Filtro por Categoria
        const categoryMatch = currentFilter === 'todos' || game.category.toLowerCase() === currentFilter.toLowerCase();

        // Filtro por Busca (título, autor, categoria)
        const searchMatch = game.title.toLowerCase().includes(currentSearchTerm) ||
                            game.author.toLowerCase().includes(currentSearchTerm) ||
                            game.category.toLowerCase().includes(currentSearchTerm);

        return categoryMatch && searchMatch;
    });

    // Ordenação
    filtered.sort((a, b) => {
        // Usa a chave de ordenação selecionada (title ou author)
        const valA = a[currentSort].toLowerCase();
        const valB = b[currentSort].toLowerCase();

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
    });

    // Renderização
    if (booksGrid) {
        booksGrid.innerHTML = filtered.map(createGameCard).join('');
    }

    // Atualiza contagem
    if (resultCount) {
        resultCount.textContent = `Exibindo ${filtered.length} jogos`;
    }
}

/* =======================================
   4. LISTENERS DE EVENTOS
   ======================================= */

// A. Busca e Filtro de Texto
if (searchBtn && searchInput) {
    const handleSearch = () => {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        updateGrid();
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
}

// B. Filtro de Categoria (Chips)
if (categoryList) {
    categoryList.addEventListener('click', (event) => {
        if (event.target.classList.contains('chip')) {
            document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
            
            event.target.classList.add('active');
            currentFilter = event.target.dataset.cat;
            
            // Limpa a busca
            if (searchInput) {
                searchInput.value = '';
            }
            currentSearchTerm = '';

            updateGrid();
        }
    });
}

// C. Ordenação
if (sortSelect) {
    sortSelect.addEventListener('change', (event) => {
        currentSort = event.target.value;
        updateGrid();
    });
}

/* =======================================
   5. CONTROLE DE TEMA (DARK/LIGHT MODE)
   ======================================= */

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.textContent = 'light_mode';
            themeIcon.setAttribute('aria-label', 'Trocar para tema claro');
        } else {
            themeIcon.textContent = 'dark_mode';
            themeIcon.setAttribute('aria-label', 'Trocar para tema escuro');
        }
    }
}

function loadTheme() {
    let savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Padrão: usa o tema do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            saveTheme('dark');
        } else {
            saveTheme('light');
        }
    }
}

if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        saveTheme(newTheme);
    });
}


/* =======================================
   6. INICIALIZAÇÃO
   ======================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Define o ano do rodapé
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // 2. Carrega o tema
    loadTheme();
    
    // 3. Carrega os cards de jogos
    updateGrid(); 
});


/*JS do Pong: reaponsável pelas funções do jogo*/

document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('pongCanvas');
    const startResetButton = document.getElementById('startResetButton');
    
    if (!canvas || !startResetButton) {
        console.error("Elementos 'pongCanvas' ou 'startResetButton' não encontrados.");
        return;
    }

    const ctx = canvas.getContext('2d');

    const W = canvas.width;
    const H = canvas.height;

    let gameRunning = false;

    // Definições dos objetos do jogo
    const ball = {
        x: W / 2,
        y: H / 2,
        radius: 7,
        speed: 5,
        dx: 5,
        dy: 5,
        color: '#ffffffff'
    };

    const player = {
        x: 10,
        y: H / 2 - 40,
        width: 10,
        height: 80,
        speed: 6,
        dy: 0,
        score: 0,
        color: '#FF0077'
    };

    const computer = {
        x: W - 20,
        y: H / 2 - 40,
        width: 10,
        height: 80,
        speed: 4,
        dy: 0,
        score: 0,
        color: '#00FFFF'
    };

    // --- Funções de Desenho ---

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
        ctx.font = '30px "Segoe UI", Arial'; 
        ctx.fillText(player.score, W / 4, 30);
        ctx.fillText(computer.score, W * 3 / 4, 30);
    }

    // --- Lógica de Movimento e Ponto ---

    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Colisão com teto e chão
        if (ball.y + ball.radius > H || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }
        
        // Ponto para o computador (bola saiu pela esquerda)
        if (ball.x - ball.radius < 0) {
            computer.score++;
            resetBall();
        } 
        // Ponto para o jogador (bola saiu pela direita)
        else if (ball.x + ball.radius > W) {
            player.score++;
            resetBall();
        }
    }

    function resetBall() {
        ball.x = W / 2;
        ball.y = H / 2;
        
        ball.dx = -ball.dx;

        if (gameRunning) {
            ball.dy = (Math.random() > 0.5 ? 1 : -1) * ball.speed * 0.8; 
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

    // --- Lógica de Colisão ---

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
        // Colisão com o jogador (esquerda)
        if (checkCollision(ball, player)) {
            if (ball.dx < 0) { 
                ball.dx = -ball.dx;
            }

            let collidePoint = (ball.y - (player.y + player.height / 2));
            collidePoint = collidePoint / (player.height / 2); 
            ball.dy = collidePoint * ball.speed * 1.5; 
        }

        // Colisão com o computador (direita)
        if (checkCollision(ball, computer)) {
            if (ball.dx > 0) {
                ball.dx = -ball.dx;
            }

            let collidePoint = (ball.y - (computer.y + computer.height / 2));
            collidePoint = collidePoint / (computer.height / 2);
            ball.dy = collidePoint * ball.speed * 1.5;
        }
    }

    // --- Controle do Jogo ---

    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            ball.dy = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
            startResetButton.textContent = "REINICIAR JOGO"; 
        }
    }

    function resetGame() {
        gameRunning = false;

        player.score = 0;
        computer.score = 0;
        player.y = H / 2 - player.height / 2;
        computer.y = H / 2 - computer.height / 2;
        player.dy = 0;

        resetBall();

        startResetButton.textContent = "INICIAR JOGO";
    }

    // --- Loop Principal ---

    function gameLoop () {
        // Limpa a tela (Fundo preto, baseado no CSS)
        drawRect(0, 0, W, H, '#0D1317'); 
        
        // Linha central
        drawRect(W / 2 - 1, 0, 2, H, '#444444');

        if (gameRunning) {
            moveBall();
            moveComputer();
            handleCollision();
            movePlayer();
        }

        // Desenha todos os elementos
        drawRect (player.x, player.y, player.width, player.height, player.color);
        drawRect (computer.x, computer.y, computer.width, computer.height, computer.color);
        drawBall(ball.x, ball.y, ball.radius, ball.color);
        drawScore();

        requestAnimationFrame(gameLoop);
    }

    // --- Eventos de Entrada (Teclado) ---

    document.addEventListener('keydown', (event) => {
        if ((event.key.toLowerCase() === 'w' || event.key.toLowerCase() === 's') && !gameRunning) {
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

    // --- Evento do Botão ---

    startResetButton.addEventListener('click', () => {
        if (gameRunning) {
            resetGame();
        } else {
            startGame();
        }
    });

    // Inicialização
    resetGame();
    gameLoop();
});