let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// Load images
let bowlImage = new Image();
bowlImage.src = 'bowl.png'; // Replace with the actual path to your bowl image
let iceCreamImage = new Image();
iceCreamImage.src = 'scoops/3.png'; // Replace with the actual path to your ice cream image

let player = { x: 140, y: 350, width: 50, height: 30 }; // Adjust dimensions to match the bowl image
let cones = [];
let gameInterval;
let score = 0;
let lives = 5;

// Draw player (bowl)
function drawPlayer() {
    ctx.drawImage(bowlImage, player.x, player.y, player.width, player.height);
}

// Draw cones (ice creams)
function drawCones() {
    cones.forEach(cone => {
        ctx.drawImage(iceCreamImage, cone.x, cone.y, 30, 40); // Adjust size to match ice cream image
    });
}

// Update cone positions and detect collisions
function updateCones() {
    for (let i = cones.length - 1; i >= 0; i--) {
        cones[i].y += 2;
        if (cones[i].y > canvas.height) {
            cones.splice(i, 1);
            lives--; // Reduce a life if the ice cream falls off the screen
        } else if (
            cones[i].x + 30 > player.x && // Adjust collision logic for image dimensions
            cones[i].x < player.x + player.width &&
            cones[i].y + 40 > player.y &&
            cones[i].y < player.y + player.height
        ) {
            cones.splice(i, 1);
            score++;
        }
    }
}

// Draw score and lives
function drawScoreAndLives() {
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Lives: ' + lives, 200, 20);
}

// Spawn ice creams
function spawnCone() {
    let x = Math.random() * (canvas.width - 30); // Ensure it spawns within canvas
    cones.push({ x: x, y: 0 });
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCones();
    updateCones();
    drawScoreAndLives();
    checkGameOver();
}

// Start the game
function startGame() {
    cones = [];
    score = 0;
    lives = 5;
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        gameLoop();
        if (Math.random() < 0.05) {
            spawnCone();
        }
    }, 30);
}

// Check for game over conditions
function checkGameOver() {
    if (lives <= 0) {
        clearInterval(gameInterval);
        showGameOver('Game Over! Try Again?');
    } else if (score >= 20) { // Example win condition
        clearInterval(gameInterval);
        showGameOver('Congratulations! You Win!');
    }
}

// Show game over screen
function showGameOver(message) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText('Press "Start Game" to play again.', canvas.width / 2, canvas.height / 2 + 20);
}

// Player controls
window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= 10;
    } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += 10;
    }
});
