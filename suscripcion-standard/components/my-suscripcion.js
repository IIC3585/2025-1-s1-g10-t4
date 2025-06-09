const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: flex;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

    /* Tooltip styles */
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
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .tooltip::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 12px;
      height: 12px;
      background: var(--text-primary);
    }

    :host(:hover) .tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }

    /* Enhanced hover effects */
    :host(:not([highlight])) {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host(:not([highlight])):hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-color: var(--highlight-color);
      z-index: 5;
    }

    :host(:not([highlight])):hover::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 16px;
      padding: 1px;
      background: linear-gradient(135deg, var(--highlight-color), var(--highlight-hover));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
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
      background: linear-gradient(135deg, var(--highlight-color), var(--highlight-hover));
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

    .features ::slotted(li) {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      line-height: 1.5;
      position: relative;
      padding-left: 28px;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .features ::slotted(li)::before {
      content: '';
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

    .features ::slotted(.new-badge) {
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
    }

    .button::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .button:hover {
      background: var(--highlight-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

    /* Loading and Success States */
    .button.loading {
      background: var(--highlight-color);
      cursor: not-allowed;
      opacity: 0.8;
    }

    .button.loading::before {
      content: '';
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
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    /* Add hover effect to features */
    :host(:hover) .features ::slotted(li) {
      transform: translateX(4px);
      color: var(--highlight-color);
    }

    /* Add hover effect to price */
    :host(:hover) .price {
      transform: scale(1.05);
    }

    /* Add hover effect to button */
    :host(:hover) .button {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  </style>
  <div class="tooltip"></div>
  <div class="card">
    <div class="highlight-badge">Most Popular</div>
    <div>
      <div class="title"><slot name="title">Plan</slot></div>
      <div class="subtitle"><slot name="subtitle"></slot></div>
    </div>
    <div class="price-section">
      <div class="price"><slot name="price">$0</slot><span class="period">/mo</span></div>
      <div class="original-price"><slot name="original-price"></slot></div>
    </div>
    <p class="description"><slot name="description"></slot></p>
    <div class="features-title"><slot name="features-title"></slot></div>
    <ul class="features"><slot></slot></ul>
    <div class="button-container">
      <button class="button" id="cta-button">
        <slot name="button-text">Get Started</slot>
      </button>
    </div>
  </div>
`;

class MySuscripcion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._button = this.shadowRoot.querySelector("#cta-button");
    this._tooltip = this.shadowRoot.querySelector(".tooltip");
  }

  static get observedAttributes() {
    return ["plan-id", "highlight"];
  }

  connectedCallback() {
    this._button.addEventListener("click", this._handleClick.bind(this));
    this._updateTooltip();
    this._setupHoverEffects();
  }

  disconnectedCallback() {
    this._button.removeEventListener("click", this._handleClick.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "plan-id" || name === "highlight") {
      this._updateTooltip();
    }
  }

  _updateTooltip() {
    const planId = this.getAttribute("plan-id")?.toLowerCase();
    const isHighlighted = this.hasAttribute("highlight");

    const tooltips = {
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

    // Get the tooltip or fallback to a default message
    const tooltip = tooltips[planId] || {
      text: "Custom plan with tailored features",
      highlight: "Special plan with premium benefits!",
    };

    // Update tooltip content
    this._tooltip.textContent = isHighlighted
      ? tooltip.highlight
      : tooltip.text;

    // Add a small delay to ensure smooth transition
    requestAnimationFrame(() => {
      this._tooltip.style.opacity = "1";
    });
  }

  _setupHoverEffects() {
    // Add hover effect to features
    const features = this.querySelectorAll("li");
    features.forEach((feature) => {
      feature.style.transition = "transform 0.2s ease, color 0.2s ease";
    });

    // Add hover effect to price
    const price = this.shadowRoot.querySelector(".price");
    if (price) {
      price.style.transition = "transform 0.2s ease";
    }
  }

  async _handleClick() {
    if (this._button.classList.contains("loading")) return;

    this._button.classList.add("loading");
    this._button.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.dispatchEvent(
        new CustomEvent("subscribe", {
          bubbles: true,
          composed: true,
          detail: {
            planId: this.getAttribute("plan-id"),
            title:
              this.querySelector('[slot="title"]')?.textContent ||
              "Unknown Plan",
            price: this.querySelector('[slot="price"]')?.textContent || "$0",
          },
        })
      );

      this._button.classList.remove("loading");
      this._button.classList.add("success");
      this._button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display:inline;vertical-align:middle;margin-right:6px" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span style="vertical-align:middle;font-weight:600;">Subscribed!</span>
      `;
      this._button.style.background = "#22c55e";
      this._button.style.color = "white";
      this._button.style.fontWeight = "600";
      this._button.style.fontSize = "1rem";
      this._button.style.padding = "14px 24px";
      this._button.style.borderRadius = "12px";
      this._button.style.boxShadow = "0 2px 8px rgba(34,197,94,0.15)";
    } catch (error) {
      this._button.classList.remove("loading");
      this._button.disabled = false;
      console.error("Subscription failed:", error);
    }
  }
}

customElements.define("my-suscripcion", MySuscripcion);
