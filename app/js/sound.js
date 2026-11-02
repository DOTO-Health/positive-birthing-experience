import { esc, t, loadJSON } from './core.js';
import { sceneSVG } from './art.js';
import { player } from './player.js';

// Placeholder artwork per category while no licensed tracks are bundled yet.
const SOON = { calm: ['cloud', 'hills', 'waves'], instrumental: ['notes', 'rings', 'stars'], spiritual: ['sunrise', 'lotus', 'blossom'] };

export async function mount(el) {
  const { categories, tracks } = await loadJSON('data/tracks.json');
  let cat = categories[0];

  const tabs = () => `<div class="tabs" role="tablist">${categories.map((c) => `<button class="tab ${c === cat ? 'on' : ''}" role="tab" data-cat="${c}">${esc(t('tab_' + c))}</button>`).join('')}</div>`;

  const render = () => {
    const list = tracks.filter((x) => x.category === cat);
    if (!list.length) {
      el.innerHTML = `${tabs()}
        <div class="soon-note"><b>${esc(t('music_soon_title'))}</b><span>${esc(t('music_soon_body'))}</span></div>
        <div class="tracks">${(SOON[cat] || SOON.calm).map((s) => `
          <div class="tcard soon" aria-disabled="true"><span class="im">${sceneSVG(s)}</span>
            <span class="tx"><b>${esc(t('tab_' + cat))}</b><span><span class="pill todo">${esc(t('coming_soon'))}</span></span></span></div>`).join('')}</div>`;
    } else {
      el.innerHTML = `${tabs()}
        <div class="tracks">${list.map((tr, i) => {
          const cur = player.current?.id === tr.id;
          return `<button class="tcard ${cur ? 'cur' : ''}" data-i="${i}"><span class="im">${sceneSVG(tr.scene)}<span class="pl">${cur && player.playing ? '❚❚' : '▶'}</span></span>
            <span class="tx"><b>${esc(tr.title)}</b><span>${esc(tr.artist || '')}</span></span></button>`;
        }).join('')}</div>`;
      el.querySelectorAll('[data-i]').forEach((b) => {
        b.onclick = () => {
          const tr = list[+b.dataset.i];
          if (player.current?.id === tr.id) player.toggle(); else player.play(list, +b.dataset.i);
        };
      });
    }
    el.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { cat = b.dataset.cat; render(); }; });
  };
  render();
  player.listeners.add(render);
  return () => player.listeners.delete(render);
}
