<a id="readme-top"></a>

# Positive Birthing Companion

[![License: Code](https://img.shields.io/badge/code%20license-Apache--2.0-blue.svg)](./LICENSE.md)
[![License: Content](https://img.shields.io/badge/content%20license-CC%20BY--SA%204.0-lightgrey.svg)](#licensing)
[![Status](https://img.shields.io/badge/status-work--in--progress-yellow.svg)](#status--roadmap)

An offline-first digital companion for the labour room that translates WHO's evidence-based guidance
on positive childbirth experiences into simple, actionable bedside interactions for nurses and
midwives.

Built by Doto Health, as part of the **UNICEF FemTech Ventures** positive-birthing-experience
initiative.

> ⚠️ **Clinical disclaimer:** This solution is a **support tool**, not a diagnostic or
> treatment tool. Hydration Check produces a prompt for further assessment, not a diagnosis.
> Learn provides general health education, not personalised medical advice. Clinical judgment
> stays with the healthcare worker at all times.

> 🚧 **Status:** This project has just started. Most of the pipeline, code, and clinical content
> described below is planned, not yet built or published. See [Status & Roadmap](#status--roadmap).

**[Project Charter](./PROJECT_CHARTER.md)** · [Architecture](./ARCHITECTURE.md) · [Developer Docs](https://doto-health.github.io/positive-birthing-experience/)

---

## Table of Contents

- [About](#about)
- [Modules](#modules)
- [Solution Structure](#solution-structure)
- [Licensing](#licensing)
- [Status & Roadmap](#status--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About

The WHO _recommendations on intrapartum care for a positive childbirth experience (2018)_ and
_recommendations on maternal and newborn care for a positive postnatal experience (2022)_ together
include 56 intrapartum and 63 postnatal recommendations. This guidance is evidence-based, but
impractical to consult mid-shift, at the bedside, in the next few minutes.

Positive Birthing Companion closes that gap with an offline-first tablet/kiosk application, built
around four modules, designed primarily for staff nurses and midwives (large touch targets, minimal
text, one-or-two-tap navigation, usable while gloved and multitasking), with the labouring mother
and her companion as secondary viewers.

It does not diagnose, treat, or make autonomous clinical decisions. It surfaces evidence-based
comfort practices and assessment prompts; clinical judgment stays with the healthcare worker.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Modules

- **Sound & Calm** — curated, evidence-informed relaxation music (Calm / Instrumental / Spiritual)
- **Hydration Check** — temperature/pulse entry with a rule-based hydration prompt (an assessment cue, not a diagnosis)
- **Move & Ease** — guided breathing, movement, and relaxation videos
- **Learn** — short, WHO-sourced answers to common pregnancy, labour, and postnatal questions, with search

Content works offline and is planned to ship in 13 Indian languages at launch.

See [Architecture](./ARCHITECTURE.md) for how each module is planned to fit together technically —
flagged there as design-stage, since no code has been published yet.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Solution Structure

This is the planned layout. No application code has been published yet — see
[Status & Roadmap](#status--roadmap).

```
.
├── ARCHITECTURE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE.md
├── MAINTAINERS.md
├── PROJECT_CHARTER.md
├── QA_PROCESS.md
├── README.md
├── app                 # application code
│   ├── README.md
│   ├── assets
│   │   ├── audio
│   │   │   ├── blessing.mp3
│   │   │   ├── blossom.mp3
│   │   │   ├── celebration-of-life.mp3
│   │   │   ├── earth.mp3
│   │   │   ├── floating.mp3
│   │   │   ├── hypnobirthing-breathing.mp3
│   │   │   ├── motion.mp3
│   │   │   ├── movement.mp3
│   │   │   ├── mozart-effect.mp3
│   │   │   ├── pregnancy-music.mp3
│   │   │   ├── relaxing-432-untitled.mp3
│   │   │   ├── sanctuary.mp3
│   │   │   ├── the-deep.mp3
│   │   │   ├── timing.mp3
│   │   │   └── tuning.mp3
│   │   └── logo.png
│   ├── css
│   │   └── styles.css
│   ├── data
│   │   ├── facts.json
│   │   ├── hydration-rules.json
│   │   ├── learn.json
│   │   ├── tracks.json
│   │   └── videos.json
│   ├── index.html
│   ├── js
│   │   ├── app.js
│   │   ├── art.js
│   │   ├── core.js
│   │   ├── home.js
│   │   ├── hydration.js
│   │   ├── learn.js
│   │   ├── move.js
│   │   ├── player.js
│   │   └── sound.js
│   ├── locales
│   │   ├── archive
│   │   │   ├── brx.json
│   │   │   ├── doi.json
│   │   │   ├── kok.json
│   │   │   ├── ks.json
│   │   │   ├── mai.json
│   │   │   ├── mni.json
│   │   │   ├── ne.json
│   │   │   ├── sa.json
│   │   │   ├── sat.json
│   │   │   └── sd.json
│   │   ├── as.json
│   │   ├── bn.json
│   │   ├── en.json
│   │   ├── gu.json
│   │   ├── hi.json
│   │   ├── index.json
│   │   ├── kn.json
│   │   ├── ml.json
│   │   ├── mr.json
│   │   ├── or.json
│   │   ├── pa.json
│   │   ├── ta.json
│   │   ├── te.json
│   │   └── ur.json
│   ├── manifest.webmanifest
│   └── sw.js
├── assets
│   └── doto-trademark.jpeg
├── docs
│   ├── _config.yml
│   ├── assets
│   │   └── doto-trademark.jpeg
│   ├── getting-started.md
│   ├── index.md
│   └── model-setup.md
└── tools
    └── serve.mjs
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Licensing

This project is built to qualify as a **Digital Public Good (DPG)**. It uses a dual-track approach
because it bundles application code and media/educational content, which the DPG Standard treats
differently:

| Component                          | License                                                            | Why                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Application code                   | **Apache License 2.0**                                             | Permissive adoption by health systems, NGOs, and government digital-health programmes; includes an express patent grant. |
| Music, video & educational content | **Creative Commons (CC BY or CC BY-SA 4.0)**, CC0 where applicable | Matches how the DPG Standard treats non-software content; keeps localisation/adaptation legally simple.                  |

Full DPG registration is tracked as an open item ahead of broader release. See
[PROJECT_CHARTER.md](./PROJECT_CHARTER.md#why-this-license-digital-public-good-compatible-dual-track)
for the full rationale.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Status & Roadmap

This project has just started. Nothing below is confirmed unless checked off.

**Phase 1 — Core Product (planned)**

- [ ] Four core modules: Sound & Calm, Hydration Check, Move & Ease, Learn
- [ ] Offline-first functionality
- [ ] Manual entry of maternal vitals (Hydration Check)
- [ ] Support for 13 Indian languages
- [ ] Hydration Check thresholds clinically validated
- [ ] Learn FAQ library curated and clinically reviewed
- [ ] Music & video content sourced/commissioned and licensed
- [ ] Clinical/Obstetric Advisory Board formed and signed off

**Future Scope (not started, per PRD)**

- [ ] Labour-room TV / display casting
- [ ] Integration with bedside monitoring devices and EMR systems
- [ ] Clinician-facing dashboards
- [ ] Additional regional language and content packs
- [ ] Digital Public Good registration

**Open items requiring confirmation** (per PRD — not yet decided): product name confirmation,
pilot facility & geography, clinical advisory board members, Hydration Check threshold values,
exercise content source/owner, music library finalization, language rollout sequence, data
retention approach.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

This project is pre-alpha; architecture and code have not been published yet. See
[CONTRIBUTING.md](./CONTRIBUTING.md) for how contributions will be handled, and
[QA_PROCESS.md](./QA_PROCESS.md) for how clinical content will be evaluated once available.

All contributors are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

Code licensed under the [Apache License 2.0](./LICENSE.md). Music, video, and educational content
licensed separately under Creative Commons — see [Licensing](#licensing).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

DOTO Software - software@dotohealth.com

Project Link: [https://github.com/DOTO-Health/positive-birthing-experience.git](https://github.com/DOTO-Health/positive-birthing-experience.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---
