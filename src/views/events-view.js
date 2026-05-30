import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../styles/shared-styles.js';

class EventoHijo extends PolymerElement {
  static get template() {
    return html`
      <button style="padding:8px 16px;background:#3f51b5;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:600"
              on-click="_disparar">Disparar evento</button>
    `;
  }

  _disparar() {
    this.dispatchEvent(new CustomEvent('hijo-click', {
      detail: { hora: new Date().toLocaleTimeString() },
      bubbles: true,
      composed: true,
    }));
  }
}
customElements.define('evento-hijo', EventoHijo);


class EventsView extends PolymerElement {
  static get properties() {
    return {
      eventos: { type: Array, value: () => [] },
    };
  }

  _recibir(e) {
    this.unshift('eventos', `✓ ${e.detail.hora} — evento recibido`);
  }
}

const tpl = document.createElement('template');
tpl.innerHTML = await (await fetch(new URL('./events-view.html', import.meta.url))).text();
EventsView._template = tpl;

customElements.define('events-view', EventsView);
