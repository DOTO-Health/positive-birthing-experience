// Unit tests for the hydration rules and reminder timing. No dependencies: run with `node --test tests/`.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(here, '..', 'app');
// The app loads JSON with fetch(); serve it from disk in Node.
globalThis.fetch = async (p) => {
  const file = path.join(appDir, p);
  return { ok: fs.existsSync(file), status: fs.existsSync(file) ? 200 : 404, json: async () => JSON.parse(fs.readFileSync(file, 'utf8')) };
};

const { hydration } = await import('../app/js/hydration.js');
const { dayPeriod } = await import('../app/js/core.js');
const rules = await hydration.load();
const table = JSON.parse(fs.readFileSync(path.join(here, 'hydration-cases.json'), 'utf8'));

test('rules file is well formed', () => {
  for (const key of ['attention', 'alert']) {
    assert.equal(typeof rules[key].temp_min, 'number', `${key}.temp_min`);
    assert.equal(typeof rules[key].pulse_min, 'number', `${key}.pulse_min`);
  }
  assert.ok(rules.alert.temp_min > rules.attention.temp_min, 'alert temperature must be above attention');
  assert.ok(rules.alert.pulse_min > rules.attention.pulse_min, 'alert pulse must be above attention');
  assert.ok(rules.intervals_min.includes(rules.default_interval_min), 'default interval must be an offered interval');
  assert.equal(typeof rules.clinically_validated, 'boolean');
});

for (const c of table.cases) {
  test(`evaluate(${c.temp} F, ${c.pulse} bpm) is ${c.expect}`, () => {
    assert.equal(hydration.evaluate(c.temp, c.pulse), c.expect);
  });
}

test('every clinical test case sits on the correct side of the thresholds in the rules file', () => {
  const lowest = table.cases.filter((c) => c.expect === 'normal');
  for (const c of lowest) {
    assert.ok(c.temp < rules.attention.temp_min && c.pulse < rules.attention.pulse_min, 'normal case must be below both attention thresholds');
  }
});

test('sip reminder becomes due exactly at the interval', () => {
  const t0 = 1_700_000_000_000;
  const realNow = Date.now;
  Date.now = () => t0;
  try {
    hydration.start(45);
    assert.equal(hydration.isDue(t0 + 44 * 60_000 + 59_000), false);
    assert.equal(hydration.isDue(t0 + 45 * 60_000), true);
    assert.equal(hydration.msUntilDue(t0), 45 * 60_000);
  } finally {
    Date.now = realNow;
    hydration.stop();
  }
});

test('greeting period boundaries', () => {
  const at = (h) => dayPeriod(new Date(2026, 0, 1, h, 0, 0));
  assert.equal(at(4), 'evening');
  assert.equal(at(5), 'morning');
  assert.equal(at(11), 'morning');
  assert.equal(at(12), 'afternoon');
  assert.equal(at(16), 'afternoon');
  assert.equal(at(17), 'evening');
});
