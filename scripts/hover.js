/* HOVER EFFECT */

function addHoverChange(elements, hoverTexts) {
  const original = Array.from(elements).map(el => el.textContent);
  elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        elements.forEach((e, i) => e.textContent = hoverTexts[i] || e.textContent);
      });
      el.addEventListener('mouseleave', () => {
        elements.forEach((e, i) => e.textContent = original[i]);
      });
  });
}

/* DEFINE HOVER ELEMENTS */

const door2e = Array.from(document.getElementsByClassName("door2"));
const door3e = Array.from(document.getElementsByClassName("door3"));
const doorOpent = [
  "_",
"/ | \\",
"|*| |",
"|,'_|",
];

const socialIgEl = Array.from(document.getElementsByClassName("social-ig"));
const socialIgTx = [
  "P*****Y8",
  " dP*?L 8",
  ' 8.",8 8',
  ".`***',8"
];

const socialTwEl = Array.from(document.getElementsByClassName("social-tw"));
const socialTwTx = [
  '"""88P"?',
  "b 8 *,88",
  "8b *s*88",
  "',8L* '?"
];

const socialMdEl = Array.from(document.getElementsByClassName("social-md"));
const socialMdTx = [
  "P*****Y8",
  ' d"s"b 8',
  " * ' *,8",
  'b "*8888'
];

const socialBsEl = Array.from(document.getElementsByClassName("social-bs"));
const socialBsTx = [
  '"*888*"8',
  ". `*' ,8",
  "P'   'Y8",
  "b ,s. d8"
];

const socialDcEl = Array.from(document.getElementsByClassName("social-dc"));
const socialDcTx = [
  "88P8P888",
  "P  *  Y8",
  " 'P Y' 8",
  "b.s8s,d8"
];

/* RUN FUNCTIONS */

addHoverChange(door2e, doorOpent);
addHoverChange(door3e, doorOpent);
addHoverChange(socialIgEl, socialIgTx);
addHoverChange(socialTwEl, socialTwTx);
addHoverChange(socialMdEl, socialMdTx);
addHoverChange(socialBsEl, socialBsTx);
addHoverChange(socialDcEl, socialDcTx);

