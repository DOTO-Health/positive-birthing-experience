// Clinical review gate. Fails a pull request that touches the clinical surface unless a maintainer has
// recorded the outcome with a label (see QA_PROCESS.md sections 3 and 4.3).
//   clinically-approved       a named clinical reviewer approved this change
//   clinical-not-applicable   a maintainer confirmed the change is not clinical (for example interface labels)
// Usage: node tools/clinical-gate.mjs <base-sha> <head-sha> "<comma-separated labels>"
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CLINICAL_SURFACE = [
  'app/data/hydration-rules.json',
  'app/js/hydration.js',
  'app/data/learn.json',
  'app/data/facts.json',
  'app/data/videos.json',
  'app/locales/',
  'tests/hydration-cases.json',
  'QA_PROCESS.md',
];
export const isClinical = (file) => CLINICAL_SURFACE.some((p) => (p.endsWith('/') ? file.startsWith(p) : file === p));

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [base, head, labelArg = ''] = process.argv.slice(2);
  const labels = labelArg.split(',').map((s) => s.trim()).filter(Boolean);
  const changed = execSync(`git diff --name-only ${base}...${head}`, { encoding: 'utf8' }).split('\n').filter(Boolean);
  const hits = changed.filter(isClinical);
  if (!hits.length) { console.log('No clinical files changed. Technical review only.'); process.exit(0); }
  console.log('Clinical surface files changed:\n' + hits.map((f) => `  - ${f}`).join('\n'));
  if (labels.includes('clinically-approved') || labels.includes('clinical-not-applicable')) {
    console.log(`Clinical gate satisfied by label: ${labels.filter((l) => l.startsWith('clinical')).join(', ')}`);
    process.exit(0);
  }
  console.log('::error::This pull request changes clinical content. It needs a clinical review (label "clinical-review") and a maintainer must add "clinically-approved" after a clinician signs off, or "clinical-not-applicable" if the change is not clinical. See QA_PROCESS.md.');
  process.exit(1);
}
