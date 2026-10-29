import { esc, t, loadJSON } from './core.js';
import { sceneSVG } from './art.js';
import { player } from './player.js';

export async function mount(el) {
  const { categories, tracks } = await loadJSON('data/tracks.json');
  let cat = categories[0];

  const render = () => {
    const list = tracks.filter((x) => x.category === cat);
    el.innerHTML = `
      <div class="tabs" role="tablist">${categories.map((c) => `<button class="tab ${c === cat ? 'on' : ''}" role="tab" data-cat="${c}">${esc(t('tab_' + c))}</button>`).join('')}</div>
      <div class="tracks">${list.map((tr, i) => {
        const cur = player.current?.id === tr.id;
        return `<button class="tcard ${cur ? 'cur' : ''}" data-i="${i}"><span class="im">${sceneSVG(tr.scene)}<span class="pl">${cur && player.playing ? '❚❚' : '▶'}</span></span>
          <span class="tx"><b>${esc(tr.title)}</b><span>${esc(tr.artist || '')}${tr.artist ? ' · ' : ''}<span class="pill">CC</span></span></span></button>`;
      }).join('')}</div>`;
    el.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { cat = b.dataset.cat; render(); }; });
    el.querySelectorAll('[data-i]').forEach((b) => {
      b.onclick = () => {
        const tr = list[+b.dataset.i];
        if (player.current?.id === tr.id) player.toggle(); else player.play(list, +b.dataset.i);
      };
    });
  };
  render();
  player.listeners.add(render);
  return () => player.listeners.delete(render);
}
