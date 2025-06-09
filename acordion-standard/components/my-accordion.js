// Custom Elements
class MyAccordion extends HTMLElement {
  constructor() {
    super();
    this._onToggle = this._onToggle.bind(this);
    this._openItem = null;
  }

  connectedCallback() {
    this.addEventListener("toggle", this._onToggle);
  }

  disconnectedCallback() {
    this.removeEventListener("toggle", this._onToggle);
  }

  _onToggle(e) {
    const items = this.querySelectorAll("my-accordion-item");
    if (this._openItem === e.detail.item) {
      // Collapse if clicking the open item
      this._openItem.close();
      this._openItem = null;
    } else {
      items.forEach((item) => {
        if (item === e.detail.item) {
          item.open();
          this._openItem = item;
        } else {
          item.close();
        }
      });
    }
  }
}

customElements.define("my-accordion", MyAccordion);
