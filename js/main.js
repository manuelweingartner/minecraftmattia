/* ============================================
   Minecraft Website - Haupt-JavaScript
   Navigation, Theme, Tag/Nacht, Sounds, Easter Eggs
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // Sound-System (Minecraft Klick-Sound als synthetischer Ton)
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
    } catch(e) { /* Sound-Fehler ignorieren */ }
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
    } catch(e) { /* Sound-Fehler ignorieren */ }
  }

  // Sound-Funktionen global verfuegbar machen
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

    // Menu schliessen bei Klick auf Link
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        playClickSound();
      });
    });
  }

  // ============================================
  // Theme System
  // ============================================
  const themeToggle = document.getElementById('themeToggle');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeIcons = { overworld: '🌍', nether: '🔥', end: '🔮' };

  function setTheme(theme) {
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add('theme-' + theme);

    // Tag/Nacht Klasse beibehalten
    updateDayNight();

    localStorage.setItem('mc-theme', theme);
    if (themeToggle) themeToggle.textContent = themeIcons[theme] || '🌍';

    // Partikel aktualisieren
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

    themeDropdown.querySelectorAll('.theme-option').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTheme(this.dataset.theme);
        themeDropdown.classList.remove('show');
        playClickSound();
      });
    });

    // Dropdown schliessen bei Klick ausserhalb
    document.addEventListener('click', function() {
      themeDropdown.classList.remove('show');
    });
  }

  // ============================================
  // Partikel-System
  // ============================================
  function updateParticles(theme) {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    container.innerHTML = '';

    if (theme === 'nether') {
      for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'lava-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 4 + 's';
        p.style.animationDuration = (3 + Math.random() * 3) + 's';
        container.appendChild(p);
      }
    } else if (theme === 'end') {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'end-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 6 + 's';
        p.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(p);
      }
    }
  }

  // ============================================
  // Tag/Nacht Zyklus
  // ============================================
  const dayNightIndicator = document.getElementById('dayNightIndicator');
  const starsContainer = document.getElementById('starsContainer');

  function updateDayNight() {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;

    if (isNight) {
      document.body.classList.add('night-mode');
      if (dayNightIndicator) dayNightIndicator.textContent = '🌙';
      generateStars();
    } else {
      document.body.classList.remove('night-mode');
      if (dayNightIndicator) dayNightIndicator.textContent = '☀️';
      if (starsContainer) starsContainer.innerHTML = '';
    }
  }

  function generateStars() {
    if (!starsContainer || starsContainer.children.length > 0) return;
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 60 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      star.style.width = (1 + Math.random() * 2) + 'px';
      star.style.height = star.style.width;
      starsContainer.appendChild(star);
    }
  }

  updateDayNight();
  // Alle 5 Minuten pruefen
  setInterval(updateDayNight, 300000);

  // ============================================
  // Sound Toggle
  // ============================================
  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', function() {
      initAudio();
      soundEnabled = !soundEnabled;
      soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) playClickSound();
    });
  }

  // Klick-Sound auf alle mc-btn und nav-links
  document.addEventListener('click', function(e) {
    if (e.target.closest('.mc-btn, .nav-links a, .feature-card')) {
      playClickSound();
    }
  });

  // ============================================
  // Easter Egg 1: Konami Code (Diamantenregen)
  // ============================================
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
  let konamiIndex = 0;

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
    for (let i = 0; i < 30; i++) {
      setTimeout(function() {
        const diamond = document.createElement('div');
        diamond.className = 'diamond-rain';
        diamond.textContent = '💎';
        diamond.style.left = Math.random() * 100 + 'vw';
        diamond.style.animationDuration = (2 + Math.random() * 2) + 's';
        diamond.style.fontSize = (16 + Math.random() * 24) + 'px';
        document.body.appendChild(diamond);
        setTimeout(function() { diamond.remove(); }, 4000);
      }, i * 100);
    }
  }

  // ============================================
  // Easter Egg 2: Enderman Teleport
  // ============================================
  const enderman = document.getElementById('enderman');
  if (enderman) {
    enderman.addEventListener('mouseenter', function() {
      const maxX = window.innerWidth - 40;
      const maxY = window.innerHeight - 40;
      enderman.style.left = Math.random() * maxX + 'px';
      enderman.style.top = (100 + Math.random() * maxY) + 'px';
      enderman.style.right = 'auto';
    });
  }

  // ============================================
  // Easter Egg 3: Creeper Sneak (Startseite)
  // ============================================
  const creeperSneak = document.getElementById('creeperSneak');
  if (creeperSneak) {
    let idleTimer = null;

    function resetIdleTimer() {
      if (idleTimer) clearTimeout(idleTimer);
      creeperSneak.classList.remove('active');
      // Entferne SSS Popup falls vorhanden
      const existingPopup = document.querySelector('.sss-popup');
      if (existingPopup) existingPopup.remove();

      idleTimer = setTimeout(function() {
        creeperSneak.classList.add('active');
        setTimeout(function() {
          const popup = document.createElement('div');
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

  // ============================================
  // Partikel beim Seitenstart laden
  // ============================================
  updateParticles(savedTheme);

})();
