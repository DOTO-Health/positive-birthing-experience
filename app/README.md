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

- Licence for code: PRD says MIT, Project Charter says Apache 2.0. Pick one and add a LICENSE file. Content (CC BY / BY-SA / CC0) needs per-track licence, author and source recorded.
- No CC-licensed prenatal exercise video found yet; see `research/positive-birth-evidence.md`.
- Native-speaker and clinical review of all 13 languages.
- Fonts load from Google Fonts on first visit and are cached by the service worker; bundle the font files for fully offline first load.
- Audio is not precached by the service worker (large files): bundle media with the deployment.
