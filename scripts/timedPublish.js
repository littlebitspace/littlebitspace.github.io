const publishAt = new Date("2026-11-13T20:00:00+02:00");
const content = document.getElementById("Tarot+");

function checkPublication() {
  const remaining = publishAt.getTime() - Date.now();

  if (remaining <= 0) {
    content.hidden = false;
  } else {
    setTimeout(checkPublication, remaining);
  }
}

checkPublication();