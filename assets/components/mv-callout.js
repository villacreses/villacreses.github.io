class Callout extends HTMLElement {
  static labels = {
    note: 'Note',
    tip: 'Tip',
    warning: 'Warning',
    important: 'Important',
    caution: 'Caution',
  }

  static icons = {
    note: 'fa-regular fa-note-sticky',
    tip: 'fa-solid fa-lightbulb',
    warning: 'fa-solid fa-triangle-exclamation',
    important: 'fa-solid fa-circle-exclamation',
    caution: 'fa-solid fa-radiation',
  };

  connectedCallback() {
    const type = this.getAttribute('type') || 'note';

    const label = Callout.labels[type] || Callout.labels.note;
    const icon = Callout.icons[type] || icons.note;

    const callout = this.buildCallout({ type, label, icon });
    
    this.appendChild(callout);
  }

  buildCallout({ type, label, icon }) {
    const aside = document.createElement('aside');
    aside.className = `new-callout ${type}`;
    aside.setAttribute('role', 'note');
    aside.setAttribute('aria-label', label);

    const header = document.createElement('header');

    const iconEl = document.createElement('i');
    iconEl.className = icon;
    iconEl.setAttribute('aria-hidden', 'true');

    const labelEl = document.createElement('strong');
    labelEl.textContent = label;

    const heading = document.createElement('p');
    heading.append(iconEl, labelEl);
    header.appendChild(heading);

    const body = document.createElement('div');
    body.className = 'callout-body';
    body.setAttribute('markdown', '1');

    while(this.firstChild){ 
      body.appendChild(this.firstChild);
    } 
    aside.append(header, body);
    return aside;

  }
}

export default {
  register: () => {
    customElements.define('mv-callout', Callout);
  }
}
