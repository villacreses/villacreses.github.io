import BooleanToggle from "./mv-boolean-toggle.js ";

class NavMenuToggle extends BooleanToggle {
  static get inputId() { return 'mv-nav-menu-toggle'; }
  
  get uncheckedClass() { return 'fa-solid fa-bars'; }
  get checkedClass() { return 'fa-solid fa-xmark'; }
  get accessibleTextContent() { return 'Toggle navigation menu'; }

  get clickableElements() {
    const selector = [
      'a:not(#nav-links a):not(#page-footer small a)',
      'label[for=mv-dark-toggle]',
    ].join(',');

    return Array.from(document.querySelectorAll(selector));
  }

  get elementsBlurred() {
    return ['main', '.home-link', 'footer']
      .map(selector => document.querySelector(selector))
  }

  constructor() {
    super();
    this.label.setAttribute('role', 'button');
    this.label.setAttribute('aria-controls', 'nav-links');

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc") {
        this.checked = false;
      }
    });
  }

  onCheckedStateChange() {
    // Update tabindex for links
    this.clickableElements.forEach(a => {
      a.setAttribute('tabindex', this.checked ? '-1' : '0');
    });

    this.setAttribute('aria-expanded', this.checked);
    this.elementsBlurred.forEach(element => {
      element.setAttribute('aria-hidden', this.checked);
    });

    document.querySelector('body').classList.toggle('menu-blur');
  }
}

export default {
  register: () => {
    customElements.define(NavMenuToggle.inputId, NavMenuToggle);
  },
  onpageshow: () => {
    const menuToggle = document.querySelector(`${NavMenuToggle.inputId} input[type="checkbox"]`);
    if (menuToggle && menuToggle.checked) {
      menuToggle.click();
    }
  }
};