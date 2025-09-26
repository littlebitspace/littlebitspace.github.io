/* SCALING */

let currentScale = 1;
const sliderLinks = document.querySelectorAll('.font-size-toggle');

function updateSliderUI() {
  sliderLinks.forEach(link => link.textContent = parseFloat(link.dataset.scale) <= currentScale ? '##' : '..');
  document.documentElement.style.setProperty('--font-scale', currentScale);
  document.getElementById('font-size-value').textContent = `${currentScale}x`.padEnd(5, ' ');
}

sliderLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const scale = parseFloat(link.dataset.scale);
    currentScale = scale;
    updateSliderUI();
  });
});

/* FONT SELECT */

const fontDropdown = document.getElementById('font-select-dropdown');
const fontDropdownContainer = document.getElementById('font-select-container');
const fonts = ['monospace', 'Terminal Gothic', 'Ink Snare', 'Tenebris', 'Skeletext'];
let currentFont = fonts[0];
const FONT_WIDTH = 16;

// List of fonts

// Utility: pad or truncate to fixed width
function formatFontName(name, width = FONT_WIDTH) {
  return name.length > width
    ? name.slice(0, width - 3) + '...'
    : name.padEnd(width, ' ');
}

// add font to elements
function applyFont(fontName) { document.documentElement.style.setProperty('--font', `"${fontName}"`); }

// Create options dynamically
function createFontOptions() {
  fontDropdownContainer.innerHTML = ''; // clear any existing content
  fonts.forEach(font => {
    const span = document.createElement('span');
    span.dataset.font = font;

    const a = document.createElement('a');
    a.textContent = `                                      [${formatFontName(font)}   ]`;
    span.appendChild(a);

    // Add click handler
    a.addEventListener('click', (e) => {
      e.preventDefault(); // prevent anchor jump
      currentFont = span.dataset.font;
      applyFont(currentFont);
      localStorage.setItem('selectedFont', currentFont);
      fontDropdownContainer.style.display = 'none';
      updateDropdown(false);
    });

    fontDropdownContainer.appendChild(span);
  });
}

// Update toggle and hide current font
function updateDropdown(open) {
  fontDropdown.textContent = `[${formatFontName(currentFont)} ${open ? '^' : 'v'} ]`;

  fontDropdownContainer.querySelectorAll('span').forEach(opt => {
    opt.style.display = opt.dataset.font === currentFont ? 'none' : 'block';
  });
}

// Toggle dropdown visibility
fontDropdown.addEventListener('click', () => {
  const isOpen = fontDropdownContainer.style.display !== 'block';
  fontDropdownContainer.style.display = isOpen ? 'block' : 'none';
  updateDropdown(isOpen);
});

// Initialize
createFontOptions();
fontDropdownContainer.style.display = 'none';
updateDropdown(false);

window.addEventListener('DOMContentLoaded', () => {
  const savedFont = localStorage.getItem('selectedFont');
  if (savedFont && fonts.includes(savedFont)) {
    currentFont = savedFont;
    applyFont(currentFont);
    updateDropdown(false);
  } else {
    applyFont(currentFont); // default
  }
});


/* RUN FUNCTIONS */

updateSliderUI();

