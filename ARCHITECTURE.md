# Architecture

Positive Birthing Companion is an **open-source, offline-first web application** that brings WHO's
positive-childbirth practices to nurses and midwives at the bedside. It is being built as a
**Digital Public Good (DPG)**: anyone may run, adapt, translate and redistribute it. This document
describes how it is built, why, and what is still undecided.

> **Status: Phase 1 prototype.** The four modules are implemented and run in a browser. Clinical
> content (hydration thresholds, learning cards, translations, video selection) is **draft and has
> not been clinically reviewed**. Anything marked _Open_ below is undecided. See
> [QA_PROCESS.md](./QA_PROCESS.md) for how content becomes release-ready.

## 1. Design principles

| Principle                              | What it means in practice                                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Open by default**                    | Code is Apache-2.0, our own content is CC BY-SA 4.0, third-party content keeps its own licence and is credited. Nothing proprietary is required to build, run or translate it. |
| **Offline-first**                      | Everything a nurse needs works with no network after the first load.                                                                                                           |
| **Platform independent**               | Plain HTML, CSS and JavaScript. No framework, no build step, no backend, no vendor SDK. It runs on any device with a modern browser.                                           |
| **Support, not decide**                | The app surfaces comfort practices and assessment prompts. It does not diagnose, treat or make autonomous clinical decisions. There is no AI or ML component.                  |
| **Clinical content is data, not code** | Anything with clinical meaning lives in small, reviewable data files so a clinician can review a change without reading JavaScript.                                            |
| **Privacy by design**                  | No accounts, no patient names, phone numbers or IDs. Data stays on the device.                                                                                                 |
| **Adaptable**                          | Languages, content packs and branding can be swapped without touching application logic.                                                                                       |

## 2. Technology choices (decided)

| Area       | Decision                                                                                                                     | Reason                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| App type   | Static **Progressive Web App**, installable, kiosk-friendly, landscape-first but responsive                                  | One codebase for tablets, phones and desktops; no app-store dependency                     |
| Language   | Vanilla **ES modules**, no framework, no transpiler                                                                          | Lowest barrier for contributors and for long-term maintenance; nothing to rebuild or audit |
| Routing    | Hash routes (`#/home`, `#/sound`, ...)                                                                                       | Works from any static host, no server rewrites                                             |
| Storage    | `localStorage` (wrapped so it never throws); JSON files for content                                                          | Simple, inspectable, no database                                                           |
| Offline    | **Service worker**: precaches the app shell; network-first for same-origin files with cache fallback; media is not precached | Edits show up when online, and the app still opens when offline                            |
| Languages  | One JSON file per language; English fallback; right-to-left supported (Urdu)                                                 | Anyone can add or correct a language with a pull request                                   |
| Dev server | `tools/serve.mjs` (Node, no dependencies) with HTTP Range support                                                            | Audio and video seeking needs Range requests                                               |
| Hosting    | Any static host or a local device. No server-side code                                                                       | Keeps the deployment surface minimal                                                       |

## 3. Repository layout

```
app/
  index.html, css/styles.css, sw.js, manifest.webmanifest
  js/        app.js (router, header, language sheet, reminder tick)
             core.js (i18n, safe storage, shift counters, helpers)
             home.js  sound.js  hydration.js  move.js  learn.js
             player.js (persistent audio player)   art.js (original SVG artwork)
  data/      hydration-rules.json   learn.json   facts.json   videos.json   tracks.json
  locales/   one JSON per language (+ archive/ for parked languages)
  assets/    logo.png            (no audio or video is bundled)
legal/       ATTRIBUTION.md, content-licences.csv, evidence/   third-party credits and proof
LICENSES/    full licence texts (Apache-2.0, CC BY-SA 4.0, CC BY 4.0 and 3.0)
research/    evidence base, licence research, content candidates
tools/       serve.mjs (dev server) and YouTube licence-checking helpers
mockups/     approved UI mockups
```

## 4. How the app works

