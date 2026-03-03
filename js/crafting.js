/* ============================================
   Crafting Rechner
   Interaktives 3x3 Crafting Grid mit echten Rezepten
   ============================================ */

(function() {
  'use strict';

  // Item-Definitionen (ID, Emoji, Name)
  const items = [
    { id: 'oak_log', emoji: '🪵', name: 'Eichenholz' },
    { id: 'oak_planks', emoji: '🟫', name: 'Eichenholzplanken' },
    { id: 'stick', emoji: '/', name: 'Stock' },
    { id: 'cobblestone', emoji: '🪨', name: 'Bruchstein' },
    { id: 'iron_ingot', emoji: '🔩', name: 'Eisenbarren' },
    { id: 'gold_ingot', emoji: '🥇', name: 'Goldbarren' },
    { id: 'diamond', emoji: '💎', name: 'Diamant' },
    { id: 'coal', emoji: '⚫', name: 'Kohle' },
    { id: 'string', emoji: '🧵', name: 'Faden' },
    { id: 'feather', emoji: '🪶', name: 'Feder' },
    { id: 'flint', emoji: '🔘', name: 'Feuerstein' },
    { id: 'redstone', emoji: '🔴', name: 'Redstone' },
    { id: 'sand', emoji: '🟨', name: 'Sand' },
    { id: 'gunpowder', emoji: '💨', name: 'Schwarzpulver' },
    { id: 'leather', emoji: '🟤', name: 'Leder' },
    { id: 'iron_block', emoji: '⬜', name: 'Eisenblock' },
    { id: 'gold_block', emoji: '🟡', name: 'Goldblock' },
    { id: 'diamond_block', emoji: '🔷', name: 'Diamantblock' },
    { id: 'wool', emoji: '🐑', name: 'Wolle' },
    { id: 'glass', emoji: '🔲', name: 'Glas' },
    { id: 'obsidian', emoji: '⬛', name: 'Obsidian' },
    { id: 'apple', emoji: '🍎', name: 'Apfel' },
    { id: 'sugar_cane', emoji: '🎋', name: 'Zuckerrohr' },
    { id: 'paper', emoji: '📄', name: 'Papier' },
    { id: 'book', emoji: '📕', name: 'Buch' },
    { id: 'bamboo', emoji: '🎍', name: 'Bambus' },
    { id: 'clay_ball', emoji: '🟠', name: 'Tonklumpen' },
    { id: 'wheat', emoji: '🌾', name: 'Weizen' },
    { id: 'egg', emoji: '🥚', name: 'Ei' },
    { id: 'sugar', emoji: '🍬', name: 'Zucker' },
    { id: 'milk', emoji: '🥛', name: 'Milch' },
    { id: 'pumpkin', emoji: '🎃', name: 'Kuerbis' },
    { id: 'melon_slice', emoji: '🍈', name: 'Melonenscheibe' },
    { id: 'blaze_rod', emoji: '🏮', name: 'Lohenrute' },
    { id: 'ender_pearl', emoji: '🔮', name: 'Enderperle' },
    { id: 'nether_star', emoji: '⭐', name: 'Netherstern' }
  ];

  // Crafting-Rezepte: Grid als Array[9], null = leer
  // Positionen: 0 1 2 / 3 4 5 / 6 7 8
  const recipes = [
    {
      name: 'Eichenholzplanken',
      emoji: '🟫',
      count: 4,
      patterns: [
        [null,null,null, null,'oak_log',null, null,null,null],
        ['oak_log',null,null, null,null,null, null,null,null],
      ]
    },
    {
      name: 'Stoecke',
      emoji: '/',
      count: 4,
      patterns: [
        [null,null,null, null,'oak_planks',null, null,'oak_planks',null],
        ['oak_planks',null,null, 'oak_planks',null,null, null,null,null],
      ]
    },
    {
      name: 'Werkbank',
      emoji: '🔧',
      count: 1,
      patterns: [
        [null,null,null, 'oak_planks','oak_planks',null, 'oak_planks','oak_planks',null],
        ['oak_planks','oak_planks',null, 'oak_planks','oak_planks',null, null,null,null],
      ]
    },
    {
      name: 'Holzschwert',
      emoji: '🗡️',
      count: 1,
      patterns: [
        [null,'oak_planks',null, null,'oak_planks',null, null,'stick',null],
        ['oak_planks',null,null, 'oak_planks',null,null, 'stick',null,null],
      ]
    },
    {
      name: 'Steinschwert',
      emoji: '🗡️',
      count: 1,
      patterns: [
        [null,'cobblestone',null, null,'cobblestone',null, null,'stick',null],
        ['cobblestone',null,null, 'cobblestone',null,null, 'stick',null,null],
      ]
    },
    {
      name: 'Eisenschwert',
      emoji: '🗡️',
      count: 1,
      patterns: [
        [null,'iron_ingot',null, null,'iron_ingot',null, null,'stick',null],
        ['iron_ingot',null,null, 'iron_ingot',null,null, 'stick',null,null],
      ]
    },
    {
      name: 'Diamantschwert',
      emoji: '🗡️',
      count: 1,
      patterns: [
        [null,'diamond',null, null,'diamond',null, null,'stick',null],
        ['diamond',null,null, 'diamond',null,null, 'stick',null,null],
      ]
    },
    {
      name: 'Holzspitzhacke',
      emoji: '⛏️',
      count: 1,
      patterns: [
        ['oak_planks','oak_planks','oak_planks', null,'stick',null, null,'stick',null]
      ]
    },
    {
      name: 'Steinspitzhacke',
      emoji: '⛏️',
      count: 1,
      patterns: [
        ['cobblestone','cobblestone','cobblestone', null,'stick',null, null,'stick',null]
      ]
    },
    {
      name: 'Eisenspitzhacke',
      emoji: '⛏️',
      count: 1,
      patterns: [
        ['iron_ingot','iron_ingot','iron_ingot', null,'stick',null, null,'stick',null]
      ]
    },
    {
      name: 'Diamantspitzhacke',
      emoji: '⛏️',
      count: 1,
      patterns: [
        ['diamond','diamond','diamond', null,'stick',null, null,'stick',null]
      ]
    },
    {
      name: 'Holzaxt',
      emoji: '🪓',
      count: 1,
      patterns: [
        ['oak_planks','oak_planks',null, 'oak_planks','stick',null, null,'stick',null],
        [null,'oak_planks','oak_planks', null,'stick','oak_planks', null,'stick',null],
      ]
    },
    {
      name: 'Fackel',
      emoji: '🔥',
      count: 4,
      patterns: [
        [null,null,null, null,'coal',null, null,'stick',null],
        ['coal',null,null, 'stick',null,null, null,null,null],
      ]
    },
    {
      name: 'Truhe',
      emoji: '📦',
      count: 1,
      patterns: [
        ['oak_planks','oak_planks','oak_planks', 'oak_planks',null,'oak_planks', 'oak_planks','oak_planks','oak_planks']
      ]
    },
    {
      name: 'Ofen',
      emoji: '🧱',
      count: 1,
      patterns: [
        ['cobblestone','cobblestone','cobblestone', 'cobblestone',null,'cobblestone', 'cobblestone','cobblestone','cobblestone']
      ]
    },
    {
      name: 'Leiter',
      emoji: '🪜',
      count: 3,
      patterns: [
        ['stick',null,'stick', 'stick','stick','stick', 'stick',null,'stick']
      ]
    },
    {
      name: 'Bogen',
      emoji: '🏹',
      count: 1,
      patterns: [
        [null,'stick','string', 'stick',null,'string', null,'stick','string'],
        ['string','stick',null, 'string',null,'stick', 'string','stick',null],
      ]
    },
    {
      name: 'Pfeile',
      emoji: '➡️',
      count: 4,
      patterns: [
        [null,'flint',null, null,'stick',null, null,'feather',null],
        ['flint',null,null, 'stick',null,null, 'feather',null,null],
      ]
    },
    {
      name: 'Schild',
      emoji: '🛡️',
      count: 1,
      patterns: [
        ['oak_planks','iron_ingot','oak_planks', 'oak_planks','oak_planks','oak_planks', null,'oak_planks',null]
      ]
    },
    {
      name: 'TNT',
      emoji: '🧨',
      count: 1,
      patterns: [
        ['gunpowder','sand','gunpowder', 'sand','gunpowder','sand', 'gunpowder','sand','gunpowder']
      ]
    },
    {
      name: 'Goldapfel',
      emoji: '🍎',
      count: 1,
      patterns: [
        ['gold_ingot','gold_ingot','gold_ingot', 'gold_ingot','apple','gold_ingot', 'gold_ingot','gold_ingot','gold_ingot']
      ]
    },
    {
      name: 'Eisenblock',
      emoji: '⬜',
      count: 1,
      patterns: [
        ['iron_ingot','iron_ingot','iron_ingot', 'iron_ingot','iron_ingot','iron_ingot', 'iron_ingot','iron_ingot','iron_ingot']
      ]
    },
    {
      name: 'Goldblock',
      emoji: '🟡',
      count: 1,
      patterns: [
        ['gold_ingot','gold_ingot','gold_ingot', 'gold_ingot','gold_ingot','gold_ingot', 'gold_ingot','gold_ingot','gold_ingot']
      ]
    },
    {
      name: 'Diamantblock',
      emoji: '🔷',
      count: 1,
      patterns: [
        ['diamond','diamond','diamond', 'diamond','diamond','diamond', 'diamond','diamond','diamond']
      ]
    },
    {
      name: 'Papier',
      emoji: '📄',
      count: 3,
      patterns: [
        [null,null,null, null,null,null, 'sugar_cane','sugar_cane','sugar_cane']
      ]
    },
    {
      name: 'Buch',
      emoji: '📕',
      count: 1,
      patterns: [
        [null,null,null, 'paper',null,null, 'paper','leather','paper'],
        ['paper',null,null, 'paper',null,null, 'leather',null,null],
      ]
    },
  ];

  // Zustand
  let selectedItem = null;
  const grid = [null, null, null, null, null, null, null, null, null];

  // Items-Liste rendern
  function renderItemsList() {
    const list = document.getElementById('itemsList');
    if (!list) return;

    let html = '';
    items.forEach(function(item) {
      html += '<div class="item-slot" data-item-id="' + item.id + '" title="' + item.name + '">';
      html += item.emoji;
      html += '</div>';
    });
    list.innerHTML = html;

    // Klick-Handler fuer Items
    list.querySelectorAll('.item-slot').forEach(function(slot) {
      slot.addEventListener('click', function() {
        // Vorherige Auswahl entfernen
        list.querySelectorAll('.item-slot').forEach(function(s) { s.classList.remove('selected'); });
        slot.classList.add('selected');
        selectedItem = slot.dataset.itemId;
        if (window.playClickSound) window.playClickSound();
      });
    });
  }

  // Suche
  const searchInput = document.getElementById('craftingSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const list = document.getElementById('itemsList');
      if (!list) return;
      list.querySelectorAll('.item-slot').forEach(function(slot) {
        const item = items.find(function(i) { return i.id === slot.dataset.itemId; });
        if (item && item.name.toLowerCase().indexOf(query) !== -1) {
          slot.style.display = '';
        } else {
          slot.style.display = 'none';
        }
      });
    });
  }

  // Grid-Slots klickbar machen
  const gridSlots = document.querySelectorAll('#craftingGrid .grid-slot');
  gridSlots.forEach(function(slot) {
    slot.addEventListener('click', function() {
      const idx = parseInt(slot.dataset.slot);

      if (grid[idx] !== null) {
        // Item entfernen
        grid[idx] = null;
        slot.textContent = '';
        slot.classList.remove('has-item');
      } else if (selectedItem) {
        // Item platzieren
        const item = items.find(function(i) { return i.id === selectedItem; });
        if (item) {
          grid[idx] = selectedItem;
          slot.textContent = item.emoji;
          slot.classList.add('has-item');
        }
      }

      if (window.playClickSound) window.playClickSound();
      checkRecipe();
    });
  });

  // Rezept pruefen
  function checkRecipe() {
    const resultSlot = document.getElementById('resultSlot');
    const resultInfo = document.getElementById('resultInfo');
    if (!resultSlot || !resultInfo) return;

    let matched = null;

    for (let r = 0; r < recipes.length; r++) {
      const recipe = recipes[r];
      for (let p = 0; p < recipe.patterns.length; p++) {
        const pattern = recipe.patterns[p];
        if (matchesPattern(grid, pattern)) {
          matched = recipe;
          break;
        }
      }
      if (matched) break;
    }

    if (matched) {
      resultSlot.textContent = matched.emoji;
      resultSlot.classList.add('has-result');
      resultInfo.textContent = matched.name + (matched.count > 1 ? ' x' + matched.count : '');
    } else {
      resultSlot.textContent = '';
      resultSlot.classList.remove('has-result');
      resultInfo.textContent = '';
    }
  }

  // Pattern-Matching (exakt)
  function matchesPattern(currentGrid, pattern) {
    for (let i = 0; i < 9; i++) {
      const gridItem = currentGrid[i] || null;
      const patternItem = pattern[i] || null;
      if (gridItem !== patternItem) return false;
    }
    return true;
  }

  // Grid loeschen
  const clearBtn = document.getElementById('clearGrid');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      for (let i = 0; i < 9; i++) {
        grid[i] = null;
      }
      gridSlots.forEach(function(slot) {
        slot.textContent = '';
        slot.classList.remove('has-item');
      });
      checkRecipe();
      if (window.playClickSound) window.playClickSound();
    });
  }

  // Initialisieren
  renderItemsList();

})();
