import DarkToggle from "./assets/components/mv-dark-toggle.js";
import NavMenuToggle from "./assets/components/mv-nav-menu-toggle.js";
// import Callout from "./assets/components/mv-callout.js";
// import setupRemoveImgOnError from "./assets/scripts/remove-img-onerror.js";
// import { loadLargeCosmicImages } from "./assets/scripts/cosmic-image.js";

function onDOMLoaded() {
  DarkToggle.register();
  NavMenuToggle.register();
  // Callout.register();
  // loadLargeCosmicImages();

  window.addEventListener("pageshow", () => {
    NavMenuToggle.onpageshow();
  });

  // setupRemoveImgOnError();
}


document.addEventListener('DOMContentLoaded', onDOMLoaded);