```
                +--------------------------- browser ---------------------------+
                |  index.html                                                    |
                |    app.js  --- hash router --->  module.mount(el, ctx)         |
                |      |                              home | sound | hydration  |
                |      |                              move | learn              |
                |      +-- header, language sheet, sip-reminder banner (global)  |
                |      +-- 1-second tick: hydration reminders fire on any screen |
                |                                                                |
                |  core.js   i18n  <--- locales/<code>.json   (English fallback) |
                |            store <--- localStorage  (language, labour clock,   |
                |                                       anonymous shift counters)|
                |  data/*.json  (content and clinical configuration)             |
                |  player.js   one audio element, survives navigation            |
                +--------------------------+-------------------------------------+
                                           |
                                  sw.js (service worker, offline cache)
```

- **Module contract:** each module exports `mount(el, ctx)` and returns an optional unmount function.
  Adding a module means one file plus one route.
- **Global behaviour:** the sip reminder is checked once a second in `app.js`, so the banner and chime
  appear whichever module is open.
- **No network calls** are made by the app code. The only external request is the font stylesheet
  (see _Open_ item on bundling fonts).

## 5. The four modules (as built)

| Module           | Behaviour                                                                                                                                                                                                           | Clinical surface                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Home**         | Greeting follows the device clock; the word "nurse" cycles through the 13 languages; rotating evidence line; anonymous counters for the current 12-hour shift                                                       | `facts.json` (claims and citations)                                                    |
| **Sound & Calm** | Category tabs and a persistent player. **Currently shows "coming soon"** because no track is licensed for open redistribution                                                                                       | Wording only; no clinical claims                                                       |
| **Hydration**    | A labour clock reminds the nurse to offer sips at a facility-set interval (30/45/60 min). Optional temperature and pulse check returns Normal / Attention / Alert as a **prompt for assessment, never a diagnosis** | `hydration-rules.json`, `hydration.js` (`evaluate`), hydration strings in every locale |
| **Move & Ease**  | Four tabs of video cards. Entries link to Creative Commons videos; no video files are bundled, so cards show "coming soon" until a licensed file exists                                                             | `videos.json` (which videos, stage and contraindication labels)                        |
| **Learn**        | Ten swipeable practice cards, each with its source                                                                                                                                                                  | `learn.json`, card strings in every locale                                             |

**Differences from the PRD (to be confirmed by the maintainers and clinical board):**
the PRD describes Hydration as a two-number check only; the build adds the one-tap labour clock and
reminder. The PRD describes Learn as an FAQ directory with search; the build ships ten cards and no search.

## 6. Data and privacy

- **Stored on the device only** (`localStorage`): chosen language; the labour clock (start time,
  interval, a log of offers and optional temperature/pulse checks with timestamps); anonymous
  per-shift counters.
- **Never collected:** names, phone numbers, patient IDs, location, device identifiers, analytics.
- **Not yet implemented:** a clear "End session / erase data" action, and an export of the
  anonymous counters (needed for the DPG "mechanism for extracting data" indicator).
- Longitudinal, patient-linked history is a future-phase item that needs its own privacy,
  consent and data-governance design under India's Digital Personal Data Protection Act, 2023.

## 7. Content, translation and licensing architecture

- **Content is separate from code.** Clinical and educational content sits in `data/` and
  `locales/`. Reviewers, translators and contributors work on those files.
- **Translations:** 13 launch languages (English, Hindi, Kannada, Tamil, Malayalam, Telugu, Marathi,
  Gujarati, Assamese, Odia, Bengali, Punjabi, Urdu). Current non-English text is a **machine draft**;
  each locale file records its confidence and review status. A missing key falls back to English.
- **Media policy:** no audio or video files are committed. Music and video enter only with a verified
  open licence recorded in `legal/ATTRIBUTION.md` and `legal/content-licences.csv`. Videos are linked
  rather than copied unless the creator confirms in writing.
