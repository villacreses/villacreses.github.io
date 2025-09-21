import DarkToggle from "./assets/shared/components/mv-dark-toggle.js";
import NavMenuToggle from "./assets/shared/components/mv-nav-menu-toggle.js";

function onDOMLoaded() {
  DarkToggle.register();
  NavMenuToggle.register();

  window.addEventListener("pageshow", () => {
    NavMenuToggle.onpageshow();
    DarkToggle.onpageshow();
  });
}


document.addEventListener('DOMContentLoaded', onDOMLoaded);