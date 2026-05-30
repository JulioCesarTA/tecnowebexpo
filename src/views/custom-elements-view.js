import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles.js';

class SaludoElemento extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .out { padding: 12px 16px; background: white; border-left: 4px solid #3f51b5; font-size: 18px; font-weight: 700; color: #1a237e; }
        .empty { color: #9e9e9e; font-style: italic; font-weight: 400; font-size: 13px; }
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


class CustomElementsView extends PolymerElement {
  static get properties() {
    return { nombre: { type: String, value: '' } };
  }
}

const tpl = document.createElement('template');
tpl.innerHTML = await (await fetch(new URL('./custom-elements-view.html', import.meta.url))).text();
CustomElementsView._template = tpl;

customElements.define('custom-elements-view', CustomElementsView);
