export default class BooleanToggle extends HTMLElement {
  constructor() {
    super();
    
    this.buildElements();
    this.attachListeners();
  }

  // Static getters for flexibility
  static get inputId() { return 'boolean-toggle-input'; }
  get uncheckedClass() { return ''; } // Override in subclass
  get checkedClass() { return ''; } // Override in subclass
  get accessibleTextContent() { return ''; } // Override in subclass

  get checked() {
    return this.input.checked;
  }

  set checked(willBeChecked) {
    if (this.input.checked !== willBeChecked) {
      this.input.click();
    }
  }

  buildElements() {
    this.classList.add('boolean-toggle');
    this.innerHTML = `
      <input type="checkbox" hidden id="${this.constructor.inputId}">
      <label for="${this.constructor.inputId}" role="button" tabindex="0" aria-label="${this.accessibleTextContent}">
        <i class="${this.uncheckedClass} unchecked" aria-hidden="true"></i>
        <i class="${this.checkedClass} checked" aria-hidden="true"></i>
        <span class="sr-only">${this.accessibleTextContent}</span>
      </label>
    `;

    this.input = this.querySelector('input');
    this.label = this.querySelector('label');
  }

  attachListeners() {
    this.input.addEventListener('change', this.onCheckedStateChange);
    this.label.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.input.click();
      }
    });
  }

  onCheckedStateChange(evt) {
    // To be overridden in subclass
  }
}