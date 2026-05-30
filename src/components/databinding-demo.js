import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class DatabindingDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .wrap { display: flex; flex-direction: column; gap: 10px; }
        .sync { font-size: 11px; color: #7986cb; font-weight: 700; text-align: center; }
        label { display: block; font-size: 12px; color: #607d8b; margin-bottom: 3px; }
        input { padding: 7px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 100%; box-sizing: border-box; }
        input:focus { outline: none; border-color: #3f51b5; }
        .out { padding: 8px 12px; background: #f5f6fa; border-left: 3px solid #3f51b5; font-size: 13px; color: #37474f; margin-top: 4px; }
      </style>
      <div class="wrap">
        <div><label>Input A</label><input type="text" value="{{nombre::input}}" placeholder="Escribe algo..."></div>
        <div class="sync">↕ ambos comparten la misma propiedad</div>
        <div><label>Input B</label><input type="text" value="{{nombre::input}}" placeholder="O escribe aqui..."></div>
        <div class="out">Hola, <strong>[[nombre]]</strong></div>
      </div>
    `;
  }

  static get properties() {
    return { nombre: { type: String, value: '' } };
  }
}

customElements.define('databinding-demo', DatabindingDemo);
