import { $, esc, t, i18n, loadJSON, counters, dayPeriod } from './core.js';

const ICONS = {
  sound: '<svg class="ic" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 46V16l26-6v30"/><circle cx="17" cy="46" r="7" fill="#fff"/><circle cx="43" cy="40" r="7" fill="#fff"/></svg>',
  hydration: '<svg class="ic" viewBox="0 0 64 64" fill="#fff" aria-hidden="true"><path d="M32 6C22 20 14 29 14 40a18 18 0 0 0 36 0C50 29 42 20 32 6z"/></svg>',
  move: '<svg class="ic" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="12" r="6" fill="#fff"/><path d="M32 20v18M32 28l-14 8M32 28l14 8M32 38l-10 16M32 38l10 16"/></svg>',
  learn: '<svg class="ic" viewBox="0 0 64 64" fill="none" stroke="#3B2A20" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 14h20a4 4 0 0 1 4 4v34a8 8 0 0 0-8-8H8z"/><path d="M56 14H36a4 4 0 0 0-4 4v34a8 8 0 0 1 8-8h16z"/></svg>',
};
const TILES = [['sound', 't-sound'], ['hydration', 't-hyd'], ['move', 't-move'], ['learn', 't-learn']];

export async function mount(el, { go }) {
  const { facts } = await loadJSON('data/facts.json');
  const words = i18n.nurseWords();
  let wi = Math.floor(Math.random() * words.length); // new language on every refresh
  let fi = 0;

  const greetingHTML = () => {
    const tpl = t('greeting_template');
    const greet = esc(t(`greeting_${dayPeriod()}`));
    return tpl.replace('{greeting}', greet).replace('{nurse}', `<span class="nw" id="nw">${esc(words[wi])}</span>`);
  };

  const answered = counters.get('remindersAnswered');
  const due = counters.get('remindersDue');
  const pct = due ? `${Math.round((answered / due) * 100)}%` : '—';

  el.innerHTML = `
    <div class="hello" id="hello">${greetingHTML()}<small>${esc(t('home_prompt'))}</small></div>
    <div class="tiles">
      ${TILES.map(([k, cls]) => `
        <button class="tile ${cls}" data-go="${k}"><span class="go" aria-hidden="true">›</span>${ICONS[k]}
          <span><h3>${esc(t(`${k === 'hydration' ? 'hydration' : k}_title`))}</h3><p>${esc(t(`${k === 'hydration' ? 'hydration' : k}_sub`))}</p></span></button>`).join('')}
    </div>
    <div class="impact">
      <div class="imp fact"><b id="fact-t">${esc(facts[0].text)}</b><span id="fact-s">${esc(facts[0].source)}</span></div>
      <div class="imp"><b>${counters.get('practices')}</b><span>${esc(t('impact_practices'))}</span></div>
      <div class="imp"><b>${pct}</b><span>${esc(t('impact_reminders'))}</span></div>
      <div class="imp"><b>${i18n.langs.length}</b><span>${esc(t('impact_languages'))}</span></div>
    </div>
    <div class="foot"><span>${esc(t('footer_offline'))}</span><span>${esc(t('footer_note'))}</span></div>`;

  el.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => go(b.dataset.go); });

  const rotateNurse = setInterval(() => {
    const nw = $('#nw', el);
    if (!nw) return;
    nw.classList.add('out');
    setTimeout(() => { wi = (wi + 1) % words.length; nw.textContent = words[wi]; nw.classList.remove('out'); }, 400);
  }, 3500);

  const rotateFact = setInterval(() => {
    fi = (fi + 1) % facts.length;
    const ft = $('#fact-t', el), fs = $('#fact-s', el);
    ft.style.opacity = 0;
    setTimeout(() => { ft.textContent = facts[fi].text; fs.textContent = facts[fi].source; ft.style.opacity = 1; }, 400);
  }, 4500);

  // refresh greeting when the clock crosses a period boundary
  let lastPeriod = dayPeriod();
  const watchClock = setInterval(() => {
    if (dayPeriod() !== lastPeriod) { lastPeriod = dayPeriod(); const nw = $('#nw', el); if (nw) { const small = $('#hello small', el); $('#hello', el).innerHTML = greetingHTML(); $('#hello', el).appendChild(small); } }
  }, 1000);

  return () => { clearInterval(rotateNurse); clearInterval(rotateFact); clearInterval(watchClock); };
}
