/* ============================================
   Minispiele - Quiz, Memory, Mob Jagd
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // Spiel-Auswahl (Tabs)
  // ============================================
  var selectCards = document.querySelectorAll('.game-select-card');
  var gameAreas = document.querySelectorAll('.game-area');

  selectCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var game = this.getAttribute('data-game');
      selectCards.forEach(function(c) { c.classList.remove('active'); });
      gameAreas.forEach(function(a) { a.classList.remove('active'); });
      this.classList.add('active');
      var target = document.getElementById('game' + game.charAt(0).toUpperCase() + game.slice(1));
      if (target) target.classList.add('active');
      if (window.playClickSound) window.playClickSound();
    });
  });

  // ============================================
  // SPIEL 1: Minecraft Quiz
  // ============================================
  var quizQuestions = [
    { q: 'Wie viele Bloecke hoch ist die Bauhöhe in Minecraft (seit 1.18)?', a: ['320', '256', '128', '512'], c: 0 },
    { q: 'Welches Material braucht man, um ein Nether-Portal zu bauen?', a: ['Obsidian', 'Bedrock', 'Endstein', 'Netherrack'], c: 0 },
    { q: 'Wie heisst der Endboss in Minecraft?', a: ['Enderdrache', 'Wither', 'Warden', 'Elder Guardian'], c: 0 },
    { q: 'Wie viele Eisenbarren braucht man fuer eine volle Ruestung?', a: ['24', '20', '16', '32'], c: 0 },
    { q: 'Welcher Mob teleportiert sich, wenn man ihn anschaut?', a: ['Enderman', 'Creeper', 'Phantom', 'Shulker'], c: 0 },
    { q: 'Was droppt ein Creeper wenn er von einem Skelett getoetet wird?', a: ['Schallplatte', 'TNT', 'Schwarzpulver', 'Diamant'], c: 0 },
    { q: 'Wie heisst das seltenste Erz in Minecraft?', a: ['Smaragd', 'Diamant', 'Netherit', 'Lapislazuli'], c: 2 },
    { q: 'Welches Tier kann man in Minecraft reiten (ohne Sattel)?', a: ['Keines', 'Schwein', 'Kuh', 'Schaf'], c: 0 },
    { q: 'Wie stellt man eine Fackel her?', a: ['Kohle + Stock', 'Holz + Stein', 'Kohle + Holz', 'Feuerstein + Eisen'], c: 0 },
    { q: 'In welcher Dimension findet man Shulker?', a: ['End', 'Nether', 'Overworld', 'Aether'], c: 0 },
    { q: 'Wie viele Slots hat die Hotbar?', a: ['9', '10', '8', '12'], c: 0 },
    { q: 'Was passiert wenn ein Bett im Nether benutzt wird?', a: ['Es explodiert', 'Man schlaeft', 'Nichts', 'Man teleportiert sich'], c: 0 },
    { q: 'Wie heisst der neue starke Mob aus dem Deep Dark?', a: ['Warden', 'Wither', 'Ravager', 'Vindicator'], c: 0 },
    { q: 'Welcher Block ist der haerteste (ausser Bedrock)?', a: ['Obsidian', 'Diamantblock', 'Netherit-Block', 'Endstein'], c: 0 },
    { q: 'Wie viele Enderaugen braucht man maximal fuer das End-Portal?', a: ['12', '9', '16', '8'], c: 0 },
    { q: 'Was braucht man um Netherit-Ruestung herzustellen?', a: ['Diamant + Netheritbarren', 'Eisen + Netherit', 'Gold + Netherit', 'Nur Netherit'], c: 0 },
    { q: 'Wie heisst der Dorfbewohner, der Karten verkauft?', a: ['Kartograf', 'Bibliothekar', 'Schmied', 'Bauer'], c: 0 },
    { q: 'Welchen Effekt gibt ein Goldapfel?', a: ['Absorption + Regeneration', 'Staerke + Schnelligkeit', 'Unsichtbarkeit', 'Feuerresistenz'], c: 0 },
    { q: 'Wie schnell ist ein Spieler beim Sprinten (Bloecke/Sek)?', a: ['5.6', '4.3', '7.0', '3.9'], c: 0 },
    { q: 'Welcher Mob hat die meisten Lebenspunkte?', a: ['Warden', 'Enderdrache', 'Wither', 'Iron Golem'], c: 0 },
  ];

  var quizIndex = 0;
  var quizScore = 0;
  var quizAnswered = false;

  function renderQuiz() {
    var container = document.getElementById('quizContainer');
    var progress = document.getElementById('quizProgress');
    var questionEl = document.getElementById('quizQuestion');
    var answersEl = document.getElementById('quizAnswers');
    if (!container || !questionEl || !answersEl) return;

    if (quizIndex >= quizQuestions.length) {
      // Quiz fertig
      container.innerHTML = '<div class="quiz-result">' +
        '<h2>Quiz beendet!</h2>' +
        '<p style="font-size:18px;color:var(--gold);margin:16px 0;">' + quizScore + ' / ' + quizQuestions.length + '</p>' +
        '<p>' + getQuizMessage(quizScore) + '</p>' +
        '<button class="mc-btn mc-btn-primary" id="quizRestart" style="margin-top:20px;">Nochmal spielen</button>' +
        '</div>';
      var restartBtn = document.getElementById('quizRestart');
      if (restartBtn) {
        restartBtn.addEventListener('click', function() {
          quizIndex = 0;
          quizScore = 0;
          renderQuiz();
        });
      }
      return;
    }

    var q = quizQuestions[quizIndex];
    quizAnswered = false;
    progress.textContent = 'Frage ' + (quizIndex + 1) + ' / ' + quizQuestions.length;
    questionEl.textContent = q.q;

    answersEl.innerHTML = '';
    q.a.forEach(function(answer, idx) {
      var btn = document.createElement('button');
      btn.className = 'quiz-answer';
      btn.textContent = answer;
      btn.addEventListener('click', function() {
        if (quizAnswered) return;
        quizAnswered = true;

        if (idx === q.c) {
          btn.classList.add('correct');
          quizScore++;
        } else {
          btn.classList.add('wrong');
          // Richtige Antwort markieren
          answersEl.children[q.c].classList.add('correct');
        }

        if (window.playClickSound) window.playClickSound();

        setTimeout(function() {
          quizIndex++;
          renderQuiz();
        }, 1200);
      });
      answersEl.appendChild(btn);
    });
  }

  function getQuizMessage(score) {
    if (score >= 18) return 'Minecraft-Profi! Du weisst fast alles!';
    if (score >= 14) return 'Sehr gut! Du kennst dich aus!';
    if (score >= 10) return 'Nicht schlecht! Uebe weiter!';
    if (score >= 5) return 'Es gibt noch viel zu lernen!';
    return 'Nochmal probieren, du schaffst das!';
  }

  renderQuiz();

  // ============================================
  // SPIEL 2: Block Memory
  // ============================================
  var memoryBlocks = ['⛏️', '💎', '🔥', '🌊', '🪵', '🧱', '⭐', '🍎'];
  var memoryCards = [];
  var memoryFlipped = [];
  var memoryMatched = 0;
  var memoryMoves = 0;
  var memoryLocked = false;

  function initMemory() {
    var grid = document.getElementById('memoryGrid');
    if (!grid) return;

    memoryFlipped = [];
    memoryMatched = 0;
    memoryMoves = 0;
    memoryLocked = false;
    updateMemoryStats();

    // Paare erstellen und mischen
    memoryCards = [];
    memoryBlocks.forEach(function(block) {
      memoryCards.push(block, block);
    });
    shuffleArray(memoryCards);

    grid.innerHTML = '';
    memoryCards.forEach(function(block, idx) {
      var card = document.createElement('div');
      card.className = 'memory-card';
      card.setAttribute('data-idx', idx);
      card.setAttribute('data-block', block);
      card.innerHTML = '<span class="card-back">?</span>';
      card.addEventListener('click', function() { flipCard(card, idx); });
      grid.appendChild(card);
    });
  }

  function flipCard(card, idx) {
    if (memoryLocked) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    card.innerHTML = '<span>' + memoryCards[idx] + '</span>';
    memoryFlipped.push({ card: card, idx: idx });

    if (window.playClickSound) window.playClickSound();

    if (memoryFlipped.length === 2) {
      memoryMoves++;
      updateMemoryStats();
      memoryLocked = true;

      var a = memoryFlipped[0];
      var b = memoryFlipped[1];

      if (memoryCards[a.idx] === memoryCards[b.idx]) {
        // Match!
        a.card.classList.add('matched');
        b.card.classList.add('matched');
        memoryMatched++;
        updateMemoryStats();
        memoryFlipped = [];
        memoryLocked = false;

        if (memoryMatched === memoryBlocks.length) {
          setTimeout(function() {
            alert('Gewonnen! Du hast alle Paare in ' + memoryMoves + ' Zuegen gefunden!');
          }, 300);
        }
      } else {
        // Kein Match, zurueckdrehen
        setTimeout(function() {
          a.card.classList.remove('flipped');
          a.card.innerHTML = '<span class="card-back">?</span>';
          b.card.classList.remove('flipped');
          b.card.innerHTML = '<span class="card-back">?</span>';
          memoryFlipped = [];
          memoryLocked = false;
        }, 800);
      }
    }
  }

  function updateMemoryStats() {
    var movesEl = document.getElementById('memoryMoves');
    var pairsEl = document.getElementById('memoryPairs');
    if (movesEl) movesEl.textContent = memoryMoves;
    if (pairsEl) pairsEl.textContent = memoryMatched;
  }

  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  var memoryRestartBtn = document.getElementById('memoryRestart');
  if (memoryRestartBtn) {
    memoryRestartBtn.addEventListener('click', function() {
      initMemory();
      if (window.playClickSound) window.playClickSound();
    });
  }

  initMemory();

  // ============================================
  // SPIEL 3: Mob Jagd
  // ============================================
  var mobs = [
    { emoji: '🧟', name: 'Zombie', points: 1, speed: 3000 },
    { emoji: '💀', name: 'Skelett', points: 2, speed: 2500 },
    { emoji: '🕷️', name: 'Spinne', points: 2, speed: 2000 },
    { emoji: '👻', name: 'Ghast', points: 3, speed: 2000 },
    { emoji: '🔥', name: 'Blaze', points: 3, speed: 1800 },
    { emoji: '👾', name: 'Enderman', points: 5, speed: 1500 },
    { emoji: '💚', name: 'Creeper', points: 4, speed: 1800 },
  ];

  var mobScore = 0;
  var mobLives = 3;
  var mobHighscore = parseInt(localStorage.getItem('mc-mob-highscore')) || 0;
  var mobRunning = false;
  var mobSpawnTimer = null;
  var mobTimers = [];

  var mobField = document.getElementById('mobField');
  var mobStartScreen = document.getElementById('mobStartScreen');
  var mobGameOver = document.getElementById('mobGameOver');
  var mobScoreEl = document.getElementById('mobScore');
  var mobHeartsEl = document.getElementById('mobHearts');
  var mobHighscoreEl = document.getElementById('mobHighscore');

  if (mobHighscoreEl) mobHighscoreEl.textContent = mobHighscore;

  function startMobGame() {
    mobScore = 0;
    mobLives = 3;
    mobRunning = true;
    if (mobScoreEl) mobScoreEl.textContent = '0';
    updateMobHearts();
    if (mobStartScreen) mobStartScreen.style.display = 'none';
    if (mobGameOver) mobGameOver.style.display = 'none';
    // Alte Mobs entfernen
    if (mobField) mobField.querySelectorAll('.mob').forEach(function(m) { m.remove(); });
    mobTimers.forEach(function(t) { clearTimeout(t); });
    mobTimers = [];
    scheduleMobSpawn();
  }

  function getMobSpawnDelay() {
    return Math.max(400, 1500 - mobScore * 15);
  }

  function getMobLifetime() {
    return Math.max(800, 2800 - mobScore * 25);
  }

  function scheduleMobSpawn() {
    if (!mobRunning) return;
    mobSpawnTimer = setTimeout(function() {
      spawnMob();
      scheduleMobSpawn();
    }, getMobSpawnDelay());
  }

  function spawnMob() {
    if (!mobRunning || !mobField) return;

    var mobType = mobs[Math.floor(Math.random() * mobs.length)];
    var el = document.createElement('div');
    el.className = 'mob';
    el.textContent = mobType.emoji;
    el.title = mobType.name + ' (+' + mobType.points + ')';

    var fieldRect = mobField.getBoundingClientRect();
    var maxX = Math.max(fieldRect.width - 50, 50);
    var maxY = Math.max(fieldRect.height - 80, 60);
    var x = Math.random() * maxX;
    var y = 40 + Math.random() * (maxY - 40);
    el.style.left = x + 'px';
    el.style.top = y + 'px';

    el.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!mobRunning) return;
      mobScore += mobType.points;
      if (mobScoreEl) mobScoreEl.textContent = mobScore;

      // Punkte-Anzeige
      var pts = document.createElement('div');
      pts.className = 'mob-points';
      pts.textContent = '+' + mobType.points;
      pts.style.left = x + 'px';
      pts.style.top = (y - 10) + 'px';
      mobField.appendChild(pts);
      setTimeout(function() { pts.remove(); }, 800);

      el.remove();
      if (window.playClickSound) window.playClickSound();
    });

    mobField.appendChild(el);

    var timer = setTimeout(function() {
      if (el.parentNode && mobRunning) {
        mobLives--;
        updateMobHearts();
        el.remove();
        if (window.playExplosionSound) window.playExplosionSound();
        if (mobLives <= 0) endMobGame();
      }
    }, getMobLifetime());

    mobTimers.push(timer);
  }

  function updateMobHearts() {
    if (!mobHeartsEl) return;
    var h = '';
    for (var i = 0; i < 3; i++) h += i < mobLives ? '❤️' : '🖤';
    mobHeartsEl.textContent = h;
  }

  function endMobGame() {
    mobRunning = false;
    clearTimeout(mobSpawnTimer);
    mobTimers.forEach(function(t) { clearTimeout(t); });
    if (mobField) mobField.querySelectorAll('.mob').forEach(function(m) { m.remove(); });

    if (mobScore > mobHighscore) {
      mobHighscore = mobScore;
      localStorage.setItem('mc-mob-highscore', mobHighscore);
      if (mobHighscoreEl) mobHighscoreEl.textContent = mobHighscore;
    }

    var finalScore = document.getElementById('mobFinalScore');
    var finalHigh = document.getElementById('mobFinalHigh');
    if (finalScore) finalScore.textContent = mobScore;
    if (finalHigh) finalHigh.textContent = mobHighscore;
    if (mobGameOver) mobGameOver.style.display = '';
  }

  var mobStartBtn = document.getElementById('mobStartBtn');
  var mobRestartBtn = document.getElementById('mobRestartBtn');
  if (mobStartBtn) mobStartBtn.addEventListener('click', function() { startMobGame(); if (window.playClickSound) window.playClickSound(); });
  if (mobRestartBtn) mobRestartBtn.addEventListener('click', function() { startMobGame(); if (window.playClickSound) window.playClickSound(); });

})();
