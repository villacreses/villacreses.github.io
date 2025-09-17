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
    DarkToggle.rootClass = isDark;

    this.syncAcrossSessions();
  }

  static get storedTheme() {
    return sessionStorage.getItem(sessionStorageKey) || null;
  }

  static set storedTheme(isDark) {
    sessionStorage.setItem(sessionStorageKey, isDark ? 'DARK' : 'LIGHT');
  }

  static set rootClass(setToDark) {
    const root = document.documentElement;
    root.classList.remove('light-mode', 'dark-mode');
    root.classList.add(setToDark ? 'dark-mode' : 'light-mode');
  }

  static userPrefersDark() {
    const {storedTheme} = DarkToggle;
    return storedTheme === 'DARK' || (storedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  syncAcrossSessions() {
    window.addEventListener('storage', (event) => {
      if (event.key === sessionStorageKey) {
        this.checked = event.newValue === 'DARK';
      }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.checked = event.matches;
    });
  }

  onCheckedStateChange() {
    DarkToggle.storedTheme = this.checked;
    DarkToggle.rootClass = this.checked;
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