import DarkToggle from "./assets/components/mv-dark-toggle.js";
import NavMenuToggle from "./assets/components/mv-nav-menu-toggle.js";

function onDOMLoaded() {
  DarkToggle.register();
  NavMenuToggle.register();

  window.addEventListener("pageshow", () => {
    NavMenuToggle.onpageshow();
    DarkToggle.onpageshow();
  });
}


document.addEventListener('DOMContentLoaded', onDOMLoaded);