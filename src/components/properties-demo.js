import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class PropertiesDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .big  { font-size: 64px; font-weight: 800; color: #1a237e; text-align: center; }
        .btns { display: flex; gap: 6px; justify-content: center; margin-top: 12px; }
        button { padding: 6px 14px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
      </style>
      <div class="big">[[contador]]</div>
      <div class="btns">
        <button style="background:#ffebee;color:#c62828" on-click="_menos">− Restar</button>
        <button style="background:#e8eaf6;color:#3f51b5" on-click="_reset">Reset</button>
        <button style="background:#3f51b5;color:white"   on-click="_mas">+ Sumar</button>
      </div>
    `;
  }

  static get properties() {
    return { contador: { type: Number, value: 0 } };
  }

  _mas()   { this.contador++; }
  _menos() { this.contador--; }
  _reset() { this.contador = 0; }
}

customElements.define('properties-demo', PropertiesDemo);
