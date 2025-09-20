import CountdownEnt from './mv-countdown-ent.js';
import Countdown from './mv-countdown.js';

export default class CountdownForm extends CountdownEnt {
  static elementTag = 'mv-countdown-form';
  static counterContainer = document.getElementById("counter-container");
  static eventName = {
    ADD_COUNTDOWN: 'addcountdown'
  }

  constructor() {
    super();
    this.setTimestamp = this.setTimestamp.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    const form = this.querySelector('form');
    form.reset();
    this.setTimestamp(new Date(Date.now()))
  }

  init() {
    this.innerHTML = `
      <form>
        <h3>Create a countdown</h3>
        <div class="container">
          <input type="text" name="label" title="Counter label" maxlength="25" minlength="3" required />
          <div class="datetime">
            <input type="date" name="date" title="Pick a date" />
            <input type="time" name="time" title="Select a time">
          </div>
        </div>
        <button id="add-counter" type="submit">Add counter</button>
      </form>
    `;

    const form = this.querySelector('form');

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = Object.fromEntries((new FormData(form)).entries());
      this.reset();
      
      const date = CountdownForm.dateFromFormData(formData)
      new Countdown(date, formData.label);
    }); 

    this.dateInput = this.querySelector("input[name=date]");
    this.timeInput = this.querySelector("input[name=time]");
    this.setTimestamp(new Date(Date.now()));
  }

  /**
   * @param {Date} dateObj
   */
  setTimestamp(dateObj) {
    this.timeInput.value = CountdownForm.buildTimestring(dateObj);
    this.dateInput.value = CountdownForm.buildDatestring(dateObj);
  }

  static dateFromFormData({date: dateString, time: timeString}) {
    const [year, month, day] = dateString.split('-').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }
  
  /**
   * @param {Date} dateObj
   */
  static buildDatestring(dateObj) {
    return [
      dateObj.getFullYear(),
      String(dateObj.getMonth() + 1).padStart(2, '0'),
      String(dateObj.getDate()).padStart(2, '0')
    ].join('-')
  }

  /**
   * @param {Date} dateObj
   */
  static buildTimestring(dateObj) {
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
