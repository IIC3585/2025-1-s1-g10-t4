import { LitElement, html, css } from "lit";

export class LitAccordionItem extends LitElement {
  static properties = {
    title: { type: String },
    open: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.title = "Untitled";
    this.open = false;
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Inter", system-ui, sans-serif;
      --header-bg: rgba(241, 245, 249, 0.85);
      --header-blur: blur(8px);
      --header-border: 1.5px solid #3b82f6;
      --header-color: #1e293b;
      --content-bg: #ffffff;
      --border-color: #e0e7ef;
      --hover-bg: rgba(59, 130, 246, 0.07);
      --icon-color: #3b82f6;
      --shadow: 0 8px 32px 0 rgba(30, 41, 59, 0.1);
      border: 1.5px solid var(--border-color);
      border-radius: 16px;
      margin-bottom: 20px;
      overflow: hidden;
      box-shadow: var(--shadow);
      background: var(--content-bg);
      transition: box-shadow 0.2s, border 0.2s;
    }
    .header {
      background: var(--header-bg);
      color: var(--header-color);
      padding: 22px 32px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      border-radius: 12px 12px 0 0;
      transition: background 0.2s, color 0.2s, border 0.2s;
      min-height: 64px;
      backdrop-filter: var(--header-blur);
      border-bottom: var(--header-border);
      box-shadow: 0 2px 8px 0 rgba(59, 130, 246, 0.04);
      position: relative;
    }
    .header:hover {
      background: var(--hover-bg);
      color: var(--icon-color);
      border-bottom: 2px solid #2563eb;
    }
    .header-main {
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 0;
    }
    ::slotted([slot="meta"]) {
      background: #e0e7ef;
      color: #2563eb;
      font-size: 0.92em;
      font-weight: 600;
      border-radius: 8px;
      padding: 4px 14px 4px 10px;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      gap: 6px;
      vertical-align: middle;
      transition: background 0.2s, color 0.2s;
      box-shadow: 0 1px 4px 0 rgba(59, 130, 246, 0.07);
      white-space: nowrap;
    }
    .header:hover ::slotted([slot="meta"]) {
      background: #3b82f6;
      color: #fff;
    }
    .chevron {
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
      color: var(--icon-color);
      width: 1.5em;
      height: 1.5em;
      margin-left: 14px;
      flex-shrink: 0;
      display: inline-block;
    }
    :host([open]) .chevron {
      transform: rotate(90deg) scale(1.15);
      color: #2563eb;
    }
    .content {
      background: var(--content-bg);
      padding: 28px 32px 24px 32px;
      font-size: 1.05rem;
      font-weight: 400;
      color: #475569;
      line-height: 1.7;
      letter-spacing: 0.01em;
      border-radius: 0 0 16px 16px;
      box-sizing: border-box;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transform: translateY(16px);
      transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s,
        transform 0.35s;
    }
    :host([open]) .content {
      opacity: 1;
      max-height: 800px;
      transform: translateY(0);
      transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s,
        transform 0.4s;
    }
    @media (max-width: 600px) {
      .header,
      .content {
        padding-left: 14px;
        padding-right: 14px;
      }
      .header {
        font-size: 1.01rem;
        min-height: 44px;
      }
      .content {
        font-size: 0.98rem;
      }
      .header-main {
        gap: 8px;
      }
    }
  `;

  _toggle() {
    this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: { item: this },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="header" @click="${this._toggle}">
        <span class="header-main">
          <span class="title">${this.title}</span>
          <slot name="meta"></slot>
        </span>
        <span class="chevron">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 8 10 12 14 8" />
          </svg>
        </span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("lit-accordion-item", LitAccordionItem);
