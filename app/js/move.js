import { esc, t, loadJSON } from './core.js';
import { sceneSVG } from './art.js';

const SCENES = ['rings', 'hills', 'cloud', 'sunrise', 'lotus', 'blossom'];

export async function mount(el) {
  const { categories, videos } = await loadJSON('data/videos.json');
  let cat = categories[0];
  const dlg = document.getElementById('sheet');

  const close = () => { dlg.hidden = true; dlg.className = ''; dlg.innerHTML = ''; };
  const open = (v) => {
    dlg.hidden = false; dlg.className = 'center';
    dlg.innerHTML = v.src
      ? `<div class="dialog" style="max-width:900px;width:100%"><video src="${esc(v.src)}" controls autoplay playsinline style="width:100%;border-radius:16px"></video><p class="note" style="margin:8px 0">${esc(v.author || '')} ${esc(v.license || '')}</p><button class="btn ghost" id="x">${esc(t('close'))}</button></div>`
      : `<div class="dialog"><div style="font-size:48px">🎬</div><h3 style="margin:8px 0">${esc(t('move_soon'))}</h3><p>${esc(t('move_soon_body'))}</p><p class="note" style="margin:8px 0 16px">${esc(v.title)} · ${esc(v.status)}</p><button class="btn" id="x">${esc(t('close'))}</button></div>`;
    dlg.querySelector('#x').onclick = close;
    dlg.onclick = (e) => { if (e.target === dlg) close(); };
  };

  const render = () => {
    const list = videos.filter((v) => v.category === cat);
    el.classList.add('sage');
    el.innerHTML = `
      <div class="tabs" role="tablist">${categories.map((c) => `<button class="tab ${c === cat ? 'on' : ''}" role="tab" data-cat="${c}">${esc(t('tab_' + c))}</button>`).join('')}</div>
      <div class="vgrid">${list.map((v, i) => `
        <button class="vid" data-i="${i}"><span class="thumb">${sceneSVG(SCENES[(videos.indexOf(v)) % SCENES.length]).replace('<svg ', '<svg style="position:absolute;inset:0;width:100%;height:100%" ')}<span class="play">▶</span><span class="dur">${v.minutes}:00</span></span>
          <span class="info"><b>${esc(v.title)}</b><span>${esc(v.stage)} · ${v.src ? '' : `<span class="pill todo">${esc(v.status)}</span>`}</span></span></button>`).join('')}</div>`;
    el.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { cat = b.dataset.cat; render(); }; });
    el.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => open(list[+b.dataset.i]); });
  };
  render();
  return () => { el.classList.remove('sage'); close(); };
}
