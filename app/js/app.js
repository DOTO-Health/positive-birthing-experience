import { $, esc, t, i18n } from './core.js';
import { player } from './player.js';
import { hydration, chime, unlockAudio } from './hydration.js';
import * as home from './home.js';
import * as sound from './sound.js';
import * as hydrationView from './hydration.js';
import * as move from './move.js';
import * as learn from './learn.js';

const ROUTES = {
  home: { mod: home, title: null },
  sound: { mod: sound, title: 'sound_title' },
  hydration: { mod: hydrationView, title: 'hydration_title' },
  move: { mod: move, title: 'move_title' },
  learn: { mod: learn, title: 'learn_title' },
};

const main = $('#main'), top = $('#top'), banner = $('#banner'), sheet = $('#sheet');
let route = 'home', unmount = null, token = 0;

const go = (name) => { location.hash = `#/${name}`; };

function renderTop() {
  const r = ROUTES[route];
  const cur = i18n.langs.find((l) => l.code === i18n.lang);
  top.innerHTML = `
    ${r.title ? `<button class="back" id="back" aria-label="${esc(t('back'))}">‹</button><span class="title">${esc(t(r.title))}</span>` : `<img src="assets/logo.png" alt="Doto | CareMother">`}
    <span class="sp"></span>
    <button class="langbtn" id="langbtn"><i></i>${esc(cur.native_name)} ▾</button>`;
  const back = $('#back', top);
  if (back) back.onclick = () => go('home');
  $('#langbtn', top).onclick = openLanguages;
}

function refreshBanner() {
  const show = hydration.running && hydration.isDue() && route !== 'hydration';
  banner.hidden = !show;
  if (show) {
    banner.innerHTML = `<span>💧 ${esc(t('hydration_due_banner'))}</span><button id="bn-go">${esc(t('hydration_title'))} ›</button>`;
    $('#bn-go', banner).onclick = () => go('hydration');
  }
}

async function render() {
  const my = ++token;
  if (unmount) { try { unmount(); } catch { /* ignore */ } unmount = null; }
  const name = (location.hash.match(/^#\/(\w+)/) || [])[1];
  route = ROUTES[name] ? name : 'home';
  renderTop();
  refreshBanner();
  main.innerHTML = '';
  main.scrollTop = 0;
  const un = await ROUTES[route].mod.mount(main, { go, refreshBanner });
  if (my !== token) { un?.(); return; } // route changed while loading
  unmount = un || null;
}

function openLanguages() {
  sheet.hidden = false; sheet.className = '';
  sheet.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><header><h2>${esc(t('choose_language'))}</h2><button class="back" id="lg-x" aria-label="${esc(t('close'))}">✕</button></header>
    <div class="langgrid">${i18n.langs.map((l) => `<button class="lg ${l.code === i18n.lang ? 'on' : ''}" data-l="${l.code}"><b>${esc(l.native_name)}</b><span>${esc(l.language)}</span></button>`).join('')}</div></div>`;
  const close = () => { sheet.hidden = true; sheet.innerHTML = ''; };
  $('#lg-x', sheet).onclick = close;
  sheet.onclick = (e) => { if (e.target === sheet) close(); };
  sheet.querySelectorAll('[data-l]').forEach((b) => { b.onclick = async () => { await i18n.set(b.dataset.l); close(); render(); }; });
}

// App-wide 1-second tick: sip reminders must fire whichever module is open.
let chimedFor = null;
setInterval(() => {
  if (!hydration.state || !hydration.running) return;
  if (hydration.isDue()) {
    hydration.markDue();
    if (chimedFor !== hydration.state.lastAt) { chimedFor = hydration.state.lastAt; chime(); }
    if (banner.hidden && route !== 'hydration') refreshBanner();
  }
}, 1000);

async function boot() {
  await Promise.all([i18n.init(), hydration.load()]);
  player.mount($('#player'));
  document.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('hashchange', render);
  await render();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
}
boot();
