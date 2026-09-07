# Architecture

> 🚧 **Status: not yet designed.** The source Product Requirements Document defines _what_ the
> product does (four modules, offline-first, bedside UX) but does not specify a technical
> architecture, tech stack, or data flow. This document captures what can be derived from the PRD
> today, and will be filled in as engineering design decisions are made. Nothing below should be
> read as a committed technical decision unless stated as such.

## What is defined

The product is a **self-contained tablet/kiosk application** organized around a home screen and
four modules, each independently reachable within one or two taps:

1. **Sound & Calm** — an offline audio library, grouped into categories (Calm / Instrumental /
   Spiritual), with a simple player (play/pause, next/previous, progress, playlist navigation).
2. **Hydration Check** — a form that takes two manual inputs (temperature, pulse), evaluates them
   against **deterministic, clinically-validated thresholds** (no AI/ML involved), and returns one
   of three status levels (Normal / Attention / Alert), plus a session-based history view.
3. **Move & Ease** — an offline video library, grouped into categories (e.g. Breathe & Relax, Body
   Relaxation, Movement & Comfort, Stretch & Ease), with a simple video player.
4. **Learn** — a curated FAQ directory plus a search bar, scoped to **approved content only**
   (not open internet search), since Phase 1 is designed to run fully offline.

## Cross-cutting constraints

- **Offline-first**: core content (music, video, FAQ text) must be bundled and stored locally on
  the device; the app must remain functional with no network connection.
- **No AI-generated or free-text clinical content**: Hydration Check logic is rule-based, not
  model-based. Learn content is curated and reviewed, not generated. There is no LLM or generative
  component described anywhere in the current PRD — if one is introduced later (e.g. for search),
  it will need to go through the same clinical-review gate as any other clinical-facing content.
- **Multilingual**: 13 Indian languages at launch, applying to UI, audio, video, and Learn content.
- **Minimal data collection**: Hydration Check entries are session-based; no patient-identifiable
  information (name, phone, patient ID) is collected in Phase 1. Longitudinal, patient-linked
  history is explicitly a future-phase item requiring separate privacy/consent work.

## Not yet defined

The following are genuinely undecided as of this document — do not assume any of these:

- Application framework / platform (native, cross-platform, web-based kiosk, etc.)
- Data storage format for offline content and session history
- Exact Hydration Check thresholds and their clinical validation status
- Search implementation for Learn (keyword match vs. something more sophisticated)
- Update/sync mechanism for when a device does get connectivity
- Packaging and deployment model for facility rollout

## Future-phase items (not started)

- Labour-room TV / display casting
- Integration with bedside monitoring devices and EMR systems
- Clinician-facing dashboards
- Digital Public Good registration and broader implementation support

See [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) for governance around who signs off on clinical
logic changes once this architecture is built out, and [QA_PROCESS.md](./QA_PROCESS.md) for how
clinical content will be evaluated.
