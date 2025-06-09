import { LitElement, html, css } from "lit";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";

export class LitSuscripcion extends LitElement {
  static properties = {
    planId: { type: String, attribute: "plan-id" },
    title: { type: String },
    subtitle: { type: String },
    price: { type: Number },
    originalPrice: { type: String, attribute: "original-price" },
    description: { type: String },
    featuresTitle: { type: String, attribute: "features-title" },
    features: { type: Array },
    buttonText: { type: String, attribute: "button-text" },
    highlight: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.features = [];
    this.period = "/mo";
    this.buttonText = "Get Started";
  }

  static styles = css`
    :host {
      display: flex;
      font-family: "Inter", system-ui, -apple-system, sans-serif;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --highlight-color: #3b82f6;
      --highlight-hover: #2563eb;
      --text-primary: #1e293b;
      --text-secondary: #64748b;
      --bg-hover: #f8fafc;
      position: relative;
      overflow: visible;
      cursor: pointer;
    }
    :host(:not([highlight])):hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: var(--highlight-color);
      z-index: 5;
    }
    :host([highlight]) {
      border-color: var(--highlight-color);
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 30px -12px rgba(59, 130, 246, 0.25);
      z-index: 10;
    }
    :host([highlight]):hover {
      transform: translateY(-14px) scale(1.03);
      box-shadow: 0 30px 35px -12px rgba(59, 130, 246, 0.3);
    }
    .card {
      padding: 32px;
      text-align: left;
      position: relative;
      background-color: white;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 24px;
    }
    .highlight-badge {
      display: none;
      position: absolute;
      top: 0;
      right: 24px;
      background: linear-gradient(
        135deg,
        var(--highlight-color),
        var(--highlight-hover)
      );
      color: white;
      padding: 8px 16px;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
      letter-spacing: 0.025em;
    }
    :host([highlight]) .highlight-badge {
      display: block;
    }
    .title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.025em;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-top: 4px;
      font-weight: 500;
    }
    .price-section {
      margin: 8px 0;
    }
    .price {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
      letter-spacing: -0.05em;
      display: flex;
      align-items: baseline;
      gap: 4px;
      transition: transform 0.2s ease;
    }
    :host(:hover) .price {
      transform: scale(1.05);
    }
    .price .period {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-secondary);
    }
    .original-price {
      font-size: 0.875rem;
      color: #94a3b8;
      text-decoration: line-through;
      margin-top: 4px;
    }
    .description {
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--text-secondary);
      flex-grow: 1;
    }
    .features-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 16px;
    }
    .features {
      list-style: none;
      padding: 0;
      margin: 0;
      color: var(--text-secondary);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .features li {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      line-height: 1.5;
      position: relative;
      padding-left: 28px;
      transition: transform 0.2s ease, color 0.2s ease;
    }
    :host(:hover) .features li {
      transform: translateX(4px);
      color: var(--highlight-color);
    }
    .features li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2322c55e'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
    .new-badge {
      background-color: #eff6ff;
      color: var(--highlight-color);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 9999px;
      margin-left: 8px;
      letter-spacing: 0.025em;
    }
    .button-container {
      margin-top: 8px;
    }
    .button {
      background: var(--highlight-color);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 14px 24px;
      width: 100%;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      letter-spacing: 0.025em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .button::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0)
      );
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .button:hover {
      background: var(--highlight-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .button:hover::after {
      opacity: 1;
    }
    .button:active {
      transform: translateY(0);
    }
    :host([highlight]) .button {
      background: var(--text-primary);
    }
    :host([highlight]) .button:hover {
      background: #0f172a;
    }
    /* Loading and Success States */
    .button.loading {
      background: var(--highlight-color);
      cursor: not-allowed;
      opacity: 0.8;
    }
    .button.loading::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    .button.success {
      background: #22c55e;
      color: white;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.15);
    }
    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    @media (max-width: 992px) {
      :host([highlight]),
      :host(:not([highlight])):hover {
        transform: none;
      }
      .card {
        padding: 24px;
      }
      .price {
        font-size: 2.5rem;
      }
    }
    .tooltip {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: var(--text-primary);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      z-index: 100;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .tooltip::after {
      content: "";
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 12px;
      height: 12px;
      background: var(--text-primary);
    }
  `;

  _subscribed = false;
  _loading = false;
  _hover = false;

  static TOOLTIP_MESSAGES = {
    basic: {
      text: "Perfect for individuals and small projects",
      highlight: "Start your journey with our most popular plan!",
    },
    pro: {
      text: "Advanced features for growing businesses",
      highlight: "Most popular choice for startups!",
    },
    business: {
      text: "Complete solution for large organizations",
      highlight: "Unlock all features with premium support!",
    },
    enterprise: {
      text: "Enterprise-grade features with dedicated support",
      highlight: "Maximum scalability and customization!",
    },
    freelance: {
      text: "Perfect for freelancers and small teams",
      highlight: "Most popular among independent professionals!",
    },
  };

  get _tooltipText() {
    const planId = this.planId?.toLowerCase();
    const isHighlighted = this.highlight;
    const tooltip = LitSuscripcion.TOOLTIP_MESSAGES[planId] || {
      text: "Custom plan with tailored features",
      highlight: "Special plan with premium benefits!",
    };
    return isHighlighted ? tooltip.highlight : tooltip.text;
  }

  async _handleSubscribe() {
    if (this._loading) return;
    this._loading = true;
    this.requestUpdate();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._loading = false;
    this._subscribed = true;
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("subscribe", {
        bubbles: true,
        composed: true,
        detail: { planId: this.planId, title: this.title, price: this.price },
      })
    );
  }

  render() {
    return html`
      <div
        class="tooltip"
        style="${this._hover
          ? "opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);"
          : ""}"
      >
        ${this._tooltipText}
      </div>
      <div
        class="card"
        @mouseenter="${() => {
          this._hover = true;
          this.requestUpdate();
        }}"
        @mouseleave="${() => {
          this._hover = false;
          this.requestUpdate();
        }}"
      >
        ${when(
          this.highlight,
          () => html`<div class="highlight-badge">Most Popular</div>`
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
                  () => html`<span class="new-badge">New</span>`
                )}
              </li>
            `
          )}
        </ul>
        <div class="button-container">
          <button
            class="button ${this._loading ? "loading" : ""} ${this._subscribed
              ? "success"
              : ""}"
            @click="${this._handleSubscribe}"
            ?disabled="${this._loading || this._subscribed}"
          >
            ${this._loading
              ? html``
              : this._subscribed
              ? html`<svg
                    xmlns="http://www.w3.org/2000/svg"
                    style="display:inline;vertical-align:middle;margin-right:6px"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    /></svg
                  ><span style="vertical-align:middle;font-weight:600;"
                    >Subscribed!</span
                  >`
              : this.buttonText}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-suscripcion", LitSuscripcion);
