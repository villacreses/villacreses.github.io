export default class CountdownForm extends HTMLElement {
  static _isRegistered = false;
  static elementTag = 'mv-countdown-form';

  static register() {
    if (!CountdownForm._isRegistered) {
      customElements.define(CountdownForm.elementTag, CountdownForm);
      CountdownForm._isRegistered = true;
    }
  }

  constructor() {
    super();
    this.initBuildForm();

    this.resetTimestamp = this.resetTimestamp.bind(this);
  }

  initBuildForm() {
    this.innerHTML = `
      <form>
        <input type="date" name="date" title="Pick a date" />
        <input type="time" name="time" title="Select a time">
        <input type="text" name="label" title="Counter label" required />
        <button id="add-counter" type="submit">Add counter</button>
      </form>
    `;

    const form = this.querySelector('form');

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = Object.fromEntries((new FormData(form)).entries());
      form.reset();
      this.resetTimestamp();
      
      this.dispatchEvent(new CustomEvent('addcountdown', {
        detail: { formData },
        bubbles: true,
      }));
    }); 

    this.dateInput = this.querySelector("input[name=date]");
    this.timeInput = this.querySelector("input[name=time]");
    this.resetTimestamp();
  }

  resetTimestamp() {
    const stamp = new Date(Date.now());
    this.datestring = stamp;
    this.timestring = stamp;
  }

  /**
   * @param {Date} dateObj
   */
  set timestring(dateObj) {
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    this.timeInput.value = `${hours}:${minutes}`;
  } 

  /**
   * @param {Date} dateObj
   */
  set datestring(dateObj) {
    const datestring = [
      dateObj.getFullYear(),
      String(dateObj.getMonth() + 1).padStart(2, '0'),
      String(dateObj.getDate()).padStart(2, '0')
    ].join('-')

    this.dateInput.value = datestring;
  }
}