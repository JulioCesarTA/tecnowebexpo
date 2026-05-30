import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles.js';

class PropertiesView extends PolymerElement {
  static get properties() {
    return {
      contador:   { type: Number, value: 0 },
      _bindCount: { type: String, value: '[[contador]]' },
    };
  }

  _mas()   { this.contador++; }
  _menos() { this.contador--; }
  _reset() { this.contador = 0; }
}

const tpl = document.createElement('template');
tpl.innerHTML = await (await fetch(new URL('./properties-view.html', import.meta.url))).text();
PropertiesView._template = tpl;

customElements.define('properties-view', PropertiesView);
