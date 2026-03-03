/* ============================================
   Server Status - Live Server Abfrage
   Nutzt die mcsrvstat.us API
   ============================================ */

(function() {
  'use strict';

  // Server-Konfiguration
  const servers = [
    {
      id: 'server1',
      address: 'hugosmp.net',
      name: 'HugoSMP',
      description: 'Survival Multiplayer mit Custom Items, Economy System und PvP-Events'
    },
    {
      id: 'server2',
      address: 'gommehd.net',
      name: 'GommeHD.net',
      description: 'Einer der groessten deutschen Minecraft Server mit vielen Spielmodi'
    },
    {
      id: 'server3',
      address: 'opsucht.net',
      name: 'OPSucht.net',
      description: 'Deutschlands fuehrender CityBuild Server mit einzigartiger Wirtschaft'
    }
  ];

  const PLAYER_NAME = 'Holzi1567';

  // Server-Status abrufen
  async function fetchServerStatus(server) {
    const card = document.getElementById(server.id);
    if (!card) return;

    try {
      const response = await fetch('https://api.mcsrvstat.us/3/' + server.address);
      const data = await response.json();
      renderServerCard(card, server, data);
    } catch (error) {
      renderServerError(card, server);
    }
  }

  // Server-Karte rendern
  function renderServerCard(card, server, data) {
    const isOnline = data.online === true;
    const players = data.players || {};
    const currentPlayers = players.online || 0;
    const maxPlayers = players.max || 0;
    const playerList = players.list || [];
    const playerNames = playerList.map(function(p) {
      return typeof p === 'string' ? p : (p.name || p);
    });
    const version = data.version || 'Unbekannt';
    const motdText = data.motd ? (data.motd.clean ? data.motd.clean.join(' ') : '') : '';

    // Pruefen ob Holzi1567 online ist
    const holziOnline = playerNames.some(function(name) {
      return name.toLowerCase() === PLAYER_NAME.toLowerCase();
    });

    let html = '';

    // Server Header mit Icon
    html += '<div class="server-header">';
    html += '<img src="https://api.mcsrvstat.us/icon/' + server.address + '" alt="' + server.name + ' Icon" class="server-icon" onerror="this.style.display=\'none\'">';
    html += '<div>';
    html += '<h3 class="server-name">' + server.name + '</h3>';
    html += '<p class="server-address">' + server.address + '</p>';
    html += '</div>';
    html += '</div>';

    // Server Info
    html += '<div class="server-info">';
    html += '<div class="server-info-row">';
    html += '<span>Status</span>';
    html += '<span class="' + (isOnline ? 'status-online' : 'status-offline') + '">' + (isOnline ? '● Online' : '● Offline') + '</span>';
    html += '</div>';

    if (isOnline) {
      html += '<div class="server-info-row">';
      html += '<span>Spieler:innen</span>';
      html += '<span>' + currentPlayers + ' / ' + maxPlayers + '</span>';
      html += '</div>';
      html += '<div class="server-info-row">';
      html += '<span>Version</span>';
      html += '<span>' + version + '</span>';
      html += '</div>';
    }
    html += '</div>';

    // Beschreibung
    html += '<p style="font-size:8px;color:var(--surface-dark);margin-bottom:8px;">' + server.description + '</p>';

    // Holzi1567 Status
    if (isOnline) {
      if (holziOnline) {
        html += '<div class="player-badge online">🟢 ' + PLAYER_NAME + ' ist ONLINE!</div>';
      } else {
        html += '<div class="player-badge offline">🔴 ' + PLAYER_NAME + ' ist gerade nicht online</div>';
      }
    }

    // MOTD
    if (motdText) {
      html += '<div class="server-motd">' + escapeHtml(motdText) + '</div>';
    }

    // Spielerliste (wenn vorhanden)
    if (playerNames.length > 0) {
      html += '<div class="player-list">';
      html += '<p class="player-list-title">Online Spieler:innen:</p>';
      playerNames.forEach(function(name) {
        const isHolzi = name.toLowerCase() === PLAYER_NAME.toLowerCase();
        html += '<span style="' + (isHolzi ? 'color:#55FF55;border-color:#55FF55;' : '') + '">' + escapeHtml(name) + '</span>';
      });
      html += '</div>';
    }

    card.innerHTML = html;
  }

  // Fehler anzeigen
  function renderServerError(card, server) {
    card.innerHTML = '<div class="server-header">' +
      '<div><h3 class="server-name">' + server.name + '</h3>' +
      '<p class="server-address">' + server.address + '</p></div></div>' +
      '<p class="status-offline" style="text-align:center;padding:20px;">Konnte Server nicht erreichen</p>';
  }

  // HTML escapen
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Alle Server laden
  function loadAllServers() {
    servers.forEach(function(server) {
      fetchServerStatus(server);
    });
  }

  // Initial laden
  loadAllServers();

  // Auto-Refresh alle 60 Sekunden
  setInterval(loadAllServers, 60000);

})();
