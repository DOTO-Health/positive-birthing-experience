// Hydration: a labour clock that reminds the nurse to offer sips, plus an optional
// temperature/pulse check. The check is a prompt for assessment, not a diagnosis.
// Thresholds live in data/hydration-rules.json and are SAMPLE values until clinically validated.
import { $, esc, t, store, loadJSON, counters, fmtClock } from './core.js';

const KEY = 'pbc.hydration.v1';
let rules = null;

const blank = (interval) => ({ startedAt: null, interval, lastAt: null, dueCounted: false, log: [] });
let state = null;

export const hydration = {
  async load() {
    rules = await loadJSON('data/hydration-rules.json');
    state = store.get(KEY, null) || blank(rules.default_interval_min);
    return rules;
  },
  get state() { return state; },
  get rules() { return rules; },
  save() { store.set(KEY, state); },
  get running() { return !!state?.startedAt; },
  msUntilDue(now = Date.now()) { return state.lastAt + state.interval * 60000 - now; },
  isDue(now = Date.now()) { return this.running && this.msUntilDue(now) <= 0; },
  start(intervalMin) {
    const now = Date.now();
    state = { startedAt: now, interval: intervalMin, lastAt: now, dueCounted: false, log: [{ t: now, type: 'start' }] };
    this.save();
  },
  setInterval(min) { state.interval = min; this.save(); },
  // called from the app-wide tick the first time a reminder becomes due
  markDue() {
    if (state.dueCounted) return;
    state.dueCounted = true; counters.bump('remindersDue'); this.save();
  },
  answer(type) { // 'offered' | 'declined'
    const now = Date.now();
    state.log.push({ t: now, type });
    state.lastAt = now; state.dueCounted = false;
    counters.bump('remindersAnswered');
    if (type === 'offered') counters.bump('practices');
    this.save();
  },
  stop() { state = blank(state.interval); this.save(); },
  evaluate(temp, pulse) {
    const { attention, alert } = rules;
    if (temp >= alert.temp_min || pulse >= alert.pulse_min) return 'alert';
    if (temp >= attention.temp_min || pulse >= attention.pulse_min) return 'attention';
    return 'normal';
  },
  logCheck(temp, pulse, status) {
    state.log.push({ t: Date.now(), type: 'check', temp, pulse, status });
    this.save();
  },
};

// ---------- soft chime (WebAudio, no audio file needed) ----------
let ctx = null;
export function unlockAudio() {
  if (ctx) return;
  try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* no audio */ }
}
export function chime() {
  if (!ctx) return;
  const now = ctx.currentTime;
  [[660, 0], [880, 0.22]].forEach(([f, d]) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0, now + d);
    g.gain.linearRampToValueAtTime(0.18, now + d + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, now + d + 0.9);
    o.connect(g).connect(ctx.destination);
    o.start(now + d); o.stop(now + d + 1);
  });
}

const timeOf = (ms) => new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const C = 2 * Math.PI * 52;

