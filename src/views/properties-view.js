import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../styles/shared-styles.js';

class PropertiesView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        .big { font-size: 64px; font-weight: 800; color: #1a237e; text-align: center; }
        .btns { justify-content: center; margin-bottom: 10px; }
        .card { border-left: 4px solid var(--c, #3f51b5); padding: 10px 12px; background: #f8f9ff; margin-bottom: 8px; }
        .card-title { font-family: Consolas, monospace; font-size: 12px; font-weight: 700; color: #3f51b5; margin-bottom: 3px; }
        .card-desc { font-size: 12px; color: #546e7a; }
        .log-box { background: #1e1e2e; padding: 8px 12px; max-height: 90px; overflow-y: auto; margin-top: 4px; }
        .log-line { font-size: 12px; font-family: Consolas, monospace; color: #a6e3a1; line-height: 1.8; }
      </style>

      <h1>Properties</h1>
      <p class="sub">Sistema declarativo con tipo, valor, computed, observer, notify y readOnly.</p>

      <div class="puntos">
        <div class="punto" style="--pc:#1565c0"><b>Donde se usa</b><p>En <code>static get properties()</code>. Toda propiedad que quieras que sea reactiva — que actualice el DOM al cambiar — tiene que declararse ahi.</p></div>
        <div class="punto" style="--pc:#00897b"><b>Como se usa</b><p>Cada propiedad es un objeto con claves opcionales: <code>type</code> fuerza el tipo, <code>value</code> pone el valor inicial, <code>observer</code> llama una funcion al cambiar, y <code>computed</code> calcula el valor derivado automaticamente.</p></div>
        <div class="punto" style="--pc:#6a1b9a"><b>Que hace</b><p>Polymer observa esas propiedades y cuando cambian actualiza el DOM, recalcula los <code>computed</code> y ejecuta los <code>observer</code>. Todo sin que escribas nada extra.</p></div>
        <div class="punto" style="--pc:#e65100"><b>vs HTML5 puro</b><p>En vanilla necesitas getters/setters manuales para detectar cambios, llamar <code>render()</code> a mano y recalcular los valores derivados en cada setter. Mucho codigo repetido.</p></div>
      </div>

      <div class="cmp">
        <div class="bloque v">
          <div class="bh">HTML5 puro</div>
          <pre><span class="kw">set</span> <span class="fn">contador</span>(val) {
  <span class="kw">this</span>._cnt = Number(val);  <span class="cm">// tipo manual</span>
  <span class="kw">this</span>.<span class="fn">render</span>();           <span class="cm">// DOM manual</span>
  <span class="kw">this</span>._doble = val * <span class="pn">2</span>;   <span class="cm">// computed manual</span>
}</pre>
        </div>
        <div class="bloque p">
          <div class="bh">Polymer</div>
          <pre>contador: {
  type: Number,     <span class="cm">// fuerza tipo numerico</span>
  value: <span class="pn">0</span>,         <span class="cm">// valor inicial</span>
  observer: <span class="str">'_onChange'</span> <span class="cm">// llama fn al cambiar</span>
},

doble: {
  computed: <span class="str">'_doble(contador)'</span> <span class="cm">// se recalcula solo</span>
}</pre>
        </div>
      </div>

      <div class="demo">
        <div class="dt">Demo interactivo</div>
        <div class="grid">
          <div>
            <div class="big">[[contador]]</div>
            <div class="btns">
              <button style="background:#ffebee;color:#c62828" on-click="_menos">− Restar</button>
              <button style="background:#e8eaf6;color:#3f51b5" on-click="_reset">Reset</button>
              <button style="background:#3f51b5;color:white"   on-click="_mas">+ Sumar</button>
            </div>
            <div class="out">Doble: <strong>[[doble]]</strong> &nbsp;|&nbsp; Triple: <strong>[[triple]]</strong></div>
            <div class="out">typeof: <strong>[[tipo]]</strong> &nbsp;|&nbsp; readOnly: <strong>[[ultimoValor]]</strong></div>
          </div>
          <div>
            <div class="card" style="--c:#f57c00">
              <div class="card-title">observer: '_onContadorChange'</div>
              <div class="card-desc">Log de cambios:</div>
              <div class="log-box">
                <template is="dom-repeat" items="[[log]]" as="e">
                  <div class="log-line">[[e]]</div>
                </template>
              </div>
            </div>
            <div class="card" style="--c:#7c4dff">
              <div class="card-title">reflectToAttribute: true</div>
              <div class="out" style="font-family:Consolas;font-size:11px">&lt;properties-view contador="[[contador]]"&gt;</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      contador:    { type: Number, value: 0, notify: true, reflectToAttribute: true, observer: '_onContadorChange' },
      doble:       { type: Number, computed: '_doble(contador)' },
      triple:      { type: Number, computed: '_triple(contador)' },
      tipo:        { type: String, computed: '_tipo(contador)' },
      ultimoValor: { type: Number, readOnly: true, value: 0 },
      log:         { type: Array,  value: () => ['Esperando cambios...'] },
    };
  }

  _doble(c)  { return c * 2; }
  _triple(c) { return c * 3; }
  _tipo(c)   { return typeof c; }

  _onContadorChange(nuevo, anterior) {
    if (anterior === undefined) return;
    this.unshift('log', `${anterior} → ${nuevo}  (doble: ${nuevo * 2})`);
    if (this.log.length > 5) this.pop('log');
    this._setUltimoValor(anterior);
  }

  _mas()   { this.contador++; }
  _menos() { this.contador--; }
  _reset() { this.contador = 0; }
}
customElements.define('properties-view', PropertiesView);
