import { DarkToggleActions } from "./assets/components/mv-dark-toggle.js";

function onDOMLoaded() {
  DarkToggleActions.register()
  handleAccessibilityOfClickables();

  window.addEventListener("pageshow", () => {
    DarkToggleActions.onPageShow();

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.checked = false;
    }
  });
}

function handleAccessibilityOfClickables() {
  // For debugging:
  // document.addEventListener("focusin", (event) => {
  //   console.log("Focused element:", event.target);
  // });

  Array.from(document.querySelectorAll('#nav-actions label'))
    .forEach(toggle => toggle.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault(); // Prevent scrolling
        const checkbox = document.getElementById(toggle.getAttribute('for'));
        checkbox.checked = !checkbox.checked;
      }
    }));

  const menuToggle = document.getElementById('menu-toggle');

  menuToggle.addEventListener('change', function () {
    const selector = [
      'a:not(#nav-links a):not(#page-footer small a)',
      'label[for=mv-dark-toggle]',
    ].join(',');

    Array
      .from(document.querySelectorAll(selector))
      .forEach(a => {
        a.setAttribute('tabindex', this.checked ? '-1' : '0');
      });

    this.setAttribute('aria-expanded', this.checked);
    ['main', '.home-link', 'footer'].forEach(selector => {
      document.querySelector(selector).setAttribute('aria-hidden', this.checked);
    })
  });

  document.addEventListener("keydown", function (event) {
    if ((event.key === "Escape" || event.key === "Esc") && menuToggle.checked) {
      menuToggle.checked = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', onDOMLoaded);

