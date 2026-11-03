# QA Process

Positive Birthing Companion is a Digital Public Good used in labour rooms. A bug or a wrong
sentence can affect a woman and her baby, so **every pull request into `main` goes through two
reviews: a technical (code) review and, when it touches clinical content, a clinical review.**
Both must pass before merge. This page explains both, so contributors know what to expect.

> **Status:** the review model below is the agreed process. Some tooling (automated tests, CI,
> PR template enforcement, the clinical reviewer team) is still being set up; each section marks
> what exists today and what is planned. The Clinical/Obstetric Advisory Board has **not yet been
> formed**, so no content has been clinically approved.

## 1. The two-gate model at a glance

|                         | **Gate A: Technical review**                           | **Gate B: Clinical review**                                                                              |
| ----------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Applies to              | Every pull request                                     | Every pull request that touches the **clinical surface** (section 3)                                     |
| Reviewer                | A maintainer                                           | A named clinical reviewer from the advisory board                                                        |
| Question asked          | "Does it work, is it safe to run, is it maintainable?" | "Is it clinically correct, safe, sourced and appropriate for the women and staff who will see it?"       |
| Standard process        | Yes (section 5)                                        | Specific to this project (section 4)                                                                     |
| Outcome                 | Approve / request changes                              | Approve / request changes / reject                                                                       |
| Can override the other? | **No**                                                 | **No.** A maintainer cannot merge over a clinical rejection, and a clinician cannot waive a failing test |

**Merge rule for `main`:**

- Non-clinical change: CI green and one maintainer approval.
- Clinical change: CI green, one maintainer approval **and** one recorded clinical approval
  (two clinical approvals for hydration thresholds or any new rule, proposed; the board may change this).
- A change that touches both is reviewed by both, and the PR description must say which parts are which.

## 2. Principles that apply to everything

1. **Support, not decide.** The app offers comfort practices and assessment prompts. It never
   diagnoses, treats or gives personalised medical advice.
2. **Traceable.** Every clinical claim links to a source (a WHO recommendation, a guideline or a
   systematic review), per claim.
3. **No AI-generated clinical content.** There is no generative or ML component. If one is ever
   proposed, it needs its own design review and the full clinical gate.
4. **Do no harm by design.** When unsure, the safer wording or behaviour wins, and the change waits.
5. **Open and auditable.** Reviews, decisions and sign-offs are recorded in the repository so any
   adopter or auditor can see how content became release-ready.

## 3. What counts as the clinical surface

A pull request needs clinical review if it adds, changes or removes any of the following. If you
are unsure, assume it does and say so in the PR; a maintainer will decide.

| Area                                         | Files                                                                    | Examples                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Hydration logic and numbers                  | `app/data/hydration-rules.json`, `app/js/hydration.js` (`evaluate`)      | Thresholds, the three status levels, reminder intervals, input limits                      |
| Learning content                             | `app/data/learn.json`, card strings in `app/locales/*.json`              | Any practice card, its wording or its source                                               |
| Health claims and citations                  | `app/data/facts.json`, impact and evidence wording in the UI             | "+8% more normal births", source labels                                                    |
| Exercise and video selection                 | `app/data/videos.json`                                                   | Which video is offered, stage or trimester labels, contraindication notes, positions shown |
| User-facing clinical wording in any language | `app/locales/*.json` (hydration, status, practice and warning text)      | **Every translation of clinical text**, not just English                                   |
| Safety messaging                             | UI text that says when to call for help or that a value needs assessment | "Assess now", the not-a-diagnosis disclaimer                                               |
| Anything generative or predictive            | Any code or service that produces advice                                 | Not permitted without a design review                                                      |

Typically **non-clinical** (technical review only): styling, layout, performance, build and tooling,
refactoring with no behaviour change, tests, documentation that makes no clinical claim, adding a
new language's _interface_ labels (button names), and music (but see the licensing gate in section 6).

## 4. Gate B: Clinical review

### 4.1 Who can review

- Members of the **Clinical/Obstetric Advisory Board**: obstetricians, midwives or nurse-midwives
  with labour-room experience. Reviewers are named, with their role and, where they agree, their
  registration, in `docs/clinical-signoffs/` (to be created).
- **Language review** of a translation needs a native speaker with clinical or nursing vocabulary.
  Where the same person is not available, a clinician reviews the English source and a native
  speaker reviews the translation.
- Until the board is formed, clinical pull requests stay open or are merged only as labelled
  **draft content** (see 4.6). They are never part of a tagged release.

### 4.2 What the clinical reviewer checks

**Every clinical change**

