import BooleanToggle from "./mv-boolean-toggle.js ";

class NavMenuToggle extends BooleanToggle {
  static get inputId() { return 'mv-nav-menu-toggle'; }
  
  get uncheckedClass() { return 'fa-solid fa-bars'; }
  get checkedClass() { return 'fa-solid fa-xmark'; }
  get accessibleTextContent() { return 'Toggle navigation menu'; }

  get clickableElementsSelector() {
    return [
      'a:not(#nav-links a):not(#page-footer small a)',
      'label[for=mv-dark-toggle]',
    ].join(',');
  }

  constructor() {
    super();
    this.label.setAttribute('role', 'button');
    this.label.setAttribute('aria-controls', 'nav-links');

    this.init();
  }

  init() {
    document.addEventListener("keydown", function (event) {
      if ((event.key === "Escape" || event.key === "Esc") && this.input.checked) {
        this.input.click();
      }
    });
  }

  onCheckedStateChange(isChecked) {
    // Update tabindex for links
    Array.from(document.querySelectorAll(this.clickableElementsSelector)).forEach(a => {
      a.setAttribute('tabindex', isChecked ? '-1' : '0');
    });

    this.setAttribute('aria-expanded', this.input.checked);
    ['main', '.home-link', 'footer'].forEach(selector => {
      document.querySelector(selector).setAttribute('aria-hidden', this.input.checked);
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