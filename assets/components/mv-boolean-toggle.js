export default class BooleanToggle extends HTMLElement {
  constructor() {
    super();

    this.hydrateElements();
    this.attachListeners();
  }

  static get inputId() { return 'boolean-toggle-input'; }

  get checked() {
    return this.input.checked;
  }

  set checked(willBeChecked) {
    if (this.input.checked !== willBeChecked) {
      this.input.click();
    }
  }

  static register() {
    customElements.define(this.inputId, this);
  }

  // Markup (input, label, icons) is rendered server-side via the
  // boolean-toggle.njk macro. This just wires up references to it.
  hydrateElements() {
    this.input = this.querySelector('input');
    this.label = this.querySelector('label');
  }

  attachListeners() {
    this.input.addEventListener('change', this.onCheckedStateChange.bind(this));
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
