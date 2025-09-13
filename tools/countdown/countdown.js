import CountdownForm from "./mv-countdown-form.js";
import Countdown from "./mv-countdown.js";

const manager = (function () {
  let _counters = [];
  const storageId = 'mv-countdown';

  const updateStorage = async (updatedCounterNodes) => {
    const countersToStore = updatedCounterNodes.map((node) => ({
      time: CountdownForm.buildTimestring(node.startTime),
      date: CountdownForm.buildDatestring(node.startTime),
      title: node.title,
    }));

    localStorage.setItem(storageId, JSON.stringify(countersToStore));
  }
  
  return {
    push: (countdownNode) => {
      _counters.push(countdownNode);
      updateStorage(_counters);
    },
    entries: () => _counters,
    remove: (counterId) => {
      _counters = _counters.filter(counter => counter.id !== counterId)
      document.getElementById(counterId)?.remove();
      updateStorage(_counters);
    },
    retrieve: () => {
      _counters = JSON.parse(localStorage.getItem(storageId))
        .map(({time, date, title}) => 
          new Countdown(buildDateFromStrings(date, time), title)
        );
    },
    purge: () => {
      _counters.forEach(counter => {
        counter.remove();
      })
      _counters = [];
    }
  }
})()

function buildDateFromStrings(dateString, timeString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

document.addEventListener("DOMContentLoaded", () => {
  Countdown.register();
  CountdownForm.register();
  manager.retrieve();
})

document.addEventListener('addcountdown', (evt) => {
  const {formData} = evt.detail;
  const date = buildDateFromStrings(formData.date, formData.time)
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
