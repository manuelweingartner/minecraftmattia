/* ============================================
   Minecraft Website - Haupt-JavaScript
   Navigation, Theme, Tag/Nacht, Sounds, Easter Eggs
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // Sound-System
  // ============================================
  let soundEnabled = false;
  let audioContext = null;

  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playClickSound() {
    if (!soundEnabled || !audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(1000, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
      gain.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 0.08);
    } catch(e) {}
  }

  function playExplosionSound() {
    if (!soundEnabled || !audioContext) return;
    try {
      const bufferSize = audioContext.sampleRate * 0.3;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
      }
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(audioContext.destination);
      gain.gain.setValueAtTime(0.4, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      source.start(audioContext.currentTime);
    } catch(e) {}
  }

  window.playClickSound = playClickSound;
  window.playExplosionSound = playExplosionSound;

  // ============================================
  // Hamburger Menu
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('show');
      playClickSound();
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        playClickSound();
      });
    });
  }

  // ============================================
  // Theme System (Dropdown)
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeIcons = { overworld: '🌍', nether: '🔥', end: '🔮' };

  function setTheme(theme) {
    document.body.classList.remove('theme-overworld', 'theme-nether', 'theme-end');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('mc-theme', theme);
    if (themeToggle) themeToggle.textContent = themeIcons[theme] || '🌍';
    updateParticles(theme);
  }

  // Gespeichertes Theme laden
  const savedTheme = localStorage.getItem('mc-theme') || 'overworld';
  setTheme(savedTheme);

  if (themeToggle && themeDropdown) {
    themeToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      themeDropdown.classList.toggle('show');
      playClickSound();
    });

    themeDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    themeDropdown.querySelectorAll('.theme-option').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTheme(this.getAttribute('data-theme'));
        themeDropdown.classList.remove('show');
        playClickSound();
      });
    });

    document.addEventListener('click', function() {
      themeDropdown.classList.remove('show');
    });
  }

  // ============================================
  // Partikel-System
  // ============================================
  function updateParticles(theme) {
    var container = document.getElementById('particlesContainer');
    if (!container) return;
    container.innerHTML = '';

    if (theme === 'nether') {
      for (var i = 0; i < 15; i++) {
        var p = document.createElement('div');
        p.className = 'lava-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 4 + 's';
        p.style.animationDuration = (3 + Math.random() * 3) + 's';
        container.appendChild(p);
      }
    } else if (theme === 'end') {
      for (var j = 0; j < 20; j++) {
        var q = document.createElement('div');
        q.className = 'end-particle';
        q.style.left = Math.random() * 100 + '%';
        q.style.top = Math.random() * 100 + '%';
        q.style.animationDelay = Math.random() * 6 + 's';
        q.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(q);
      }
    }
  }

  // ============================================
  // Sound Toggle
  // ============================================
  var soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', function() {
      initAudio();
      soundEnabled = !soundEnabled;
      soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) playClickSound();
    });
  }

  document.addEventListener('click', function(e) {
    if (e.target.closest('.mc-btn, .nav-links a, .feature-card')) {
      playClickSound();
    }
  });

  // ============================================
  // Easter Egg 1: Konami Code
  // ============================================
  var konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
  var konamiIndex = 0;

  document.addEventListener('keydown', function(e) {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        diamondRain();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function diamondRain() {
    for (var i = 0; i < 30; i++) {
      (function(idx) {
        setTimeout(function() {
          var diamond = document.createElement('div');
          diamond.className = 'diamond-rain';
          diamond.textContent = '💎';
          diamond.style.left = Math.random() * 100 + 'vw';
          diamond.style.animationDuration = (2 + Math.random() * 2) + 's';
          diamond.style.fontSize = (16 + Math.random() * 24) + 'px';
          document.body.appendChild(diamond);
          setTimeout(function() { diamond.remove(); }, 4000);
        }, idx * 100);
      })(i);
    }
  }

  // ============================================
  // Easter Egg 2: Enderman Teleport
  // ============================================
  var enderman = document.getElementById('enderman');
  if (enderman) {
    enderman.addEventListener('mouseenter', function() {
      var maxX = window.innerWidth - 40;
      var maxY = window.innerHeight - 40;
      enderman.style.left = Math.random() * maxX + 'px';
      enderman.style.top = (100 + Math.random() * maxY) + 'px';
      enderman.style.right = 'auto';
    });
  }

  // ============================================
  // Easter Egg 3: Creeper Sneak (Startseite)
  // ============================================
  var creeperSneak = document.getElementById('creeperSneak');
  if (creeperSneak) {
    var idleTimer = null;

    function resetIdleTimer() {
      if (idleTimer) clearTimeout(idleTimer);
      creeperSneak.classList.remove('active');
      var existingPopup = document.querySelector('.sss-popup');
      if (existingPopup) existingPopup.remove();

      idleTimer = setTimeout(function() {
        creeperSneak.classList.add('active');
        setTimeout(function() {
          var popup = document.createElement('div');
          popup.className = 'sss-popup';
          popup.textContent = 'Sssssss...';
          document.body.appendChild(popup);
          setTimeout(function() {
            popup.remove();
            creeperSneak.classList.remove('active');
          }, 2000);
        }, 3000);
      }, 30000);
    }

    document.addEventListener('click', resetIdleTimer);
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    resetIdleTimer();
  }

  // Partikel beim Start laden
  updateParticles(savedTheme);

})();
