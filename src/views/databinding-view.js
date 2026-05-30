import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles.js';

class DatabindingView extends PolymerElement {
  static get properties() {
    return {
      nombre:    { type: String, value: '' },
      _twoway:   { type: String, value: '{{nombre::input}}' },
      _nameCode: { type: String, value: '[[nombre]]' },
    };
  }
}

const tpl = document.createElement('template');
tpl.innerHTML = await (await fetch(new URL('./databinding-view.html', import.meta.url))).text();
DatabindingView._template = tpl;

customElements.define('databinding-view', DatabindingView);
