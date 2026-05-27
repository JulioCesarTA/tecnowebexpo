import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../styles/shared-styles.js';

class LifecycleDemo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; background: #e8eaf6; border: 2px dashed #7986cb; padding: 16px; text-align: center; }
        .valor { font-size: 40px; font-weight: 800; color: #1a237e; }
        .info  { font-size: 12px; color: #607d8b; margin: 4px 0 10px; }
        button { padding: 6px 12px; background: #3f51b5; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
      </style>
      <div class="valor">[[contador]]</div>
      <div class="info">Timer activo desde connectedCallback</div>
      <button on-click="_cambiar">Cambiar color: [[color]]</button>
    `;
  }

  static get properties() {
    return {
      contador: { type: Number, value: 0 },
      color:    { type: String, value: 'azul', observer: '_onColor' },
    };
  }

  ready()              { super.ready();              this._emit('ready() — Shadow DOM y props listos'); }
  connectedCallback()  { super.connectedCallback();  this._emit('connectedCallback() — en el DOM, timer iniciado'); this._timer = setInterval(() => { this.contador++; }, 1000); }
  disconnectedCallback() { super.disconnectedCallback(); clearInterval(this._timer); this._emit('disconnectedCallback() — removido, timer limpiado'); }

  _onColor(nuevo, anterior) { if (anterior !== undefined) this._emit(`observer color: "${anterior}" → "${nuevo}"`); }
  _cambiar() { const cs = ['azul','rojo','verde','morado']; this.color = cs[(cs.indexOf(this.color)+1)%cs.length]; }
  _emit(msg) { this.dispatchEvent(new CustomEvent('lc-log', { detail: { msg, hora: new Date().toLocaleTimeString() }, bubbles: true, composed: true })); }
}
customElements.define('lifecycle-demo', LifecycleDemo);


class LifecycleView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        .log { max-height: 200px; overflow-y: auto; background: #1e1e2e; padding: 10px 12px; }
        .ll  { font-size: 12px; font-family: Consolas, monospace; line-height: 1.9; }
        .lc-h    { color: #6c7086; }
        .lc-main { color: #cba6f7; }
        .lc-sub  { color: #89b4fa; }
        .empty { text-align: center; color: #9e9e9e; padding: 14px; background: #f5f5f5; font-size: 13px; }
      </style>

      <h1>Lifecycle Hooks</h1>
      <p class="sub">Metodos que Polymer ejecuta en momentos clave: creacion, montaje, desmontaje y cambios de atributos.</p>

      <div class="puntos">
        <div class="punto" style="--pc:#1565c0"><b>Donde se usa</b><p>En cualquier componente donde necesites ejecutar codigo en un momento concreto: al crearse, al insertarse en el DOM, al quitarse, o cuando una propiedad cambia.</p></div>
        <div class="punto" style="--pc:#00897b"><b>Como se usa</b><p>Sobreescribes el metodo que necesitas y siempre llamas <code>super.metodo()</code> primero. <code>ready()</code> para setup inicial, <code>connectedCallback()</code> para timers o fetch, <code>disconnectedCallback()</code> para limpiarlos.</p></div>
        <div class="punto" style="--pc:#6a1b9a"><b>Que hace</b><p>Te da control total sobre cada etapa. <code>ready()</code> garantiza que el Shadow DOM y las properties estan 100% listos antes de ejecutar tu codigo. <code>disconnectedCallback()</code> evita memory leaks al limpiar timers y listeners.</p></div>
        <div class="punto" style="--pc:#e65100"><b>vs HTML5 puro</b><p>HTMLElement no tiene <code>ready()</code>. El <code>connectedCallback</code> nativo puede ejecutarse antes de que las props esten inicializadas, obligandote a hacer checks manuales antes de usar cualquier dato.</p></div>
      </div>

      <div class="cmp">
        <div class="bloque v">
          <div class="bh">HTML5 puro</div>
          <pre><span class="kw">class</span> MiElem <span class="kw">extends</span> HTMLElement {
  connectedCallback() {
    <span class="cm">// props pueden NO estar listas</span>
    <span class="kw">this</span>.<span class="fn">render</span>(); <span class="cm">// render manual</span>
  }
}</pre>
        </div>
        <div class="bloque p">
          <div class="bh">Polymer</div>
          <pre><span class="kw">class</span> MiElem <span class="kw">extends</span> PolymerElement {
  <span class="fn">ready</span>() {           <span class="cm">// exclusivo Polymer</span>
    <span class="kw">super</span>.<span class="fn">ready</span>();    <span class="cm">// siempre llamar super</span>
    <span class="cm">// Shadow DOM + props 100% listos</span>
  }
  <span class="fn">connectedCallback</span>() {
    <span class="kw">super</span>.<span class="fn">connectedCallback</span>();
    <span class="cm">// iniciar timer, fetch...</span>
  }
}</pre>
        </div>
      </div>

      <div class="demo">
        <div class="dt">Demo interactivo</div>
        <div class="grid">
          <div>
            <div class="btns" style="margin-bottom:10px">
              <button style="background:#3f51b5;color:white" on-click="_montar">Montar</button>
              <button style="background:#ffebee;color:#c62828" on-click="_desmontar">Desmontar</button>
              <button style="background:#e8eaf6;color:#3f51b5" on-click="_limpiarLog">Limpiar</button>
            </div>
            <div on-lc-log="_onLog">
              <template is="dom-if" if="[[montado]]"><lifecycle-demo></lifecycle-demo></template>
              <template is="dom-if" if="[[!montado]]"><div class="empty">Pulsa "Montar" para ver el lifecycle</div></template>
            </div>
          </div>
          <div>
            <div style="font-size:12px;color:#546e7a;font-weight:600;margin-bottom:6px">Log del ciclo de vida:</div>
            <div class="log">
              <template is="dom-repeat" items="[[logEntradas]]" as="e">
                <div class="ll"><span class="lc-h">[[e.hora]] </span><span class$="[[e.css]]">[[e.msg]]</span></div>
              </template>
              <template is="dom-if" if="[[_vacio(logEntradas.length)]]">
                <div class="ll lc-h">Monta el componente para ver eventos...</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      montado:     { type: Boolean, value: false },
      logEntradas: { type: Array,   value: () => [] },
    };
  }

  _onLog(e) {
    const sub = e.detail.msg.startsWith('observer');
    this.unshift('logEntradas', { hora: e.detail.hora, msg: e.detail.msg, css: sub ? 'lc-sub' : 'lc-main' });
  }

  _montar()     { this.montado = true; }
  _desmontar()  { this.montado = false; }
  _limpiarLog() { this.set('logEntradas', []); }
  _vacio(n)     { return n === 0; }
}
customElements.define('lifecycle-view', LifecycleView);
