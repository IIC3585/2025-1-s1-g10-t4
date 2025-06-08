import { LitElement, html, css } from 'lit';

export class LitAccordionItem extends LitElement {
  static properties = {
    title: { type: String },
    open: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.title = 'Untitled';
    this.open = false;
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --header-bg: #f5f7fa;
      --header-color: #1e293b;
      --content-bg: #ffffff;
      --border-color: #e2e8f0;
      --hover-bg: #e2e8f0;
      --icon-color: #3b82f6;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      margin-bottom: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .header {
      background: var(--header-bg);
      color: var(--header-color);
      padding: 12px 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1rem;
      font-weight: 600;
      transition: background 0.2s ease;
    }

    .header:hover {
      background: var(--hover-bg);
    }

    .icon {
      transition: transform 0.2s ease;
      color: var(--icon-color);
    }

    :host([open]) .icon {
      transform: rotate(90deg);
    }

    .content {
      background: var(--content-bg);
      padding: 16px;
      display: none;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    :host([open]) .content {
      display: block;
    }
  `;

  _toggle() {
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { item: this },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="header" @click="${this._toggle}">
        <span class="title">${this.title}</span>
        <span class="icon">▶</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('lit-accordion-item', LitAccordionItem);
