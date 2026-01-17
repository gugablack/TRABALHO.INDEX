const menu = document.getElementById("menu");
const game = document.getElementById("game");
const board = document.getElementById("board");
const player = document.getElementById("player");
const pointsEl = document.getElementById("points");

let playerX = 130;
let enemies = [];
let score = 0;
let speed = 5;
let running = false;
let enemyInterval;
let animationId;

/* INICIAR JOGO */
function startGame() {
    menu.style.display = "none";
    game.style.display = "block";
    resetGame();
    running = true;

    enemyInterval = setInterval(createEnemy, 1200);
    animationId = requestAnimationFrame(gameLoop);
}

/* RESET */
function resetGame() {
    enemies.forEach(e => e.remove());
    enemies = [];
    score = 0;
    speed = 5;
    pointsEl.textContent = score;
    playerX = 130;
    player.style.left = playerX + "px";
}

/* LOOP */
function gameLoop() {
    if (!running) return;
    moveEnemies();
    animationId = requestAnimationFrame(gameLoop);
}

/* CRIA INIMIGO */
function createEnemy() {
    if (!running) return;

    const enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.left = [10, 70, 130, 190, 250][Math.floor(Math.random() * 5)] + "px";
    enemy.style.top = "-70px";

    board.appendChild(enemy);
    enemies.push(enemy);
}

/* MOVE INIMIGOS + COLISÃO */
function moveEnemies() {
    enemies.forEach((enemy, i) => {
        let y = parseInt(enemy.style.top);
        y += speed;
        enemy.style.top = y + "px";

        const p = player.getBoundingClientRect();
        const e = enemy.getBoundingClientRect();

        if (!(p.top > e.bottom || p.bottom < e.top || p.left > e.right || p.right < e.left)) {
            gameOver();
        }

        if (y > 450) {
            enemy.remove();
            enemies.splice(i, 1);
            score++;
            pointsEl.textContent = score;
            speed = 5 + Math.floor(score / 5);
        }
    });
}

/* CONTROLES POR BOTÃO */
function moveLeft() {
    if (!running) return;
    if (playerX > 10) {
        playerX -= 60;
        player.style.left = playerX + "px";
    }
}

function moveRight() {
    if (!running) return;
    if (playerX < 230) {
        playerX += 60;
        player.style.left = playerX + "px";
    }
}

/* TECLADO */
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
});

/* GAME OVER */
function gameOver() {
    alert("Game Over! Pontos: " + score);
    stopGame();
}

/* VOLTAR AO MENU */
function stopGame() {
    running = false;
    clearInterval(enemyInterval);
    cancelAnimationFrame(animationId);
    game.style.display = "none";
    menu.style.display = "block";
}
