import BooleanToggle from './mv-boolean-toggle.js';

const sessionStorageKey = 'data-mv-theme';

class DarkToggle extends BooleanToggle {
  static get inputId() { return 'mv-dark-toggle'; }
  get uncheckedClass() { return 'fa-solid fa-sun'; }
  get checkedClass() { return 'fa-solid fa-moon'; }
  get accessibleTextContent() { return 'Toggle dark mode'; }

  constructor() {
    super();

    const isDark = DarkToggle.userPrefersDark();
    this.input.checked = isDark;

    const root = document.documentElement;
    root.classList.add(isDark ? 'dark-mode' : 'light-mode');

    this.syncAcrossSessions();
  }


  static userPrefersDark() {
    const theme = sessionStorage.getItem(sessionStorageKey) || null;
    return theme === 'DARK' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  static _storeThemeInSession(isDark) {
    sessionStorage.setItem(sessionStorageKey, isDark ? 'DARK' : 'LIGHT');
  }

  syncAcrossSessions() {
    window.addEventListener('storage', (event) => {
      if (event.key === sessionStorageKey) {
        this.syncCheckState(event.newValue === 'DARK')
      }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.syncCheckState(event.matches);
    });
  }

  onCheckedStateChange(isChecked) {
    DarkToggle._storeThemeInSession(isChecked);
    this._updateRootClass(isChecked)
  }
  
  _updateRootClass(setToDark) {
    const root = document.documentElement;
    root.classList.remove('light-mode', 'dark-mode');
    root.classList.add(setToDark ? 'dark-mode' : 'light-mode');
  }
}

export default {
  register: () => {
    customElements.define(DarkToggle.inputId, DarkToggle);
  },
  onpageshow: () => {
    const useDarkMode = DarkToggle.userPrefersDark();
    const toggle = document.querySelector(`${DarkToggle.inputId} input`);
    
    if (toggle.checked !== useDarkMode) toggle.click();
  }
};