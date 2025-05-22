const sessionStorageKey = 'mv-theme'
const checkboxId = 'mv-dark-toggle'

class DarkToggle extends HTMLElement {
  constructor(){
    super();
  }
  
  /**
   * 
   * @param {boolean} isDark 
  */
  static setThemeAttrToDark(isDark) {
    const root = document.querySelector('html');
    const theme = isDark ? 'DARK' : 'LIGHT';

    root.setAttribute(sessionStorageKey, theme);
    sessionStorage.setItem(sessionStorageKey, theme);
  }

  static userPrefersDark () {
    const theme = sessionStorage.getItem(sessionStorageKey);
    return theme === 'DARK' ||
      (theme === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  static onPageShow() {
    const theme = sessionStorage.getItem(sessionStorageKey);
    const input = document.getElementById(checkboxId);
    if (theme && input) {
      input.checked = theme === 'DARK'
    }
  }

  connectedCallback() {
    const [input, label] = this.buildElements();
    this.input = input;
    this.label = label;
    this.appendChild(this.input);
    this.appendChild(this.label);
  }
  
  buildElements() {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = checkboxId;
    input.name = checkboxId;
    input.hidden = true;
    input.checked = DarkToggle.userPrefersDark();
    input.addEventListener('change', function () {
      DarkToggle.setThemeAttrToDark(this.checked);
    })
    
    const label = document.createElement('label');
    label.htmlFor = checkboxId;
    label.role = 'button';
    label.tabIndex = '0';

    const sunIcon = document.createElement('i');
    sunIcon.classList.add('fa-solid', 'fa-sun', 'unchecked');
    sunIcon.ariaHidden = 'true';

    const moonIcon = document.createElement('i');
    moonIcon.classList.add('fa-solid', 'fa-moon', 'checked');
    moonIcon.ariaHidden = 'true';

    const accessibleText = document.createElement('span');
    accessibleText.textContent = 'Toggle dark mode';
    accessibleText.classList.add('sr-only');

    label.appendChild(input)
    label.appendChild(sunIcon);
    label.appendChild(moonIcon);
    label.appendChild(accessibleText);

    return [input, label];
  }
}

export const DarkToggleActions = {
  register: () => {
    customElements.define('mv-dark-toggle', DarkToggle);
  },
  onPageShow: DarkToggle.onPageShow,
}

