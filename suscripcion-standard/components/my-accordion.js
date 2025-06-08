// Custom Elements
class MyAccordion extends HTMLElement {
  constructor() {
    super();
    this._onToggle = this._onToggle.bind(this);
  }

  connectedCallback() {
    this.addEventListener('toggle', this._onToggle);
  }

  disconnectedCallback() {
    this.removeEventListener('toggle', this._onToggle);
  }

  _onToggle(e) {
    const items = this.querySelectorAll('my-accordion-item');
    items.forEach(item => {
      if (item === e.detail.item) {
        item.open();
      } else {
        item.close();
      }
    });
  }
}

customElements.define('my-accordion', MyAccordion);
