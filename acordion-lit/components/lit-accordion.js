import { LitElement, html } from "lit";

export class LitAccordion extends LitElement {
  constructor() {
    super();
    this._onToggle = this._onToggle.bind(this);
    this._openItem = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("toggle", this._onToggle);
  }

  disconnectedCallback() {
    this.removeEventListener("toggle", this._onToggle);
    super.disconnectedCallback();
  }

  _onToggle(e) {
    const items = this.querySelectorAll("lit-accordion-item");
    if (this._openItem === e.detail.item) {
      // Collapse if clicking the open item
      this._openItem.open = false;
      this._openItem = null;
    } else {
      items.forEach((item) => {
        if (item === e.detail.item) {
          item.open = true;
          this._openItem = item;
        } else {
          item.open = false;
        }
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("lit-accordion", LitAccordion);
