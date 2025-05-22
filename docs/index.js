import {DarkToggleActions} from "./assets/components/mv-dark-toggle.js";

function app() {
  DarkToggleActions.register()

  window.addEventListener("pageshow", () => {
    DarkToggleActions.onPageShow();

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.checked = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', app);

