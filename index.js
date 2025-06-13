import DarkToggle from "./assets/components/mv-dark-toggle.js";
import NavMenuToggle from "./assets/components/mv-nav-menu-toggle.js";
// import { loadLargeCosmicImages } from "./assets/scripts/cosmic-image.js";

function onDOMLoaded() {
  DarkToggle.register();
  NavMenuToggle.register();
  // loadLargeCosmicImages();

  window.addEventListener("pageshow", () => {
    NavMenuToggle.onpageshow();
  });
}


document.addEventListener('DOMContentLoaded', onDOMLoaded);