- [ ] **Accuracy:** consistent with the cited WHO recommendation or guideline, and current
- [ ] **Traceable:** a specific source, with recommendation number or section, for each claim
- [ ] **Scope:** educational or supportive; no diagnosis, no treatment advice, no personalised advice
- [ ] **Safety:** no wording that could delay care; clear when to escalate or call for help
- [ ] **Applicability:** suits the intended user (nurse or midwife) and setting (public and private labour rooms in India), including resource-limited ones
- [ ] **Equity and tone:** respectful, culturally appropriate, free of blame, consistent with respectful maternity care
- [ ] **Low-risk framing:** states when advice applies only to low-risk women

**Hydration thresholds or logic, additionally**

- [ ] A written rationale and source for each number, and the units
- [ ] A table of test cases (input temperature and pulse, expected status) covering both sides of every threshold and the extremes
- [ ] The wording of Normal, Attention and Alert is a prompt for assessment, not a diagnosis
- [ ] Behaviour for out-of-range or missing input is defined
- [ ] `clinically_validated` is set to `true` **only** by the reviewer's change, never by the author

**Move & Ease videos, additionally**

- [ ] The reviewer has **watched the whole video**
- [ ] Positions and movements are appropriate; gestational-age limits and contraindications are labelled
- [ ] No unsafe equipment assumptions (for example a birth ball in a room without one)
- [ ] Spoken language matches the label, and the person demonstrating is competent
- [ ] Licence check passed (section 6)

**Translations, additionally**

- [ ] A native-speaker review of every changed string, preferably with back-translation of safety wording
- [ ] Clinical terms follow local usage that nurses recognise
- [ ] `review_status` in the locale file's `_meta` is updated

### 4.3 How the review is recorded

1. The PR description has a **Clinical review** section (the pull-request template provides it): what
   changed, which sources support it, and which files are on the clinical surface.
2. The PR carries the label **`clinical-review`**. A clinical reviewer is requested.
3. The reviewer leaves a GitHub review, and records the decision in `docs/clinical-signoffs/`:
   reviewer, date, scope (files and commit), decision, sources checked, conditions.
4. On approval a maintainer adds **`clinically-approved`**. Any new commit that touches the clinical
   surface **removes the approval** and requires a fresh review.
5. Rejected or contested changes follow the dispute path in the Project Charter: open discussion
   in the PR, then a joint maintainer and clinical decision, with the reasoning recorded.

### 4.4 What contributors should do

Anyone may propose a clinical change. To get it reviewed quickly:

- Cite the source in the PR (link, recommendation number, date accessed).
- Keep the change small and focused on one topic.
- Do not write medical advice from memory; quote or paraphrase the source.
- Expect clinical review to take longer than code review. It is a deliberate gate, not a delay to be optimised away.
- Never mark content as "validated" yourself.

### 4.5 Re-validation

Approved clinical content is re-reviewed **at least every 12 months**, and whenever the underlying
WHO or national guidance changes. Content past its review date is flagged in the repository and
cannot be included in a new release until re-approved.

### 4.6 Draft content before the board exists

Some content on `main` is draft (the sample hydration thresholds, the machine translations, the
learning cards). The rules until the board signs it off:

