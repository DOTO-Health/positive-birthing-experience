import { esc, t, loadJSON, counters } from './core.js';

export async function mount(el) {
  const { cards } = await loadJSON('data/learn.json');
  let i = 0;
  const seen = new Set();

  el.innerHTML = `
    <div class="carousel" id="car">
      <button class="arrow" id="prev" aria-label="Previous">‹</button>
      <div class="card" id="card" aria-live="polite"><div class="big" id="ico"></div><div><div class="num" id="num"></div><h3 id="ttl"></h3><p id="txt"></p><span class="src" id="src"></span></div></div>
      <button class="arrow" id="next" aria-label="Next">›</button>
    </div>
    <div class="dots" id="dots">${cards.map((_, n) => `<button data-n="${n}" aria-label="${n + 1}"></button>`).join('')}</div>`;

  const q = (s) => el.querySelector(s);
  const show = () => {
    const c = cards[i], n = i + 1;
    q('#ico').textContent = c.icon;
    q('#num').textContent = t('practice_of', { n });
    q('#ttl').textContent = t(`card${n}_title`);
    q('#txt').textContent = t(`card${n}_text`);
    q('#src').textContent = `📖 ${c.source}`;
    q('#card').style.background = `linear-gradient(135deg,${c.tint[0]},${c.tint[1]})`;
    el.querySelectorAll('#dots button').forEach((b, k) => b.classList.toggle('on', k === i));
    if (!seen.has(i)) { seen.add(i); counters.bump('practices'); }
  };
  const go = (d) => { i = (i + d + cards.length) % cards.length; show(); };
  q('#prev').onclick = () => go(-1);
  q('#next').onclick = () => go(1);
  el.querySelectorAll('#dots button').forEach((b) => { b.onclick = () => { i = +b.dataset.n; show(); }; });

  // swipe + keyboard
  let x0 = null;
  const card = q('#card');
  card.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  card.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * (document.documentElement.dir === 'rtl' ? -1 : 1));
  });
  const key = (e) => { if (e.key === 'ArrowRight') go(document.documentElement.dir === 'rtl' ? -1 : 1); if (e.key === 'ArrowLeft') go(document.documentElement.dir === 'rtl' ? 1 : -1); };
  document.addEventListener('keydown', key);
  show();
  return () => document.removeEventListener('keydown', key);
}