- **Licence map:** code Apache-2.0 / own content CC BY-SA 4.0 / third-party content as credited /
  logo and names are Doto Health trademarks (see `TRADEMARKS.md`).

## 8. Digital Public Good alignment

Mapped to the nine indicators of the [DPG Standard](https://digitalpublicgoods.net/standard/).
"Status" is an honest self-assessment; confirm the details against the current DPG Standard guide
before submitting.

| #   | Indicator                     | How this project addresses it                                                                                                               | Status                                                                     |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | SDG relevance                 | Maternal health: SDG 3 (good health and well-being), with SDG 5 (gender equality) and SDG 10 (reduced inequalities) through language access | Documented in README                                                       |
| 2   | Open licensing                | Apache-2.0 code, CC BY-SA 4.0 own content, third-party CC BY credited                                                                       | In place; code licence to be confirmed against the PRD (MIT)               |
| 3   | Clear ownership               | Doto Health owns the project; trademarks stated; third-party owners credited                                                                | In place; add copyright holders for all contributors                       |
| 4   | Platform independence         | Static web app, no proprietary dependency; fonts are the only external request                                                              | Mostly met; bundle fonts                                                   |
| 5   | Documentation                 | README, this file, QA process, research and licence records                                                                                 | Partly met; add CONTRIBUTING, install and deployment guide, language guide |
| 6   | Mechanism for extracting data | Little data is collected, all on-device                                                                                                     | Open: add export of anonymous counters                                     |
| 7   | Privacy and applicable laws   | No personal data; DPDP Act 2023 considered                                                                                                  | Open: privacy notice and data-retention statement                          |
| 8   | Standards and best practices  | Web standards (PWA, ES modules, WCAG-minded targets), WHO guidance as the content standard                                                  | Open: accessibility audit, FHIR mapping for future EMR work                |
| 9   | Do no harm by design          | Non-diagnostic wording; clinical review gate; no AI; no patient data; no user-generated content                                             | Gate defined in QA_PROCESS.md; board not yet formed                        |

## 9. Security and robustness

- No third-party scripts, no remote code, no user-generated content, no accounts.
- All dynamic text is HTML-escaped before rendering.
- Storage access is wrapped, so the app still works with storage blocked.
- **Open:** add a Content Security Policy once fonts are bundled; pin and document the service-worker
  cache versioning; add dependency-free automated tests (see QA_PROCESS.md).

## 10. Decisions

| Decision                                                   | Date    | Notes                                                                 |
| ---------------------------------------------------------- | ------- | --------------------------------------------------------------------- |
| Static PWA with no framework or backend                    | 2026-10 | Lowest maintenance burden for a public good                           |
| Hydration is rule-based and thresholds live in a data file | 2026-10 | Lets clinicians review numbers without reading code                   |
| No audio or video files in the repository                  | 2026-11 | No available track was licensed for redistribution; videos are linked |
| Apache-2.0 for code                                        | 2026-11 | Follows the Project Charter; the PRD proposed MIT; confirm            |

## 11. Open questions

- Hydration thresholds and their clinical validation (sample values only today)
- Whether Learn needs search, and how, without any generative component
- Update and sync mechanism when a device regains connectivity
- Packaging and rollout for facilities (installable PWA, managed tablets, or both)
- How licensed music and any bundled video are distributed without being committed
- Bundling the Inter and Noto fonts for a fully offline first load
- Accessibility audit and usability testing with nurses and midwives

## 12. Future-phase items (not started)

- Labour-room TV or display casting
- Integration with bedside monitoring devices and EMR systems
- Clinician-facing dashboards
- Additional languages and regional content packs
- DPG registration and wider implementation support

## Related documents

- [QA_PROCESS.md](./QA_PROCESS.md): technical and clinical review of every change
- [README.md](./README.md): how to run, edit content and the licence table
- `research/`: evidence base, licence research and content candidates
- `legal/`: attribution and licence evidence for third-party content
- Project Charter and CONTRIBUTING guide: governance and contributor onboarding (to be added to this repository)
