import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';

class SaludoElemento extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .out  { padding: 12px 16px; background: white; border-left: 4px solid #3f51b5; font-size: 18px; font-weight: 700; color: #1a237e; }
        .empty{ color: #9e9e9e; font-style: italic; font-weight: 400; font-size: 13px; }
      </style>
      <div class="out">
        <template is="dom-if" if="[[nombre]]">Hola, [[nombre]]!</template>
        <template is="dom-if" if="[[!nombre]]"><span class="empty">Escribe un nombre arriba...</span></template>
      </div>
    `;
  }

  static get properties() {
    return { nombre: { type: String, value: '' } };
  }
}
customElements.define('saludo-elemento', SaludoElemento);


class CustomElementsDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: flex; flex-direction: column; gap: 12px; }
        input { padding: 7px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 100%; box-sizing: border-box; }
        input:focus { outline: none; border-color: #3f51b5; }
      </style>
      <input type="text" value="{{nombre::input}}" placeholder="Escribe un nombre...">
      <saludo-elemento nombre="[[nombre]]"></saludo-elemento>
    `;
  }

  static get properties() {
    return { nombre: { type: String, value: '' } };
  }
}

customElements.define('custom-elements-demo', CustomElementsDemo);
