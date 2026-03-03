# Minecraft Website fuer Holzi1567

## Projekt-Ueberblick
Statische Minecraft-themed Website fuer Mattia (Minecraft-Name: Holzi1567, UUID: ceff4d7e01f6447b865f6b3c54391233). Gehostet auf GitHub Pages.

## Technologie
- Reines HTML/CSS/JS (kein Framework, kein Build-Step)
- GitHub Pages kompatibel
- Google Font: "Press Start 2P"

## Sprache & Konventionen
- Gesamte Website auf Deutsch
- Kein scharfes S, immer "ss"
- Gendern mit Doppelpunkt (z.B. "Spieler:innen")

## Dateistruktur
```
/
├── index.html              (Startseite mit Hero, Skin, Feature-Cards)
├── server-status.html      (Live Server-Status: HugoSMP, GommeHD, OPSucht)
├── achievements.html       (20 echte Minecraft Advancements)
├── pvp-tipps.html          (5 taeglich rotierende PvP-Tipps aus 50)
├── minigame.html           (3 Minispiele: Quiz, Memory, Mob Jagd)
├── css/
│   └── style.css           (Alle Styles, 3 Themes, responsive, dunkles Design)
├── js/
│   ├── main.js             (Navigation, Theme-Cycle, Tag/Nacht, Sound, Easter Eggs)
│   ├── server-status.js    (API-Abfrage mcsrvstat.us)
│   ├── pvp-tipps.js        (50 Tipps, datumsbasierte Rotation)
│   └── minigame.js         (Quiz, Block Memory, Mob Jagd)
└── CLAUDE.md
```

## Design
- Dunkles Grunddesign mit guter Lesbarkeit
- Helle Schrift auf dunklem Hintergrund
- 3 Themes aenderbar ueber Cycle-Button im Header (Klick = naechstes Theme)

## 3 Themes (localStorage gespeichert)
1. **Overworld** (Standard): Gruen/Braun, dunkler Waldboden-Look
2. **Nether**: Rot/Orange mit Lava-Partikeln
3. **End**: Lila/Gelb mit schwebenden End-Partikeln

## 3 Minispiele
1. **Minecraft Quiz**: 20 Multiple-Choice Fragen
2. **Block Memory**: 4x4 Karten-Memory mit Minecraft-Bloecken
3. **Mob Jagd**: Mobs erscheinen, verschiedene geben unterschiedliche Punkte

## Easter Eggs
1. Konami Code: Diamantenregen
2. Creeper Sneak (index.html): Nach 30s Inaktivitaet
