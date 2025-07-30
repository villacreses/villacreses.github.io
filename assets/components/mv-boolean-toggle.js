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

  buildElements() {
    this.classList.add('boolean-toggle');
    this.input = document.createElement('input');
    this.label = document.createElement('label');
    this.uncheckedIcon = document.createElement('i');
    this.checkedIcon = document.createElement('i');
    this.accessibleText = document.createElement('span');

    this.input.type = 'checkbox';
    this.input.hidden = true;
    this.input.id = this.constructor.inputId;

    this.label.htmlFor = this.constructor.inputId;
    this.label.role = 'button';
    this.label.tabIndex = '0';
    this.label.setAttribute('aria-label', this.accessibleTextContent);

    if (this.uncheckedClass) {
      this.uncheckedIcon.classList.add(...this.uncheckedClass.split(' '));
    }
    this.uncheckedIcon.classList.add('unchecked');

    if (this.checkedClass) {
      this.checkedIcon.classList.add(...this.checkedClass.split(' '));
    }
    this.checkedIcon.classList.add('checked');

    this.accessibleText.textContent = this.accessibleTextContent;
    this.accessibleText.classList.add('sr-only');

    this.label.appendChild(this.uncheckedIcon);
    this.label.appendChild(this.checkedIcon);
    this.label.appendChild(this.accessibleText);

    this.appendChild(this.input);
    this.appendChild(this.label);
  }

  attachListeners() {
    this.input.addEventListener('change', () => this.onCheckedStateChange(this.input.checked));
    this.label.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.input.click();
      }
    });
  }

  syncCheckState(boolToMatch) {
    if (this.input.checked !== boolToMatch) {
      this.input.click()
    }
  }

  onCheckedStateChange(isChecked) {
    // To be overridden in subclass
  }
}