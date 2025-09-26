/* WEIGHT INDICATOR */

window.addEventListener('load', () => {
  setTimeout(() => {
    let totalBytes = 0;
    const resources = performance.getEntriesByType('resource');
    resources.forEach(res => {
      //totalBytes += res.transferSize || 0; // this calculates transfer size, which is 0 if cached
      totalBytes += res.decodedBodySize || res.encodedBodySize || 0; // this calculates actual resource size
    const kb = Math.round(totalBytes / 1024);

    const ENERGY_PER_GB = 0.81; // kWh/GB
    const GRID_CARBON_DENSITY = 442 // gCO2/kWh
    const BYTES_PER_GB = 1024 ** 3;
    const gramsCO2 = totalBytes * (ENERGY_PER_GB * GRID_CARBON_DENSITY / BYTES_PER_GB);

    const navEntry = performance.getEntriesByType("navigation");
    const loadTime = (navEntry[0].loadEventEnd - navEntry[0].startTime);

    const el = document.getElementById('page-weight');
    if (el) {
      const textContent = `Load: ${kb}kB | ${loadTime}ms | <span class="sust">~${(gramsCO2 * 1000).toFixed(1)}mg CO2</span>`;
      el.innerHTML = ' '.repeat(40 - textContent.length + 26) + textContent;
    }
  }, 1);
});

/* RUN FUNCTIONS */

document.getElementById("copyright-year").innerText = new Date().getFullYear();
