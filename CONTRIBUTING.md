# Contributing

> 🚧 This project has just started. No application code has been published yet, so most of this
> document describes the intended process (per [PROJECT_CHARTER.md](./PROJECT_CHARTER.md)) rather
> than a working setup you can run today. Dev environment setup steps will be added once code
> exists.

## Before you contribute

Read [PROJECT_CHARTER.md](./PROJECT_CHARTER.md) for the project's scope, licensing approach
(Apache 2.0 for code, Creative Commons for content), and governance model. In short:

- **Application/engineering changes** (UI, offline sync, performance, non-clinical features):
  standard pull-request review; merged with at least one maintainer approval.
- **Clinical content and logic changes** (Hydration Check thresholds and wording, Learn FAQ
  content, exercise contraindications/gestational restrictions): require sign-off from the
  Clinical/Obstetric Advisory Board in addition to normal code review. This board has not yet
  been formed — see [Open Items](./README.md#status--roadmap).
- **Licensing and content-sourcing decisions**: decided jointly by maintainers and the UNICEF
  FemTech Ventures programme partner.

If you're not sure which category your change falls into, open an issue first and ask.

## Reporting issues

Open a GitHub issue describing the problem or proposal. For anything touching clinical content or
logic, clearly flag it as such in the issue title/description so it routes to clinical review.

## Pull requests

1. Fork the repo and create a branch from `main`.
2. Keep PRs scoped to a single change where possible.
3. If your change touches clinical content or logic (see above), tag it for Clinical/Obstetric
   Advisory Board review — do not merge on engineering approval alone.
4. Describe what changed and why in the PR description.

## Content contributions

Music, video, and educational content follow a separate licensing track (Creative Commons) from
code (Apache 2.0). If you're proposing new content:

- It must be Creative Commons-licensed, public-domain, or original content you're willing to
  release under an open CC license.
- All third-party content is reviewed for license compatibility and attribution before inclusion.
- Clinical/educational content (e.g. Learn FAQ answers) additionally requires clinical review and
  a traceable citation, per [QA_PROCESS.md](./QA_PROCESS.md).

## Code of Conduct

All contributors are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
