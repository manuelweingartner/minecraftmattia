/* ============================================
   PvP Tipps - Taeglich rotierende Tipps
   5 Tipps pro Tag, basierend auf dem Datum
   ============================================ */

(function() {
  'use strict';

  // 50 PvP-Tipps auf Deutsch
  const allTips = [
    { title: 'W-Tapping', text: 'Nutze W-Tapping: Kurz loslassen und erneut druecken fuer mehr Knockback!' },
    { title: 'Blockhitting', text: 'Blockhitting reduziert eingehenden Schaden um 50%! Halte rechte Maustaste zwischen den Schlaegen.' },
    { title: 'Strafing', text: 'Strafe nach links und rechts um schwerer zu treffen zu sein. Wechsle die Richtung unvorhersehbar!' },
    { title: 'MLG Water', text: 'Halte immer einen Wassereimer im Hotbar fuer MLG Water! Uebe das Platzieren im letzten Moment.' },
    { title: 'Sprint-Reset', text: 'Stoppe kurz deinen Sprint vor jedem Hit fuer maximalen Knockback. Das ist der Schluessel zu gutem PvP!' },
    { title: 'Hotbar-Setup', text: 'Optimale Hotbar: Schwert, Bogen, Goldaepfel, Wassereimer, Bloecke, Enderperlen, Fackel, Essen.' },
    { title: 'Heilung', text: 'Goldaepfel geben dir 2 Extra-Herzen! Nutze sie im richtigen Moment fuer einen Vorteil.' },
    { title: 'Bogen-Spam', text: 'Ziehe den Bogen nicht immer voll auf. Schnelle halbgeladene Schuesse koennen Gegner:innen verwirren.' },
    { title: 'Hoehe nutzen', text: 'Kaempfe immer von oben! Wer hoeher steht, trifft besser und knockt den Gegner weiter weg.' },
    { title: 'Ruecken frei', text: 'Halte nie den Ruecken zum Gegner! Drehe dich immer so, dass du alle Angreifer:innen siehst.' },
    { title: 'Schildtaktik', text: 'Halte den Schild hoch gegen Axtangriffe! Aber Vorsicht: Aexte deaktivieren den Schild fuer 5 Sekunden.' },
    { title: 'Enderperlen', text: 'Enderperlen sind perfekt zum Fliehen oder fuer ueberraschende Angriffe von hinten!' },
    { title: 'Feueraspekt', text: 'Ein Schwert mit Feueraspekt setzt Gegner:innen in Brand. Der Feuerschaden addiert sich!' },
    { title: 'Ruekstoss', text: 'Ruekstoss auf dem Schwert ist manchmal schlecht! Es knockt Gegner:innen weg und du kannst nicht nachschlagen.' },
    { title: 'Nahrung', text: 'Iss immer Steak oder Goldene Karotten! Sie geben die beste Saettigung fuer Regeneration.' },
    { title: 'Ruestung', text: 'Diamantruestung mit Schutz IV ist Pflicht! Repariere sie immer rechtzeitig am Amboss.' },
    { title: 'Kritische Treffer', text: 'Springe und schlage im Fallen zu fuer 50% mehr Schaden! Das sind kritische Treffer.' },
    { title: 'Reichweite', text: 'Die Angriffsreichweite in Java Edition ist 3 Bloecke. Bleib am Rand der Reichweite fuer Hit-and-Run!' },
    { title: 'Combo-Starter', text: 'Starte eine Combo mit einem Bogen-Hit, dann wechsle schnell zum Schwert und druecke nach!' },
    { title: 'Block-Placing', text: 'Lerne schnelles Block-Platzieren! Du kannst dich im Kampf einmauern oder Bruecken bauen.' },
    { title: 'Lava-Eimer', text: 'Ein Lava-Eimer kann im PvP toedlich sein! Platziere Lava vor die Fuesse deiner Gegner:innen.' },
    { title: 'Timing', text: 'Warte den Angriffs-Cooldown ab (1.9+)! Ein voll aufgeladener Schlag macht viel mehr Schaden.' },
    { title: 'Flucht-Route', text: 'Plane immer eine Flucht-Route! Kenne deine Umgebung und habe Enderperlen bereit.' },
    { title: 'Ruhe bewahren', text: 'Bleib ruhig im Kampf! Hektisches Klicken fuehrt zu Fehlern. Atme durch und konzentriere dich.' },
    { title: 'Maus-Einstellung', text: 'Finde die richtige Maus-Empfindlichkeit! Zu schnell = ungenau, zu langsam = zu traege.' },
    { title: 'Crosshair-Placement', text: 'Halte dein Fadenkreuz immer auf Kopfhoehe der Gegner:innen. So triffst du sofort!' },
    { title: 'TNT-Kanone', text: 'In Bedwars: Lerne TNT-Kanonen zu bauen! Sie koennen Basen aus der Ferne zerstoeren.' },
    { title: 'Teamwork', text: 'Im Team-PvP: Kommuniziere mit deinem Team! Ruft Positionen aus und greift zusammen an.' },
    { title: 'Rod-PvP', text: 'Die Angel (Fishing Rod) zieht Gegner:innen naeher! Nutze sie fuer Combos und Ueberraschungsangriffe.' },
    { title: 'Jump-Boost', text: 'Traenke der Sprungkraft machen dich schwerer zu treffen! Nutze sie im PvP fuer mehr Mobilitaet.' },
    { title: 'Schneeball-Taktik', text: 'Schneeball-Spam knockt Gegner:innen zurueck und macht keinen Schaden, aber verwirrt!' },
    { title: 'Unsichtbarkeitstrank', text: 'Unsichtbarkeitstraenke sind perfekt fuer Hinterhalte! Zieh vorher die Ruestung aus.' },
    { title: 'Ender-Kristalle', text: 'Ender-Kristalle machen massiven Schaden! Platziere einen und schlage ihn, wenn der Gegner nah ist.' },
    { title: 'Schild-Breaker', text: 'Aexte sind die besten Schild-Breaker! Ein Axt-Hit deaktiviert den gegnerischen Schild.' },
    { title: 'Totem der Unsterblichkeit', text: 'Halte immer ein Totem der Unsterblichkeit in der Zweithand! Es rettet dich vor dem Tod.' },
    { title: 'Elytra-PvP', text: 'Mit Elytra und Feuerwerksraketen kannst du blitzschnell angreifen und fliehen!' },
    { title: 'Wasser-Taktik', text: 'Platziere Wasser unter dir beim Fallen! Es negiert Fallschaden komplett.' },
    { title: 'Bed-Bombing', text: 'Betten explodieren im Nether und End! Nutze das als maechtigen Angriff.' },
    { title: 'Speed-Bridge', text: 'Lerne Speed-Bridging fuer Bedwars! Halte Shift und bewege dich schnell seitwaerts.' },
    { title: 'Respawn-Anker', text: 'Respawn-Anker explodieren in der Overworld! Wie Betten im Nether, nur staerker.' },
    { title: 'Kopf hoch', text: 'Schau nie nach unten im Kampf! Halte den Blick immer auf Gegnerhoehe.' },
    { title: 'Essen im Kampf', text: 'Iss Goldaepfel WAEHREND des Kampfes, nicht vorher! Die Regeneration zaehlt im Kampf.' },
    { title: 'Terrain nutzen', text: 'Nutze Baeume, Huegel und Gebaude als Deckung! Kaempfe nie auf offener Flaeche.' },
    { title: 'Item-Vorbereitung', text: 'Bereite alle Items VOR dem Kampf vor! Nichts ist schlimmer als mitten im Fight Items suchen.' },
    { title: 'Ping beachten', text: 'Bei hohem Ping: Schlage etwas frueher! Der Server braucht Zeit um deinen Hit zu registrieren.' },
    { title: 'Butterfly-Click', text: 'Butterfly-Clicking kann deine CPS erhoehen! Uebe mit zwei Fingern abwechselnd zu klicken.' },
    { title: 'Fall-Damage', text: 'Locke Gegner:innen auf hohe Plaetze und knocke sie runter! Fallschaden ist dein Freund.' },
    { title: 'Schwert-Block', text: 'In 1.8 PvP: Schwert-Blocken reduziert Schaden! Halte Rechtsklick zwischen den Angriffen.' },
    { title: 'Umgebung checken', text: 'Bevor du kaempfst: Check die Umgebung! Gibt es Lava, tiefe Loecher oder andere Gefahren?' },
    { title: 'Uebung macht den Meister', text: 'Uebe taeglich auf PvP-Servern! Je mehr du kaempfst, desto besser wirst du. Gib nie auf!' }
  ];

  // Datum-basierter Seed fuer reproduzierbare Zufallsauswahl
  function getDateSeed() {
    const today = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      const char = today.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32-bit Integer
    }
    return Math.abs(hash);
  }

  // Pseudo-Zufallszahl basierend auf Seed
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // 5 Tipps fuer heute auswaehlen
  function getTodaysTips() {
    const seed = getDateSeed();
    const indices = [];
    let s = seed;

    while (indices.length < 5) {
      s++;
      const idx = Math.floor(seededRandom(s) * allTips.length);
      if (indices.indexOf(idx) === -1) {
        indices.push(idx);
      }
    }

    return indices.map(function(i) { return allTips[i]; });
  }

  // Tipps rendern
  function renderTips() {
    const grid = document.getElementById('tipsGrid');
    const dateEl = document.getElementById('pvpDate');
    if (!grid) return;

    // Datum anzeigen
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (dateEl) {
      dateEl.textContent = '📅 ' + today.toLocaleDateString('de-DE', options);
    }

    const tips = getTodaysTips();
    let html = '';

    tips.forEach(function(tip, index) {
      html += '<div class="tip-card fade-in" data-tip-number="Tipp ' + (index + 1) + '" style="animation-delay:' + (index * 0.15) + 's">';
      html += '<h3>⚔️ ' + tip.title + '</h3>';
      html += '<p>' + tip.text + '</p>';
      html += '</div>';
    });

    grid.innerHTML = html;
  }

  renderTips();

})();
