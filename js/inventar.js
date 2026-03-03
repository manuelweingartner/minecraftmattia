/* ============================================
   Inventar - Zusaetzliche Interaktivitaet
   Hover-Effekte und Tooltip-Positionierung
   ============================================ */

(function() {
  'use strict';

  // Tooltips richtig positionieren (nicht aus dem Viewport raus)
  const slots = document.querySelectorAll('.inv-slot');

  slots.forEach(function(slot) {
    const tooltip = slot.querySelector('.mc-tooltip');
    if (!tooltip) return;

    slot.addEventListener('mouseenter', function() {
      const rect = slot.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      // Pruefen ob Tooltip oben rausragen wuerde
      if (rect.top < 80) {
        tooltip.style.bottom = 'auto';
        tooltip.style.top = '100%';
      } else {
        tooltip.style.bottom = '100%';
        tooltip.style.top = 'auto';
      }

      // Pruefen ob Tooltip links/rechts rausragen wuerde
      if (rect.left < tooltipRect.width / 2) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'none';
      } else if (rect.right + tooltipRect.width / 2 > window.innerWidth) {
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'none';
      }
    });
  });

})();
