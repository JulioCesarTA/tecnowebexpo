import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

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
      bubbles: true, composed: true,
    }));
  }
}
customElements.define('evento-hijo', EventoHijo);


class EventsDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .caja    { background: #e8eaf6; border: 2px dashed #7986cb; padding: 14px; text-align: center; border-radius: 4px; }
        .log-box { background: #1e1e2e; padding: 8px 12px; max-height: 120px; overflow-y: auto; margin-top: 8px; }
        .log-line{ font-size: 12px; font-family: Consolas, monospace; color: #a6e3a1; line-height: 1.9; }
        .out     { padding: 8px 12px; background: #f5f6fa; border-left: 3px solid #3f51b5; font-size: 13px; margin-top: 8px; }
        .label   { font-size: 12px; color: #546e7a; font-weight: 600; }
      </style>
      <div class="grid">
        <div>
          <p style="font-size:12px;color:#546e7a;margin:0 0 8px">El hijo dispara con <code>composed: true</code>. El padre lo recibe via <code>on-hijo-click</code>:</p>
          <div class="caja">
            <evento-hijo on-hijo-click="_recibir"></evento-hijo>
          </div>
        </div>
        <div>
          <div class="label">Log del padre:</div>
          <div class="log-box">
            <template is="dom-repeat" items="[[eventos]]" as="ev">
              <div class="log-line">[[ev]]</div>
            </template>
          </div>
          <div class="out">Recibidos: <strong>[[eventos.length]]</strong></div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return { eventos: { type: Array, value: () => [] } };
  }

  _recibir(e) {
    this.unshift('eventos', `✓ ${e.detail.hora} — evento recibido`);
  }
}

customElements.define('events-demo', EventsDemo);
