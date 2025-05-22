import {DarkToggleActions} from "./assets/components/mv-dark-toggle.js";

function app() {
  DarkToggleActions.register()
  const menuToggle = document.getElementById('menu-toggle');

  window.addEventListener("pageshow", () => {
    DarkToggleActions.onPageShow();

    if (menuToggle) {
      menuToggle.checked = false;
    }
  });

  menuToggle.addEventListener('change', function() {
    const selector = 'a:not(#nav-links a), label[for=mv-dark-toggle]';
    const clickables = Array.from(document.querySelectorAll(selector))
      .filter(({textContent}) => textContent !== 'optimized site')
      .concat(document.querySelector('label[for=mv-dark-toggle]'));
    
    clickables.forEach(a => {
      a.setAttribute('tabindex', this.checked ? '-1' : '0');
    })

    this.setAttribute('aria-expanded', this.checked);
    ['main', '.home-link', 'footer'].forEach(selector => {
      document.querySelector(selector).setAttribute('aria-hidden', this.checked);
    })
  })
}

document.addEventListener('DOMContentLoaded', app);

