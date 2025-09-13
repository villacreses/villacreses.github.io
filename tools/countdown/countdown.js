import CountdownForm from "./mv-countdown-form.js";
import Countdown from "./mv-countdown.js";

const manager = (function () {
  let _counters = []
  return {
    push: (countdownNode) => {
      _counters.push(countdownNode);
    },
    entries: () => _counters,
    remove: (counterId) => {
      _counters = _counters.filter(counter => counter.id !== counterId)
      document.getElementById(counterId)?.remove();
    },
  }
})()

document.addEventListener("DOMContentLoaded", () => {
  Countdown.register();
  CountdownForm.register();
})

document.addEventListener('addcountdown', (evt) => {
  const {formData} = evt.detail;
  const [year, month, day] = formData.date.split('-').map(Number);
  const [hours, minutes] = formData.time.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);
  const newCountdown = new Countdown(date, formData.label)
  
  manager.push(newCountdown);
})

document.addEventListener('deletecountdown', (evt) => {
  const {id} = evt.detail;
  manager.remove(id);
})

setInterval(() => {
  const now = Date.now();
  manager.entries().forEach((countdown) => {
    countdown.updateElapsedTime(now);
  });
}, 1000);
