export default class CountdownEnt extends HTMLElement {
  static elementTag = ''
  static _isRegistered = false;
  static eventName = {};

  constructor() {
    super();
    this.init();
  }

  static register() {
    if (!this._isRegistered) {
      customElements.define(this.elementTag, this);
      this._isRegistered = true;
    }
  }

  init() {}

  dispatch(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
    }));
  }
}