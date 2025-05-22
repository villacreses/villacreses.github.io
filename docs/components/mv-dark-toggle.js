const sessionStorageKey = 'mv-theme'

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

  connectedCallback() {
    const [input, label] = this.buildElements();
    this.input = input;
    this.label = label;
    this.appendChild(this.input);
    this.appendChild(this.label);

    window.addEventListener("pageshow", () => {
      const theme = sessionStorage.getItem(sessionStorageKey);
      if (theme) {
        this.input.checked = theme === 'DARK'
      }
    });
  }
  
  buildElements() {
    const id = 'dark-toggle'
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.name = id;
    input.hidden = true;
    input.checked = DarkToggle.userPrefersDark();
    input.addEventListener('change', function () {
      DarkToggle.setThemeAttrToDark(this.checked);
    })

    const label = document.createElement('label');
    label.htmlFor = id;
    label.role = 'button';

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

export const registerDarkToggle = () => {
    customElements.define('mv-dark-toggle', DarkToggle);
  }
