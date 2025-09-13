const generateRandomId = (length = 6) => {
  const num = Math.random().toString(36).substring(2, length + 2);
  return `counter-${num}`;
};

export default class Countdown extends HTMLElement {
  static elementTag = 'mv-countdown';
  static _registered = false;

  static template = document.querySelector('template#counter');
  static container = document.getElementById("counter-container");

  static register() {
    if (!Countdown._registered) {
      customElements.define(Countdown.elementTag, Countdown);
      Countdown._registered = true;
    }
  }

  static formatTime(seconds) {
    const segments = {
      d: Math.floor(seconds / (60 * 60 * 24)),
      h: Math.floor(seconds / (60 * 60)) % 24,
      m: Math.floor(seconds / 60) % 60,
      s: seconds % 60
    }
  
    const string = Object.entries(segments)
      .filter(([_label, count]) => count)
      .map(([label, count]) => `${count} ${label}`)
      .join(' ')
  
    return string;
  }

  constructor(startTime, title) {
    super();
    this.cloneTemplateAndGetNodes();
    this.startTime = startTime;
    this.title = title;
    this.id = generateRandomId();
    this.setupCounterButtonActions();
  }
  
  cloneTemplateAndGetNodes() {
    const root = Countdown.template.content.cloneNode(true);
    this.titleNode = root.querySelector('.label');
    this.footerNode = root.querySelector('.post-label');
    this.elapsedNode = root.querySelector(".elapsed");
    
    this.appendChild(root);
    Countdown.container.appendChild(this);
  }

  setupCounterButtonActions() {
    const id = this.id;

    this.querySelector('.fa-trash').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('deletecountdown', {
        detail: { id },
        bubbles: true,
      }));
    })
  }

  get title() {
    return this.titleNode.textContent;
  }

  /**
   * @param {string} newTitle
   */
  set title(newTitle) {
    this.titleNode.textContent = newTitle;
  }

  /**
   * @param {Date} dateObj 
   */
  set startTime(dateObj) {
    this._startTime = dateObj;
    this.footerNode.textContent = `since ${dateObj.toLocaleString()}`;
  }

  get startTime() {
    return this._startTime;
  }

  /**
   * @param {string} timeStr
   */
  set timeElapsed(timeStr) {
    this.elapsedNode.textContent = timeStr;
  } 

  updateElapsedTime(timestampNowInMS) {
    const msElapsed = timestampNowInMS - this.startTime;
    const seconds = Math.floor((msElapsed) / 1000);

    const segments = {
      d: Math.floor(seconds / (60 * 60 * 24)),
      h: Math.floor(seconds / (60 * 60)) % 24,
      m: Math.floor(seconds / 60) % 60,
      s: seconds % 60
    }

    const string = Object.entries(segments)
    .filter(([_label, count]) => count)
    .map(([label, count]) => `${count} ${label}`)
    .join(' ')
    
    this.timeElapsed = string;
  }
}
