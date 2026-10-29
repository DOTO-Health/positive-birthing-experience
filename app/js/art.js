// Original vector artwork for track thumbnails (no external image licences, works offline).
const SCENES = {
  sunrise: ['#FBC9A2', '#F59E6B', '<circle cx="100" cy="62" r="24" fill="#FFD500" opacity=".95"/><circle cx="100" cy="62" r="38" fill="#FFD500" opacity=".25"/><path d="M0 85Q50 60 100 82T200 78V110H0z" fill="#C4572B"/><path d="M0 95Q60 78 120 94T200 90V110H0z" fill="#8A3A1C"/>'],
  cloud: ['#A9D6E5', '#6FAFC8', '<ellipse cx="55" cy="40" rx="34" ry="11" fill="#fff" opacity=".85"/><ellipse cx="80" cy="34" rx="24" ry="10" fill="#fff" opacity=".85"/><ellipse cx="150" cy="62" rx="36" ry="11" fill="#fff" opacity=".75"/><ellipse cx="130" cy="56" rx="22" ry="9" fill="#fff" opacity=".75"/><circle cx="170" cy="22" r="9" fill="#FFE7A0"/>'],
  blossom: ['#F7B7C4', '#E98AA3', [0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="100" cy="38" rx="9" ry="19" fill="#fff" opacity=".9" transform="rotate(${a} 100 55)"/>`).join('') + '<circle cx="100" cy="55" r="9" fill="#FFD500"/><circle cx="34" cy="26" r="5" fill="#fff" opacity=".6"/><circle cx="168" cy="84" r="6" fill="#fff" opacity=".6"/>'],
  hills: ['#F6E3C0', '#E7C58E', '<circle cx="150" cy="28" r="14" fill="#FFE7A0"/><path d="M0 70Q40 45 90 66T200 56V110H0z" fill="#8DB39B"/><path d="M0 88Q60 66 120 86T200 80V110H0z" fill="#5E8C6B"/><rect x="48" y="52" width="5" height="26" fill="#6B4630"/><circle cx="50" cy="46" r="15" fill="#4F7A63"/><circle cx="40" cy="52" r="10" fill="#5E8C6B"/>'],
  lotus: ['#FFE9B8', '#FFD27A', '<circle cx="100" cy="62" r="40" fill="#FFD500" opacity=".28"/>' + [[-60, '#F4A6B8'], [-30, '#F28AA3'], [0, '#F7B9C6'], [30, '#F28AA3'], [60, '#F4A6B8']].map(([a, c]) => `<ellipse cx="100" cy="58" rx="9" ry="22" fill="${c}" transform="rotate(${a} 100 80)"/>`).join('') + '<path d="M0 90Q50 82 100 90T200 90V110H0z" fill="#3B7F96"/><path d="M0 100Q50 94 100 100T200 100V110H0z" fill="#2B6074"/>'],
  rings: ['#9FD3C7', '#5FA3B8', [[14, .95], [26, .75], [38, .55], [50, .35], [62, .2]].map(([r, o]) => `<circle cx="100" cy="55" r="${r}" fill="none" stroke="#fff" stroke-width="2.5" opacity="${o}"/>`).join('') + '<circle cx="100" cy="55" r="7" fill="#fff"/>'],
  waves: ['#BFE0E6', '#4F93A8', [30, 48, 66, 84].map((y, i) => `<path d="M0 ${y}Q25 ${y - 12} 50 ${y}T100 ${y}T150 ${y}T200 ${y}V110H0z" fill="#fff" opacity="${0.18 + i * 0.1}"/>`).join('')],
  stars: ['#2E3B73', '#6A5FA8', '<circle cx="150" cy="30" r="16" fill="#FFF1B8"/><circle cx="156" cy="26" r="14" fill="#2E3B73" opacity=".9"/>' + [[30, 24], [60, 50], [90, 18], [120, 60], [40, 80], [170, 78], [100, 88]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#fff"/>`).join('')],
  notes: ['#F9D3A0', '#E9915C', '<g fill="#fff" opacity=".92"><circle cx="70" cy="78" r="9"/><rect x="77" y="30" width="4" height="48"/><circle cx="120" cy="70" r="9"/><rect x="127" y="24" width="4" height="46"/><path d="M77 30L131 24V36L77 42z"/></g>'],
};

let n = 0;
export function sceneSVG(kind) {
  const [a, b, body] = SCENES[kind] || SCENES.sunrise;
  const id = `g${n++}`;
  return `<svg viewBox="0 0 200 110" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="200" height="110" fill="url(#${id})"/>${body}</svg>`;
}