- Draft content is **labelled in the interface and README** (for example the "sample thresholds, not
  clinically validated" warning) and carries `clinically_validated: false` or `review_status: unreviewed`.
- Draft content is **not to be used with patients** and is excluded from tagged releases.
- A release can only be tagged when section 7's checklist is fully ticked.

### 4.7 Reporting a clinical safety concern

Anyone who finds clinical content they believe is wrong or unsafe should open an issue labelled
**`clinical-safety`** (a template is planned). These are triaged before any other issue. For a
suspected harm to a patient, contact the maintainers directly and stop using the affected content.

## 5. Gate A: Technical review (standard)

### 5.1 Workflow

- Fork or branch from `main`; short-lived branches named `feat/…`, `fix/…`, `docs/…`, `content/…`.
- Small pull requests, one concern each. Link the issue.
- Commit messages in the imperative mood; squash-merge keeps `main` readable.
- `main` is protected: no direct pushes, required reviews, required checks, linear history.
- Releases use semantic versioning with a changelog and a tag.

### 5.2 Automated checks (planned; none are required by CI yet)

| Check                                                                                                     | Purpose                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Lint and format (JavaScript, JSON, Markdown)                                                              | Consistent, readable code                        |
| JSON validity and **schema** checks for `data/*.json`                                                     | Prevent broken content files                     |
| **Locale key parity**: every language has every key (or an explicit English fallback)                     | Prevent missing text in a labour room            |
| **Unit tests for `evaluate()`** using the clinical test-case table                                        | Hydration logic matches the signed-off numbers   |
| Licence and attribution check: every third-party item in `legal/ATTRIBUTION.md`, no media files committed | DPG and legal compliance                         |
| Link check on documentation and source URLs                                                               | Evidence stays reachable                         |
| Secret and personal-data scan                                                                             | No credentials or patient data in the repository |
| Service-worker `SHELL` list matches the files in `app/`                                                   | Offline start-up keeps working                   |

### 5.3 Technical reviewer checklist

- [ ] The change does what the PR says, and nothing else
- [ ] No new network calls, trackers or third-party scripts
- [ ] No personal or patient data is stored or logged
- [ ] User-visible strings are in the locale files, not hard-coded; all text is HTML-escaped
- [ ] Works offline; new files are added to the service-worker cache list
- [ ] Right-to-left layout is unbroken (check Urdu)
- [ ] Touch targets are at least 48 px, contrast is sufficient, focus is visible, keyboard works
- [ ] No horizontal scroll at phone widths; layouts hold at 375, 768, 1024 and 1440 px
- [ ] Clinical files are untouched, **or** the PR is labelled `clinical-review`
- [ ] Documentation and `ARCHITECTURE.md` are updated if behaviour or structure changed
- [ ] Third-party content is credited in `legal/ATTRIBUTION.md`

### 5.4 Manual test matrix

| Area                 | Minimum                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Devices              | An Android tablet (Chrome), an iPad (Safari), a Windows or Linux kiosk (Chrome or Edge)                                               |
| Orientation and size | Landscape tablet is primary; phone portrait and landscape must remain usable                                                          |
| Offline              | Load once online, switch to airplane mode, reload: all modules work                                                                   |
| Languages            | English plus at least one script per family changed (Devanagari, Dravidian, Bengali-Assamese, Gurmukhi, Gujarati, Odia, Perso-Arabic) |
| Reminder             | Start the labour clock, move between modules, confirm the banner and chime appear, and Offered/Declined reset the timer               |
| Resilience           | Storage blocked or cleared: the app still starts                                                                                      |
| Performance          | First load on a mid-range tablet under about 3 seconds on a normal connection                                                         |
| Usability            | Test with nurses or midwives wearing gloves: reach any module in one or two taps                                                      |

## 6. Content licensing review (separate from clinical review)

Every third-party music, video or text item goes through a licensing review before inclusion:

1. Confirm the **exact licence** and read it (not the label). "Free", "royalty free" and "no copyright" are not licences.
2. Confirm it permits **redistribution in an open-source repository** and the use we make of it.
3. Record title, creator, URL, licence, version and date checked in `legal/ATTRIBUTION.md` and `legal/content-licences.csv`, with evidence in `legal/evidence/`.
4. Prefer **links to the source** over copies. Bundle a file only with the creator's written permission, stored under `legal/permissions/`.
5. **No audio or video files are committed to the repository.** Earlier test music was removed because none of it was licensed for redistribution.

## 7. Release checklist

A release is tagged only when **all** are true:

- [ ] Every clinical-surface file has a recorded clinical approval within the last 12 months
- [ ] No file carries `clinically_validated: false` or `review_status: unreviewed` for any language being released
- [ ] Hydration test cases pass and match the signed-off table
- [ ] Languages released have native-speaker review; others are excluded or labelled draft
- [ ] Licence, attribution and trademark notices are complete
- [ ] The manual test matrix passed on the target devices, including offline
- [ ] The changelog states what clinical content changed, with links to the sign-offs
- [ ] A rollback plan exists for facilities already running the previous version

## 8. Roles

| Role                                                            | Responsibility                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Author**                                                      | Opens the PR, cites sources, never marks content as validated      |
| **Maintainer** (technical reviewer)                             | Gate A, merges when both gates pass, keeps CI and releases healthy |
| **Clinical reviewer**                                           | Gate B, owns the clinical decision and its record                  |
| **Language reviewer**                                           | Native-speaker check of translations                               |
| **Licensing reviewer**                                          | Section 6, can be a maintainer                                     |
| **Project governance** (maintainers with the programme partner) | Resolves disputes, appoints the board, decides roadmap             |

## 9. Not yet defined

- Formation, charter and membership of the Clinical/Obstetric Advisory Board
- The exact sign-off template and where signed records live (`docs/clinical-signoffs/` is proposed)
- The final number of clinical approvers for each type of change
- A systematic citation-checking step, versus manual review alone
- The re-validation calendar, and how WHO updates are monitored
- A formal usability study with nurses and midwives, and an accessibility audit
- CI configuration, test suite, branch protection and CODEOWNERS (a clinical team can own the clinical files once it exists)
- A security and privacy review under the DPDP Act, 2023

## 10. What's next

1. Form the Clinical/Obstetric Advisory Board and appoint the first reviewers
2. Define and clinically validate the hydration thresholds, with the test-case table
3. Review and approve the ten learning cards and their sources
4. Native-speaker and clinical review of the translations, language by language
5. Add CI, schema and locale-parity checks, and `evaluate()` unit tests
6. Add CODEOWNERS so clinical files automatically request clinical review
7. Create the `clinical-review` and `clinical-safety` labels and issue templates

See [ARCHITECTURE.md](./ARCHITECTURE.md) for how the app is built, and `legal/ATTRIBUTION.md` for
third-party credits.
