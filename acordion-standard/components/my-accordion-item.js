const template = document.createElement('template'); // HTML Templates
template.innerHTML = `
  <style>
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
  </style>
  <div class="header">
    <span class="title"></span>
    <span class="icon">▶</span>
  </div>
  <div class="content">
    <slot></slot>
  </div>
`;

// Custom Elements
class MyAccordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true)); // Shadow DOM
    this._header = this.shadowRoot.querySelector('.header');
    this._title = this.shadowRoot.querySelector('.title');
  }

  connectedCallback() {
    this._title.textContent = this.getAttribute('title') || 'Untitled';
    this._header.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggle', {
        bubbles: true,
        composed: true,
        detail: { item: this }
      }));
    });
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    this.removeAttribute('open');
  }
}

customElements.define('my-accordion-item', MyAccordionItem);
