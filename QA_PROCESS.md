# QA Process

> 🚧 This project has just started. The PRD defines the _principle_ that all clinical content must
> be evidence-traceable and clinically reviewed, but does not yet define exact thresholds, review
> checklists, or a formal evaluation methodology. This document captures what is established and
> flags what's still open — it is not a complete QA process yet.

## What this covers

Unlike an AI summarization pipeline, this project does not currently use any AI/LLM-generated
clinical content. Hydration Check is deterministic rule-based logic, and Learn is curated,
pre-written content. QA here is primarily about **content correctness and traceability**, not
model output grounding.

## Clinical Content Safety (per PRD)

All clinical and patient-facing content must be:

- Based on the accompanying Clinical Evidence Review document
- Reviewed and approved by a qualified obstetric/midwifery advisory board **before deployment**
  (this board has not yet been formed — see [README.md, Open items](./README.md#status--roadmap))
- Traceable to a specific evidence source (WHO recommendations or other approved clinical
  evidence), per claim

This applies specifically to:

- **Hydration Check**: the temperature/pulse thresholds and the wording of each of the three
  status levels (Normal / Attention / Alert) must be clinically validated before release. Exact
  thresholds are **not yet defined** — this is an open item.
- **Learn**: every FAQ answer must have a clear source (e.g., a specific WHO recommendation), be
  reviewed for clinical accuracy, and avoid personalised medical advice or diagnostic language.
- **Move & Ease**: any exercise with gestational-age restrictions or contraindications must be
  identified through clinical review before it's added to the library.

## Content licensing review (separate from clinical review)

All third-party music, video, and educational content additionally goes through a licensing
review — checking Creative Commons / public-domain status and attribution requirements — before
inclusion. See [CONTRIBUTING.md](./CONTRIBUTING.md#content-contributions).

## What's not yet defined

- A formal checklist or sign-off template for the Clinical/Obstetric Advisory Board to use
- How often reviewed content is re-validated as WHO guidance updates
- Whether/how the "traceable to evidence source" requirement will be verified systematically
  (e.g., a citation-checking step) versus relying on manual review alone
- Any user-facing or internal testing process for the app itself (usability testing with nurses/
  midwives, offline-reliability testing, multilingual QA)

## What's next

- Form the Clinical/Obstetric Advisory Board
- Finalize and clinically validate Hydration Check thresholds
- Define the Learn FAQ review and sourcing checklist
- Define a repeatable process for citation verification, once content exists to verify
