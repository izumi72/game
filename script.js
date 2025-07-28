let box = document.getElementById('box');
let scoreDisplay = document.getElementById('score');
let timeDisplay = document.getElementById('time');
let levelTitle = document.getElementById('level-title');

let score = 0;
let time = 50;
let level = 1;
let timer;
let moveInterval;
let moveSpeed = 2000;

function randomPosition() {
  const container = document.getElementById('game-container');
  const maxX = container.clientWidth - 50;
  const maxY = container.clientHeight - 50;
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

function moveTarget() {
  const pos = randomPosition();
  box.style.left = `${pos.x}px`;
  box.style.top = `${pos.y}px`;

  if (level >= 3) spawnFakeBox();
  if (level >= 4) spawnTrap();
  if (level >= 5) spawnBomb();
}

box.addEventListener('click', () => {
  if (box.classList.contains('target')) {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
  }
});

function spawnFakeBox() {
  const fake = document.createElement('div');
  fake.className = 'fake';
  const pos = randomPosition();
  fake.style.left = `${pos.x}px`;
  fake.style.top = `${pos.y}px`;
  fake.onclick = () => fake.remove();
  document.getElementById('game-container').appendChild(fake);
  setTimeout(() => fake.remove(), 1500);
}

function spawnTrap() {
  const trap = document.createElement('div');
  trap.className = 'trap';
  const pos = randomPosition();
  trap.style.left = `${pos.x}px`;
  trap.style.top = `${pos.y}px`;
  trap.onclick = () => {
    score--;
    scoreDisplay.textContent = score;
    trap.remove();
  };
  document.getElementById('game-container').appendChild(trap);
  setTimeout(() => trap.remove(), 1500);
}

function spawnBomb() {
  const bomb = document.createElement('div');
  bomb.className = 'bomb';
  const pos = randomPosition();
  bomb.style.left = `${pos.x}px`;
  bomb.style.top = `${pos.y}px`;
  bomb.onclick = () => {
    alert('💥 Kena bom! Game Over!');
    stopGame();
  };
  document.getElementById('game-container').appendChild(bomb);
  setTimeout(() => bomb.remove(), 1500);
}

function startGame() {
  score = 0;
  time = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  box.style.display = 'block';

  updateLevelUI();

  clearInterval(timer);
  clearInterval(moveInterval);

  moveTarget();
  moveInterval = setInterval(moveTarget, moveSpeed);

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      clearInterval(moveInterval);
      alert(`⏱️ Waktu habis! Skor kamu: ${score}`);
    }
  }, 1000);
}

function stopGame() {
  clearInterval(timer);
  clearInterval(moveInterval);
  box.style.display = 'none';
  document.querySelectorAll('.fake, .trap, .bomb').forEach(e => e.remove());
}

function restartGame() {
  startGame();
}

function nextLevel() {
  if (level < 5) {
    level++;
    moveSpeed = Math.max(400, moveSpeed - 200);
    startGame();
  } else {
    alert('🎉 Kamu sudah menyelesaikan semua level!');
  }
}

function updateLevelUI() {
  levelTitle.textContent = `Level ${level}`;
}

function shareGame() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert("🔗 Link game sudah disalin! Bagikan ke teman kamu:");
  });
}

startGame();
