import CountdownForm from "./mv-countdown-form.js";
import Countdown from "./mv-countdown.js";
const storageId = Countdown.elementTag;

const manager = (function () {
  let _counters = [];
  
  return {
    entries: () => [..._counters],
    refresh: () => {
      _counters = Array.from(document.querySelectorAll(Countdown.elementTag));
    }
  }
})()

const counterContainer = document.getElementById('counter-container');

(new MutationObserver(mutations => {
  const childNodeChanges = mutations.reduce(
    (acc, {addedNodes, removedNodes}) => acc + addedNodes.length + removedNodes.length, 0
  );
  
  if (childNodeChanges > 0) {
    const updatedCounterList = Array.from(counterContainer.childNodes)
      .map((node) => ({
        time: CountdownForm.buildTimestring(node.startTime),
        date: CountdownForm.buildDatestring(node.startTime),
        title: node.title,
      }));

    localStorage.setItem(storageId, JSON.stringify(updatedCounterList));
    manager.refresh();
  }
})).observe(counterContainer, {
  childList: true,
  subtree: false
})

function loadStoredCounters() {
  (JSON.parse(localStorage.getItem(storageId)) || [])
    .map(({time, date, title}) => 
      new Countdown(CountdownForm.dateFromFormData({date, time}), title)
    );
  manager.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  Countdown.register();
  CountdownForm.register();
  loadStoredCounters();
})

setInterval(() => {
  const now = Date.now();
  manager.entries().forEach((countdown) => {
    countdown.updateElapsedTime(now);
  });
}, 1000);

// TODO: Create "Add Counter +" widget that will replace the form