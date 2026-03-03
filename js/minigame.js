/* ============================================
   Creeper Clicker - Minispiel
   Klicke Creeper weg bevor sie explodieren!
   ============================================ */

(function() {
  'use strict';

  // Spielzustand
  let score = 0;
  let lives = 3;
  let highscore = parseInt(localStorage.getItem('mc-creeper-highscore')) || 0;
  let gameRunning = false;
  let spawnInterval = null;
  let creeperTimers = [];

  // DOM Elemente
  const gameField = document.getElementById('gameField');
  const startScreen = document.getElementById('startScreen');
  const gameOverScreen = document.getElementById('gameOverScreen');
  const scoreEl = document.getElementById('gameScore');
  const heartsEl = document.getElementById('gameHearts');
  const highscoreEl = document.getElementById('gameHighscore');
  const finalScoreEl = document.getElementById('finalScore');
  const finalHighscoreEl = document.getElementById('finalHighscore');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');

  if (!gameField) return;

  // Highscore anzeigen
  if (highscoreEl) highscoreEl.textContent = highscore;

  // Spiel starten
  function startGame() {
    score = 0;
    lives = 3;
    gameRunning = true;

    if (scoreEl) scoreEl.textContent = '0';
    updateHearts();

    if (startScreen) startScreen.style.display = 'none';
    if (gameOverScreen) gameOverScreen.style.display = 'none';

    // Alle existierenden Creeper entfernen
    gameField.querySelectorAll('.creeper').forEach(function(c) { c.remove(); });
    creeperTimers.forEach(function(t) { clearTimeout(t); });
    creeperTimers = [];

    // Creeper spawnen
    scheduleSpawn();
  }

  // Spawn-Intervall berechnen (wird schneller mit mehr Punkten)
  function getSpawnDelay() {
    const base = 1500;
    const min = 400;
    const reduction = score * 20;
    return Math.max(min, base - reduction);
  }

  // Creeper-Lebenszeit (wird kuerzer mit mehr Punkten)
  function getCreeperLifetime() {
    const base = 3000;
    const min = 1000;
    const reduction = score * 30;
    return Math.max(min, base - reduction);
  }

  function scheduleSpawn() {
    if (!gameRunning) return;
    spawnInterval = setTimeout(function() {
      spawnCreeper();
      scheduleSpawn();
    }, getSpawnDelay());
  }

  // Creeper erstellen
  function spawnCreeper() {
    if (!gameRunning) return;

    const creeper = document.createElement('div');
    creeper.className = 'creeper';

    // Creeper-Kopf mit CSS-Gesicht
    const head = document.createElement('div');
    head.className = 'creeper-head';
    creeper.appendChild(head);

    // Creeper-Fuesse
    const feet = document.createElement('div');
    feet.className = 'creeper-feet';
    const foot1 = document.createElement('div');
    foot1.className = 'creeper-foot';
    const foot2 = document.createElement('div');
    foot2.className = 'creeper-foot';
    feet.appendChild(foot1);
    feet.appendChild(foot2);
    creeper.appendChild(feet);

    // Position (innerhalb des Spielfelds)
    const fieldRect = gameField.getBoundingClientRect();
    const maxX = fieldRect.width - 60;
    const maxY = fieldRect.height - 80;
    const x = Math.random() * Math.max(maxX, 50);
    const y = 40 + Math.random() * Math.max(maxY - 40, 50);
    creeper.style.left = x + 'px';
    creeper.style.top = y + 'px';

    // Klick-Handler
    creeper.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!gameRunning) return;

      score++;
      if (scoreEl) scoreEl.textContent = score;

      // Explosion anzeigen
      showExplosion(x, y);

      // Creeper entfernen
      creeper.remove();

      if (window.playClickSound) window.playClickSound();
    });

    gameField.appendChild(creeper);

    // Creeper explodiert nach Lebenszeit (verpasst!)
    const lifetime = getCreeperLifetime();
    const timer = setTimeout(function() {
      if (creeper.parentNode && gameRunning) {
        // Verpasst! Leben verlieren
        lives--;
        updateHearts();
        showExplosion(parseFloat(creeper.style.left), parseFloat(creeper.style.top));
        creeper.remove();
        if (window.playExplosionSound) window.playExplosionSound();

        if (lives <= 0) {
          gameOver();
        }
      }
    }, lifetime);

    creeperTimers.push(timer);
  }

  // Explosion anzeigen
  function showExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.left = (x - 16) + 'px';
    explosion.style.top = (y - 16) + 'px';

    // Partikel
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      const angle = (i / 8) * Math.PI * 2;
      const dist = 20 + Math.random() * 20;
      particle.style.setProperty('--ex', Math.cos(angle) * dist + 'px');
      particle.style.setProperty('--ey', Math.sin(angle) * dist + 'px');
      particle.style.left = '36px';
      particle.style.top = '36px';
      particle.style.background = ['#FF8800', '#FF4400', '#FFAA00', '#FF0000'][i % 4];
      explosion.appendChild(particle);
    }

    gameField.appendChild(explosion);
    setTimeout(function() { explosion.remove(); }, 600);
  }

  // Herzen aktualisieren
  function updateHearts() {
    if (!heartsEl) return;
    let hearts = '';
    for (let i = 0; i < 3; i++) {
      hearts += i < lives ? '❤️' : '🖤';
    }
    heartsEl.textContent = hearts;
  }

  // Spiel vorbei
  function gameOver() {
    gameRunning = false;
    clearTimeout(spawnInterval);
    creeperTimers.forEach(function(t) { clearTimeout(t); });

    // Highscore pruefen
    if (score > highscore) {
      highscore = score;
      localStorage.setItem('mc-creeper-highscore', highscore);
      if (highscoreEl) highscoreEl.textContent = highscore;
    }

    // Alle Creeper entfernen
    gameField.querySelectorAll('.creeper').forEach(function(c) { c.remove(); });

    // Game Over Screen
    if (finalScoreEl) finalScoreEl.textContent = score;
    if (finalHighscoreEl) finalHighscoreEl.textContent = highscore;
    if (gameOverScreen) gameOverScreen.style.display = '';
  }

  // Event Listener
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      startGame();
      if (window.playClickSound) window.playClickSound();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', function() {
      startGame();
      if (window.playClickSound) window.playClickSound();
    });
  }

})();
