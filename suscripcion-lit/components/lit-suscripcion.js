import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

export class LitSuscripcion extends LitElement {
  static properties = {
    planId: { type: String, attribute: 'plan-id' },
    title: { type: String },
    subtitle: { type: String },
    price: { type: Number },
    originalPrice: { type: String, attribute: 'original-price' },
    description: { type: String },
    featuresTitle: { type: String, attribute: 'features-title' },
    features: { type: Array },
    buttonText: { type: String, attribute: 'button-text' },
    highlight: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.features = [];
    this.period = '/mo';
    this.buttonText = 'Get Started';
  }

  static styles = css`
    /* CSS idéntico a la versión estándar */
    :host {
      display: flex;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: all 0.25s ease-in-out;
      --highlight-color: #3b82f6;
    }
    :host(:not([highlight])):hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 12px 22px rgba(0, 0, 0, 0.1);
    }
    :host([highlight]) {
      border-color: var(--highlight-color);
      transform: translateY(-10px) scale(1.05);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
      z-index: 10;
    }
    .card {
      padding: 24px;
      text-align: left;
      position: relative;
      background-color: white;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .highlight-badge {
      display: none;
      position: absolute;
      top: 0;
      right: 16px;
      background: var(--highlight-color);
      color: white;
      padding: 4px 12px;
      font-size: 0.8rem;
      font-weight: bold;
      border-radius: 0 0 6px 6px;
    }
    :host([highlight]) .highlight-badge {
      display: block;
    }
    .title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1e293b;
    }
    .subtitle {
      font-size: 0.9rem;
      color: #64748b;
      margin-top: 4px;
    }
    .price-section {
      margin: 24px 0;
    }
    .price {
      font-size: 2.5rem;
      font-weight: bold;
      color: #1e293b;
    }
    .price .period {
      font-size: 1rem;
      font-weight: normal;
      color: #64748b;
    }
    .original-price {
      font-size: 0.9rem;
      color: #94a3b8;
      text-decoration: line-through;
    }
    .description {
      font-size: 0.9rem;
      line-height: 1.5;
      color: #475569;
      flex-grow: 1;
    }
    .features-title {
      font-size: 1rem;
      font-weight: bold;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .features {
      list-style: none;
      padding: 0;
      margin: 0;
      color: #475569;
    }
    .features li {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      font-size: 0.9rem;
    }
    .features li::before {
      content: '✔';
      color: #22c55e;
      margin-right: 12px;
      font-size: 1.2em;
    }
    .new-badge {
      background-color: #eff6ff;
      color: #3b82f6;
      font-size: 0.7rem;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 8px;
    }
    .button-container {
      margin-top: 24px;
    }
    .button {
      background: var(--highlight-color);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 24px;
      width: 100%;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    :host([highlight]) .button {
      background-color: #1e293b;
    }
    .button:hover {
      opacity: 0.9;
    }
    @media (max-width: 992px) {
      :host([highlight]),
      :host(:not([highlight])):hover {
        transform: none;
      }
    }
  `;

  _handleSubscribe() {
    this.dispatchEvent(
      new CustomEvent('subscribe', {
        bubbles: true,
        composed: true,
        detail: { planId: this.planId, title: this.title, price: this.price },
      }),
    );
  }

  render() {
    return html`
      <div class="card">
        ${when(
          this.highlight,
          () => html`<div class="highlight-badge">Best</div>`,
        )}
        <div>
          <div class="title">${this.title}</div>
          <div class="subtitle">${this.subtitle}</div>
        </div>
        <div class="price-section">
          <div class="price">
            $${this.price}<span class="period">${this.period}</span>
          </div>
          <div class="original-price">${this.originalPrice}</div>
        </div>
        <p class="description">${this.description}</p>
        <div class="features-title">${this.featuresTitle}</div>
        <ul class="features">
          ${map(
            this.features,
            (feature) => html`
              <li>
                ${feature.text}
                ${when(
                  feature.isNew,
                  () => html`<span class="new-badge">New</span>`,
                )}
              </li>
            `,
          )}
        </ul>
        <div class="button-container">
          <button class="button" @click="${this._handleSubscribe}">
            ${this.buttonText}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('lit-suscripcion', LitSuscripcion);
