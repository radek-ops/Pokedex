# Card-Pokedex

Eine webbasierte Pokédex-Anwendung, die Pokémon-Daten von der [PokéAPI](https://pokeapi.co/) abruft und in einer ansprechenden Kartenansicht darstellt.

## Funktionen

- **Pokémon-Thumbnails** – Pokémon werden als Karten mit typbasierten Hintergrundfarben angezeigt
- **Live-Suche mit Autocomplete** – Suche nach Pokémon-Namen ab 3 eingegebenen Zeichen
- **Detail-Dialog** – Klick auf ein Pokémon öffnet einen Modal-Dialog mit umfangreichen Informationen:
  - **About** – ID, Größe, Gewicht, Basis-Erfahrung, Kategorie und Fähigkeiten
  - **Stats** – Alle Basiswerte (HP, Angriff, Verteidigung, Spezial-Angriff, Spezial-Verteidigung, Initiative)
  - **Evolution** – Entwicklungsreihe des Pokémon
  - **Moves** – Liste der ersten Attacken
- **Navigation** – Vor- und Zurück-Pfeile im Dialog zum Durchblättern der Pokémon
- **„Load more"** – Lädt jeweils 20 weitere Pokémon nach
- **Fehlermeldung** – Sprachblase bei ungültiger Sucheingabe
- **Ladespinner** – Wird beim Abruf von API-Daten angezeigt
- **Responsive Design** – Optimiert für verschiedene Bildschirmgrößen

## Technologien

- **HTML5** – Semantische Struktur
- **CSS3** – Custom Properties, Flexbox, Animationen, Media Queries
- **JavaScript (ES6+)** – Async/Await, Fetch API, DOM-Manipulation
- **PokéAPI** – Externe REST-API für Pokémon-Daten

## Projektstruktur

```
Pokedex/
├── index.html              # Hauptseite der Anwendung
├── impressum.html           # Impressum-Seite
├── README.md               # Projektdokumentation
├── scripts/
│   ├── script.js           # Hauptlogik: API-Calls, Event-Handler, Rendering
│   └── template.js         # HTML-Template-Funktionen für Thumbnails & Dialog
├── style/
│   ├── styles.css          # Haupt-Stylesheet (Layout, Thumbnails, Header, Footer)
│   ├── fonts.css           # @font-face-Definitionen
│   ├── dialog.css          # Styles für den Pokémon-Detail-Dialog
│   ├── spinner.css         # Styles für den Ladespinner
│   └── impressum.css       # Styles für die Impressum-Seite
├── fonts/
│   ├── Ubuntu/             # Ubuntu-Schriftfamilie (Regular, Bold, Italic, Light, Medium)
│   ├── Boldonse/           # Boldonse-Schriftart
│   └── Montserrat/         # Montserrat-Schriftfamilie (Variable + Static)
└── img/
    ├── honyComb.png        # Hintergrundbild (Wabenmuster)
    ├── honyComb2.png       # Alternatives Hintergrundbild
    ├── Favicon/            # Favicon in verschiedenen Größen
    ├── icons8-insignia-3-color/  # Logo/Navigations-Icon
    └── icons8-spinner-color/     # Ladespinner-Icon
```

## Installation & Ausführung


1. **Repository klonen:**
   ```bash
   git clone https://github.com/radek-ops/Pokedex.git
   cd Pokedex
   ```

2. **Lokalen Entwicklungsserver starten** (z. B. mit Python):
   ```bash
   python3 -m http.server 8000
   ```

3. **Im Browser öffnen:**
   ```
   http://localhost:8000
   ```

> [!NOTE]
> Da die Anwendung externe API-Abrufe über `fetch` durchführt und lokale Schriftarten verwendet, wird ein lokaler Webserver benötigt. Ein direktes Öffnen der `index.html` per `file://`-Protokoll kann zu CORS-Problemen oder fehlerhaften Schriftarten-Pfaden führen.

## Verwendung

1. Die Seite lädt automatisch die ersten 20 Pokémon
2. Über das Suchfeld kann nach Namen gesucht werden (mindestens 3 Zeichen)
3. Ein Klick auf ein Pokémon-Thumbnail öffnet den Detail-Dialog
4. Im Dialog kann zwischen den Tabs **About**, **Stats**, **Evolution** und **Moves** gewechselt werden
5. Mit den Pfeiltasten im Dialog wird zum vorherigen/nächsten Pokémon navigiert
6. Der **Load more Pokémons**-Button lädt 20 weitere Pokémon

## API

Die Anwendung nutzt die kostenlose [PokéAPI](https://pokeapi.co/):

- `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0` – Liste aller Pokémon (paginiert)
- `GET https://pokeapi.co/api/v2/pokemon/{id|name}` – Details eines Pokémon
- `GET https://pokeapi.co/api/v2/pokemon-species/{id}` – Art-Informationen (Kategorie)
- `GET https://pokeapi.co/api/v2/evolution-chain/{id}` – Entwicklungsreihe

## Autor

© Radek Gnych | [Impressum](./impressum.html)

## Lizenz

Dieses Projekt dient ausschließlich zu Lern- und Demonstrationszwecken. Pokémon und Pokémon-Charakternamen sind Marken von Nintendo.