export async function mount(el, { refreshBanner }) {
  if (!rules) await hydration.load();
  let temp = 98.6, pulse = 80, result = null;

  const intervals = () => {
    const list = [...rules.intervals_min];
    if (new URLSearchParams(location.search).has('demo')) list.unshift(1); // 1-minute option for demos
    return list;
  };

  const render = () => {
    const s = hydration.state;
    const left = hydration.running ? Math.max(0, hydration.msUntilDue()) : s.interval * 60000;
    const due = hydration.isDue();
    const frac = hydration.running ? Math.min(1, Math.max(0, left / (s.interval * 60000))) : 1;
    const history = [...s.log].reverse().filter((e) => e.type !== 'start').slice(0, 8);

    el.innerHTML = `
    <div class="hy">
      <section class="panel">
        <h4>${hydration.running ? `${esc(t('hydration_elapsed'))} · <span id="elapsed">${fmtClock(Date.now() - s.startedAt)}</span>` : esc(t('hydration_every'))}</h4>
        ${hydration.running ? `
          <div class="ringwrap">
            <div class="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="#F7E6D3" stroke-width="12"/><circle id="arc" cx="60" cy="60" r="52" fill="none" stroke="${due ? '#F2A33A' : '#3B7F96'}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - frac)}"/></svg>
              <div class="c"><b id="left">${due ? '0:00' : fmtClock(left)}</b><span>${esc(due ? t('hydration_since') : t('hydration_next_in'))}</span></div></div>
            ${due ? `<div class="alertbox"><h5>💧 ${esc(t('hydration_due_banner'))}</h5><p>${esc(t('hydration_offer_body'))}</p>
              <div class="btns"><button class="btn blue" id="offered">${esc(t('hydration_offered'))} ✓</button><button class="btn ghost" id="declined">${esc(t('hydration_declined'))}</button></div></div>` : ''}
          </div>
          <div class="seg" role="group">${intervals().map((m) => `<button class="${m === s.interval ? 'on' : ''}" data-int="${m}">${m} ${esc(t('minutes'))}</button>`).join('')}</div>
          <button class="btn ghost" id="stop">${esc(t('hydration_stop'))}</button>` : `
          <div class="seg" role="group">${intervals().map((m) => `<button class="${m === s.interval ? 'on' : ''}" data-int="${m}">${m} ${esc(t('minutes'))}</button>`).join('')}</div>
          <button class="btn big" id="start">▶ ${esc(t('hydration_start'))}</button>`}
        <div class="note">${esc(t('hydration_offer_body'))}</div>
      </section>
      <section class="panel">
        <h4>${esc(t('hydration_optional'))}</h4>
        <div class="field"><label>${esc(t('hydration_temperature'))}</label><div class="st"><button data-d="temp:-0.1" aria-label="−">−</button><input id="temp" inputmode="decimal" value="${temp.toFixed(1)}" aria-label="${esc(t('hydration_temperature'))}"><button data-d="temp:0.1" aria-label="+">+</button><span class="u">°F</span></div></div>
        <div class="field"><label>${esc(t('hydration_pulse'))}</label><div class="st"><button data-d="pulse:-1" aria-label="−">−</button><input id="pulse" inputmode="numeric" value="${pulse}" aria-label="${esc(t('hydration_pulse'))}"><button data-d="pulse:1" aria-label="+">+</button><span class="u">bpm</span></div></div>
        <button class="btn" id="check">${esc(t('hydration_check'))}</button>
        <div class="status"><span class="s-n ${result === 'normal' ? 'on' : ''}">${esc(t('hydration_normal'))}</span><span class="s-a ${result === 'attention' ? 'on' : ''}">${esc(t('hydration_attention'))}</span><span class="s-r ${result === 'alert' ? 'on' : ''}">${esc(t('hydration_alert'))}</span></div>
        <div class="note">${esc(t('hydration_disclaimer'))}</div>
        ${rules.clinically_validated ? '' : `<div class="warn">⚠ ${esc(t('hydration_sample'))}</div>`}
        <h4>${esc(t('hydration_history'))}</h4>
        <div class="hist" id="hist">${history.length ? history.map((e) => e.type === 'check'
          ? `<div><span>${timeOf(e.t)}</span><span>${e.temp.toFixed(1)}°F · ${e.pulse} bpm</span><span class="${e.status === 'normal' ? 'c-n' : e.status === 'attention' ? 'c-a' : 'c-r'}">${esc(t('hydration_' + e.status))}</span></div>`
          : `<div><span>${timeOf(e.t)}</span><span>💧</span><span>${esc(t('hydration_' + e.type))}</span></div>`).join('') : `<div><span>${esc(t('hydration_no_history'))}</span></div>`}</div>
      </section>
    </div>`;
    bind();
  };

  const bind = () => {
    const on = (id, fn) => { const n = $(id, el); if (n) n.onclick = fn; };
    on('#start', () => { unlockAudio(); hydration.start(hydration.state.interval); refreshBanner(); render(); });
    on('#stop', () => { if (confirm(t('hydration_confirm_stop'))) { hydration.stop(); refreshBanner(); render(); } });
    on('#offered', () => { hydration.answer('offered'); refreshBanner(); render(); });
    on('#declined', () => { hydration.answer('declined'); refreshBanner(); render(); });
    el.querySelectorAll('[data-int]').forEach((b) => { b.onclick = () => { hydration.setInterval(+b.dataset.int); render(); }; });
    el.querySelectorAll('[data-d]').forEach((b) => {
      b.onclick = () => {
        const [k, d] = b.dataset.d.split(':');
        if (k === 'temp') temp = Math.round((temp + +d) * 10) / 10; else pulse += +d;
        $('#temp', el).value = temp.toFixed(1); $('#pulse', el).value = pulse;
      };
    });
    on('#check', () => {
      const tv = parseFloat($('#temp', el).value), pv = parseInt($('#pulse', el).value, 10);
      const { temp: tl, pulse: pl } = rules.limits;
      if (!(tv >= tl[0] && tv <= tl[1] && pv >= pl[0] && pv <= pl[1])) return; // ignore impossible values
      temp = tv; pulse = pv;
      result = hydration.evaluate(temp, pulse);
      hydration.logCheck(temp, pulse, result);
      render();
    });
  };

  render();
  const tick = setInterval(() => {
    if (!hydration.running) return;
    const due = hydration.isDue();
    if (due !== !!$('#offered', el)) { render(); return; } // switched state, redraw
    const e = $('#elapsed', el); if (e) e.textContent = fmtClock(Date.now() - hydration.state.startedAt);
    if (!due) {
      const left = hydration.msUntilDue();
      const l = $('#left', el); if (l) l.textContent = fmtClock(left);
      const a = $('#arc', el); if (a) a.setAttribute('stroke-dashoffset', C * (1 - Math.min(1, left / (hydration.state.interval * 60000))));
    }
  }, 1000);
  return () => clearInterval(tick);
}
