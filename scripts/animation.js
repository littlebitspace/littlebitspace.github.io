const DELAY_TYPEWRITER = 50;
const INTERVAL_BANNER = 100;
const DISPLAY_WIDTH = 80;

/* ANIMATION - TYPEWRITER */

function animTypewriter(el) {
  const originalText = el.textContent;
  const classList = Array.from(el.classList);

  const speedClass = classList.find(cls => cls.startsWith('speed-'));
  const delay = speedClass ? parseInt(speedClass.split('-')[1], 10) : DELAY_TYPEWRITER;
  const widthClass = classList.find(cls => cls.startsWith('width-'));
  const displayWidth = widthClass ? parseInt(widthClass.split('-')[1], 10) : null;

  let original = originalText;
  if (displayWidth !== null) {
    if (original.length < displayWidth) original = original.padEnd(displayWidth, ' ');
    else if (original.length > displayWidth) original = original.slice(0, displayWidth);
  }

  el.textContent = '';
  let i = 0;
  let id;

  function showNext() {
    if (i < original.length) {
      el.textContent = original.slice(0, i) + '|';
      i++;
      id = setTimeout(showNext, delay);
    } else el.textContent = original;
  }

  showNext();

  return () => {
    clearTimeout(id);
    el.textContent = originalText;
  };
}

/* ANIMATION - BANNER */

function animBanner(el) {
  const original = el.textContent;
  const lines = el.textContent.replace(/\n+$/, '').split('\n');
  const classList = Array.from(el.classList);

  const intervalClass = classList.find(cls => cls.startsWith('speed-'));
  const interval = intervalClass ? parseInt(intervalClass.split('-')[1], 10) : INTERVAL_BANNER;
  const widthClass = classList.find(cls => cls.startsWith('width-'));
  const displayWidth = widthClass ? parseInt(widthClass.split('-')[1], 10) : DISPLAY_WIDTH;

  const fullLines = lines.map(line => {
    if (line.length === 0) return ' '.repeat(displayWidth);
    let repeated = line;
    while (repeated.length < displayWidth) repeated += line;
    return repeated;
  });

  let offset = 0;

  function updateBanner() {
    const visible = fullLines.map(line => {
      const start = offset % line.length;
      const end = start + displayWidth;
      return line.slice(start, end) + line.slice(0, Math.max(0, end - line.length));
    });
    el.textContent = visible.join('\n');
    offset++;
  }

  const id = setInterval(updateBanner, interval);
  return () => {
    clearInterval(id);
    el.textContent = original;
  };
}

/* START & STOP ANIMATIONS*/

let banners = [];
let typewriters = [];

function stopAnimations() {
  banners.forEach(stop => stop());
  typewriters.forEach(stop => stop());
}

function startAnimations() {
  banners = Array.from(document.getElementsByClassName("banner")).map(e => animBanner(e));
  typewriters = Array.from(document.getElementsByClassName("typewriter")).map(e => animTypewriter(e));
}

const toggleLink = document.getElementById('toggle-animations');
let effectsOn = true;

document.getElementById('toggle-animations').addEventListener('click', e => {
  e.preventDefault();
  effectsOn = !effectsOn;
  localStorage.setItem('effectsOn', effectsOn ? 'true' : 'false');
  e.target.textContent = effectsOn ? '[X]' : '[ ]';
  effectsOn ? startAnimations() : stopAnimations();
});

/* RUN FUNCTIONS */

const savedPref = localStorage.getItem('effectsOn');
if (savedPref !== null) {
  effectsOn = savedPref === 'true';
  document.getElementById('toggle-animations').textContent = effectsOn ? '[X]' : '[ ]';
  if (effectsOn) startAnimations();
} else {
  // Default behavior: animations on
  startAnimations();
}

