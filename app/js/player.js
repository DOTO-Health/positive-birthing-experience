// Persistent audio player: keeps playing while the nurse moves between modules.
import { $, esc, counters, fmtClock, t } from './core.js';

const audio = new Audio();
audio.preload = 'metadata';

export const player = {
  queue: [],
  index: -1,
  root: null,
  listeners: new Set(),
  get current() { return this.queue[this.index] || null; },
  get playing() { return !audio.paused; },

  mount(root) {
    this.root = root;
    root.innerHTML = `
      <div class="pbar" id="pbar">
        <div class="meta"><div class="wave"><i></i><i></i><i></i><i></i><i></i></div><b id="p-title"></b><span id="p-sub"></span></div>
        <div class="ctl">
          <button class="cb" id="p-prev" aria-label="Previous">⏮</button>
          <button class="cb pp" id="p-pp" aria-label="Play or pause">▶</button>
          <button class="cb" id="p-next" aria-label="Next">⏭</button>
        </div>
        <div class="prog"><input type="range" id="p-seek" min="0" max="1000" value="0" aria-label="Seek"><div class="times"><span id="p-cur">0:00</span><span id="p-dur">0:00</span></div></div>
        <div class="vol"><span aria-hidden="true">🔉</span><input type="range" id="p-vol" min="0" max="100" value="80" aria-label="Volume"></div>
      </div>`;
    $('#p-pp', root).onclick = () => this.toggle();
    $('#p-prev', root).onclick = () => this.step(-1);
    $('#p-next', root).onclick = () => this.step(1);
    $('#p-vol', root).oninput = (e) => { audio.volume = e.target.value / 100; };
    let seeking = false;
    const seek = $('#p-seek', root);
    seek.oninput = () => { seeking = true; };
    seek.onchange = () => { if (audio.duration) audio.currentTime = (seek.value / 1000) * audio.duration; seeking = false; };
    audio.volume = 0.8;
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration || seeking) return;
      seek.value = Math.round((audio.currentTime / audio.duration) * 1000);
      $('#p-cur', root).textContent = fmtClock(audio.currentTime * 1000);
    });
    audio.addEventListener('loadedmetadata', () => { $('#p-dur', root).textContent = fmtClock(audio.duration * 1000); });
    audio.addEventListener('play', () => this.paint());
    audio.addEventListener('pause', () => this.paint());
    audio.addEventListener('ended', () => this.step(1, true));
  },

  play(queue, index) {
    this.queue = queue; this.index = index;
    const tr = this.current;
    audio.src = tr.file;
    audio.play().catch(() => this.paint());
    counters.bump('practices');
    this.paint(true);
  },
  toggle() { if (!this.current) return; audio.paused ? audio.play() : audio.pause(); },
  step(dir, auto = false) {
    if (!this.queue.length) return;
    const next = this.index + dir;
    if (auto && next >= this.queue.length) { this.paint(); return; }
    this.index = (next + this.queue.length) % this.queue.length;
    audio.src = this.current.file;
    audio.play().catch(() => {});
    this.paint(true);
  },

  paint(trackChanged = false) {
    if (!this.root) return;
    const tr = this.current;
    this.root.hidden = !tr;
    if (!tr) return;
    $('#p-title', this.root).textContent = tr.title;
    $('#p-sub', this.root).textContent = `${tr.artist ? tr.artist + ' · ' : ''}${t('sound_plays_on')}`;
    $('#p-pp', this.root).textContent = this.playing ? '❚❚' : '▶';
    $('#pbar', this.root).classList.toggle('playing', this.playing);
    if (trackChanged) { $('#p-seek', this.root).value = 0; $('#p-cur', this.root).textContent = '0:00'; $('#p-dur', this.root).textContent = '0:00'; }
    this.listeners.forEach((fn) => fn());
  },
};
