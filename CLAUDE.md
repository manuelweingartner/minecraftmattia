# Minecraft Website fuer Holzi1567

## Projekt-Ueberblick
Statische Minecraft-themed Website fuer Mattia (Minecraft-Name: Holzi1567, UUID: ceff4d7e01f6447b865f6b3c54391233). Gehostet auf GitHub Pages.

## Technologie
- Reines HTML/CSS/JS (kein Framework, kein Build-Step)
- GitHub Pages kompatibel
- Google Font: "Press Start 2P"

## Sprache & Konventionen
- Gesamte Website auf Deutsch
- Kein scharfes S (ß), immer "ss"
- Gendern mit Doppelpunkt (z.B. "Spieler:innen")
- Keine Gedankenstriche

## Dateistruktur
```
/
├── index.html              (Startseite mit Hero, Skin, Feature-Cards)
├── server-status.html      (Live Server-Status: HugoSMP, GommeHD, OPSucht)
├── builds.html             (Build-Showcase mit Platzhaltern)
├── achievements.html       (20 Minecraft Erfolge, 12 freigeschaltet)
├── pvp-tipps.html          (5 taeglich rotierende PvP-Tipps aus 50)
├── crafting.html            (Interaktiver 3x3 Crafting-Rechner)
├── minigame.html           (Creeper Clicker Spiel)
├── inventar.html           (Minecraft Inventar-UI)
├── css/
│   └── style.css           (Alle Styles, 3 Themes, responsive)
├── js/
│   ├── main.js             (Navigation, Theme, Tag/Nacht, Sound, Easter Eggs)
│   ├── server-status.js    (API-Abfrage mcsrvstat.us)
│   ├── pvp-tipps.js        (50 Tipps, datumsbasierte Rotation)
│   ├── crafting.js          (Crafting-Grid mit 26 Rezepten)
│   ├── minigame.js         (Creeper Clicker Spiellogik)
│   └── inventar.js         (Tooltip-Positionierung)
└── CLAUDE.md
```

## APIs
- Skin-Render: Crafatar (https://crafatar.com) mit UUID ceff4d7e01f6447b865f6b3c54391233
- Skin-Fallback: Minotar (https://minotar.net) mit Username Holzi1567
- Server-Status: mcsrvstat.us API (https://api.mcsrvstat.us/3/{adresse})
- Server-Icons: mcsrvstat.us (https://api.mcsrvstat.us/icon/{adresse})

## 3 Themes (localStorage gespeichert)
1. **Overworld** (Standard): Gruen/Braun/Blau
2. **Nether**: Rot/Orange/Dunkel mit Lava-Partikeln
3. **End**: Lila/Gelb/Schwarz mit End-Partikeln

## Tag/Nacht Zyklus
- 06:00-18:00: Tagmodus (hell, Sonne)
- 18:00-06:00: Nachtmodus (dunkler, Sterne, Mond)

## Easter Eggs
1. **Konami Code** (↑↑↓↓←→←→BA): Diamantenregen
2. **Enderman** (builds.html): Teleportiert sich bei Hover
3. **Creeper Sneak** (index.html): Nach 30s Inaktivitaet schleicht Creeper hoch

## Server-Konfiguration
- HugoSMP: hugosmp.net
- GommeHD.net: gommehd.net
- OPSucht.net: opsucht.net
- Alle pruefen ob "Holzi1567" online ist

## Sound
- Synthetische Sounds via Web Audio API (kein externer Audio-File noetig)
- Standard: aus (muss manuell aktiviert werden)
