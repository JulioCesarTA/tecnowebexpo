import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import './router/router.js';
import './components/navbar-component.js';
import './views/custom-elements-view.js';
import './views/databinding-view.js';
import './views/properties-view.js';
import './views/events-view.js';
import './views/lifecycle-view.js';

class AppShell extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: flex; min-height: 100vh; }
        main { flex: 1; padding: 32px; overflow-y: auto; background: #f0f2f5; }
      </style>

      <app-router route="{{ruta}}"></app-router>
      <navbar-component ruta="[[ruta]]"></navbar-component>

      <main>
        <template is="dom-if" if="[[_es('custom-elements', ruta)]]"><custom-elements-view></custom-elements-view></template>
        <template is="dom-if" if="[[_es('databinding', ruta)]]"><databinding-view></databinding-view></template>
        <template is="dom-if" if="[[_es('properties',  ruta)]]"><properties-view></properties-view></template>
        <template is="dom-if" if="[[_es('events',      ruta)]]"><events-view></events-view></template>
        <template is="dom-if" if="[[_es('lifecycle',   ruta)]]"><lifecycle-view></lifecycle-view></template>
      </main>
    `;
  }

  static get properties() {
    return { ruta: { type: String, value: 'databinding' } };
  }

  _es(vista, ruta) { return ruta === vista; }
}

customElements.define('app-shell', AppShell);
