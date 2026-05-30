import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

class LifecycleInner extends PolymerElement {
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
customElements.define('lifecycle-inner', LifecycleInner);


class LifecycleDemoView extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host  { display: block; }
        .grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btns  { display: flex; gap: 6px; margin-bottom: 10px; }
        button { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
        .log   { max-height: 180px; overflow-y: auto; background: #1e1e2e; padding: 10px 12px; }
        .ll    { font-size: 12px; font-family: Consolas, monospace; line-height: 1.9; }
        .lc-h  { color: #6c7086; }
        .lc-main { color: #cba6f7; }
        .lc-sub  { color: #89b4fa; }
        .empty { text-align: center; color: #9e9e9e; padding: 14px; background: #f5f5f5; font-size: 13px; }
        .label { font-size: 12px; color: #546e7a; font-weight: 600; margin-bottom: 6px; }
      </style>
      <div class="grid">
        <div>
          <div class="btns">
            <button style="background:#3f51b5;color:white"   on-click="_montar">Montar</button>
            <button style="background:#ffebee;color:#c62828" on-click="_desmontar">Desmontar</button>
            <button style="background:#e8eaf6;color:#3f51b5" on-click="_limpiar">Limpiar log</button>
          </div>
          <div on-lc-log="_onLog">
            <template is="dom-if" if="[[montado]]"><lifecycle-inner></lifecycle-inner></template>
            <template is="dom-if" if="[[!montado]]"><div class="empty">Pulsa "Montar" para ver el lifecycle</div></template>
          </div>
        </div>
        <div>
          <div class="label">Log del ciclo de vida:</div>
          <div class="log">
            <template is="dom-repeat" items="[[log]]" as="e">
              <div class="ll"><span class="lc-h">[[e.hora]] </span><span class$="[[e.css]]">[[e.msg]]</span></div>
            </template>
            <template is="dom-if" if="[[_vacio(log.length)]]">
              <div class="ll lc-h">Monta el componente para ver los eventos...</div>
            </template>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      montado: { type: Boolean, value: false },
      log:     { type: Array,   value: () => [] },
    };
  }

  _onLog(e) {
    const sub = e.detail.msg.startsWith('observer');
    this.unshift('log', { hora: e.detail.hora, msg: e.detail.msg, css: sub ? 'lc-sub' : 'lc-main' });
  }

  _montar()   { this.montado = true; }
  _desmontar(){ this.montado = false; }
  _limpiar()  { this.set('log', []); }
  _vacio(n)   { return n === 0; }
}

customElements.define('lifecycle-demo-view', LifecycleDemoView);
