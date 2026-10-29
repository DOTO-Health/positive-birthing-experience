// Small shared helpers: escaping, safe storage, shift counters, i18n.

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);

export async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

// ---------- storage (never throws; works with storage blocked) ----------
const mem = new Map();
export const store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? (mem.has(key) ? mem.get(key) : fallback) : JSON.parse(v);
    } catch { return mem.has(key) ? mem.get(key) : fallback; }
  },
  set(key, value) {
    mem.set(key, value);
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  },
  remove(key) {
    mem.delete(key);
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};

// ---------- anonymous shift counters (12-hour shifts, no patient data) ----------
function shiftKey() {
  const d = new Date();
  return `pbc.shift.${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}-${d.getHours() < 12 ? 'am' : 'pm'}`;
}
export const counters = {
  all() { return store.get(shiftKey(), {}); },
  bump(name) { const c = this.all(); c[name] = (c[name] || 0) + 1; store.set(shiftKey(), c); },
  get(name) { return this.all()[name] || 0; },
};

// ---------- i18n ----------
export const i18n = {
  langs: [],
  data: {},
  lang: 'en',
  async init() {
    const idx = await loadJSON('locales/index.json');
    this.langs = idx.languages;
    await Promise.all(this.langs.map(async (l) => { this.data[l.code] = (await loadJSON(`locales/${l.code}.json`)).strings; }));
    const saved = store.get('pbc.lang', 'en');
    await this.set(this.langs.some((l) => l.code === saved) ? saved : 'en', false);
  },
  async set(code, persist = true) {
    this.lang = code;
    if (persist) store.set('pbc.lang', code);
    const meta = this.langs.find((l) => l.code === code);
    document.documentElement.lang = code;
    document.documentElement.dir = meta?.dir || 'ltr';
  },
  t(key, vars) {
    let s = this.data[this.lang]?.[key] ?? this.data.en?.[key] ?? key;
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  },
  // Western digits are kept everywhere; localised numerals are a possible later option.
  nurseWords() { return this.langs.map((l) => this.data[l.code].nurse_word); },
};
export const t = (k, v) => i18n.t(k, v);

// ---------- time of day ----------
export function dayPeriod(date = new Date()) {
  const h = date.getHours();
  return h >= 5 && h < 12 ? 'morning' : h < 17 && h >= 12 ? 'afternoon' : 'evening';
}

export function fmtClock(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const p = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${p(m)}:${p(sec)}` : `${p(m)}:${p(sec)}`;
}
