# Positive Birthing Companion

Offline-first web app for labour-room nurses and midwives (Doto Health × UNICEF FemTech Ventures).
Four modules: **Sound & Calm**, **Hydration**, **Move & Ease**, **Learn**, in 13 languages.
It is a support tool: it surfaces evidence-based comfort practices and assessment prompts and never diagnoses or replaces clinical judgement.

## Run it

```bash
node tools/serve.mjs 8080      # then open http://localhost:8080
```

Add `?demo=1` to the URL to get a 1-minute sip-reminder interval for demos. Use the bundled server: it supports HTTP Range requests, which audio seeking needs (`python -m http.server` does not).
No build step, no dependencies. For a kiosk, serve the `app/` folder from any static host or from the device itself and install it as a PWA.

## Layout

```
app/
  index.html, css/styles.css, sw.js, manifest.webmanifest
  js/        app (router, header, language sheet, reminder tick), core (i18n, storage, counters),
             player, home, sound, hydration, move, learn, art
  data/      tracks.json, videos.json, learn.json, facts.json, hydration-rules.json
  locales/   one JSON per language (+ archive/ for parked languages)
  assets/    logo.png, audio/ (15 unique tracks)
research/    positive-birth-evidence.md (guidelines, evidence, sources, open gaps)
mockups/     approved UI mockups
tools/       serve.mjs
```

## Things to edit

- **Translations:** `app/locales/<code>.json`. Every language is an unreviewed machine draft. Keys missing from a language fall back to English (the newest UI strings are English-only for now). Keep `{n}`, `{greeting}`, `{nurse}` placeholders.
- **Music:** `app/data/tracks.json` (category, title, artwork scene). Drop a new MP3 in `app/assets/audio/` and add an entry.
- **Videos:** `app/data/videos.json`. Entries with `src: null` show a "coming soon" card. Set `src`, `license`, `author`, `source_url` once licensed footage exists.
- **Hydration rules:** `app/data/hydration-rules.json`. **Values are samples and not clinically validated.** The Clinical/Obstetric Advisory Board must set them before any deployment. The app shows a visible warning while `clinically_validated` is `false`.
- **Home evidence line:** `app/data/facts.json`.

## Privacy

No accounts, no patient names or IDs. The labour clock and anonymous shift counters (practices offered, reminders answered) live in the device's local storage only.

## Open items

- Code licence set to Apache-2.0 (per the Project Charter); the PRD said MIT. Confirm with the maintainers.
- Prenatal videos: 91 CC BY videos found on YouTube, none downloaded or clinically reviewed; see `research/all-cc-videos.md`.
- Native-speaker and clinical review of all 13 languages.
- Fonts load from Google Fonts on first visit and are cached by the service worker; bundle the font files for fully offline first load.
- Add licensed music, then record each track in `legal/ATTRIBUTION.md`.

## Licences

| What | Licence |
|---|---|
| Source code (`app/js`, `app/css`, `tools`) | Apache-2.0 (`LICENSE`) |
| Our own content (translations, learning cards, artwork, research notes) | CC BY-SA 4.0 (`LICENSES/CC-BY-SA-4.0.txt`) |
| Linked YouTube videos | Creators' CC BY, credited in `legal/ATTRIBUTION.md`; not relicensed by us |
| Logo and names | Trademarks of Doto Health, not open-licensed (`TRADEMARKS.md`) |
| Music | **None included yet.** Sound & Calm shows "coming soon" until licensed tracks are added |

Machine-translated text and hydration thresholds are drafts that have not been clinically reviewed.

## Media is not in this repository

No audio or video files are included. Earlier test music was removed because none of it was licensed for public redistribution (see `research/audio-licences.md`). Video entries in `app/data/videos.json` link to YouTube videos marked CC BY; see `research/english-cc-videos.md`. The `.gitignore` keeps local media out of the repository.
