import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../styles/shared-styles.js';

class LifecycleDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host  { display: block; background: #e8eaf6; border: 2px dashed #7986cb; padding: 16px; text-align: center; }
        .valor { font-size: 40px; font-weight: 800; color: #1a237e; }
        .info  { font-size: 12px; color: #607d8b; margin: 4px 0 10px; }
        button { padding: 6px 12px; background: #3f51b5; color: white; border: none; border-radius: 4px; cursor: pointer; }
      </style>
      <div class="valor">[[contador]]</div>
      <div class="info">Timer activo desde connectedCallback</div>
      <button on-click="_cambiarColor">Color: [[color]]</button>
    `;
  }

  static get properties() {
    return {
      contador: { type: Number, value: 0 },
      color:    { type: String, value: 'azul', observer: '_onColor' },
    };
  }

  ready() {
    super.ready();
    this._emit('ready() — Shadow DOM y props listos');
  }

  connectedCallback() {
    super.connectedCallback();
    this._emit('connectedCallback() — insertado en el DOM');
    this._timer = setInterval(() => { this.contador++; }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
    this._emit('disconnectedCallback() — removido, timer limpiado');
  }

  _onColor(nuevo, anterior) {
    if (anterior !== undefined) this._emit(`observer color: "${anterior}" → "${nuevo}"`);
  }

  _cambiarColor() {
    const cs = ['azul', 'rojo', 'verde', 'morado'];
    this.color = cs[(cs.indexOf(this.color) + 1) % cs.length];
  }

  _emit(msg) {
    this.dispatchEvent(new CustomEvent('lc-log', {
      detail: { msg, hora: new Date().toLocaleTimeString() },
      bubbles: true, composed: true,
    }));
  }
}
customElements.define('lifecycle-demo', LifecycleDemo);


class LifecycleView extends PolymerElement {
  static get properties() {
    return {
      montado:     { type: Boolean, value: false },
      logEntradas: { type: Array,   value: () => [] },
    };
  }

  _onLog(e) {
    const sub = e.detail.msg.startsWith('observer');
    this.unshift('logEntradas', {
      hora: e.detail.hora,
      msg:  e.detail.msg,
      css:  sub ? 'lc-sub' : 'lc-main',
    });
  }

  _montar()     { this.montado = true; }
  _desmontar()  { this.montado = false; }
  _limpiarLog() { this.set('logEntradas', []); }
  _vacio(n)     { return n === 0; }
}

const tpl = document.createElement('template');
tpl.innerHTML = await (await fetch(new URL('./lifecycle-view.html', import.meta.url))).text();
LifecycleView._template = tpl;

customElements.define('lifecycle-view', LifecycleView);
