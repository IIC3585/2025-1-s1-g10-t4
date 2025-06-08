import { LitElement, html } from 'lit';

export class LitAccordion extends LitElement {
  constructor() {
    super();
    this._onToggle = this._onToggle.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('toggle', this._onToggle);
  }

  disconnectedCallback() {
    this.removeEventListener('toggle', this._onToggle);
    super.disconnectedCallback();
  }

  _onToggle(e) {
    const items = this.querySelectorAll('lit-accordion-item');
    items.forEach(item => {
      if (item === e.detail.item) {
        item.open = true;
      } else {
        item.open = false;
      }
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('lit-accordion', LitAccordion);
