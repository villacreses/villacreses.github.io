import BooleanToggle from './mv-boolean-toggle.js';

const sessionStorageKey = 'data-mv-theme';

class DarkToggle extends BooleanToggle {
  static get inputId() { return 'mv-dark-toggle'; }
  get uncheckedClass() { return 'fa-solid fa-sun'; }
  get checkedClass() { return 'fa-solid fa-moon'; }
  get accessibleTextContent() { return 'Toggle dark mode'; }

  constructor() {
    super();
    this.input.checked = DarkToggle.userPrefersDark();
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
        this.input.checked = event.newValue === 'DARK';
      }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      this.input.checked = event.matches;
      this.onCheckedStateChange(event.matches);
    });
  }

  onCheckedStateChange(isChecked) {
    DarkToggle._storeThemeInSession(isChecked);
  }
}

export default {
  register: () => {
    customElements.define('mv-dark-toggle', DarkToggle);
  }
};
