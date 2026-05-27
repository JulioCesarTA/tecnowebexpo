import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles.js';

class DatabindingView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        .out.warning { border-left-color: #e65100; background: #fff8e1; }
        .out.error   { border-left-color: #c62828; background: #ffebee; }
      </style>

      <h1>Data Binding</h1>
      <p class="sub">Sincronizacion automatica entre datos JavaScript y la UI sin tocar el DOM.</p>

      <div class="puntos">
        <div class="punto" style="--pc:#1565c0"><b>Donde se usa</b><p>En el HTML del template: en texto con <code>[[]]</code>, en atributos con <code>attr$="[[]]"</code>, y en inputs con <code>{{::input}}</code>.</p></div>
        <div class="punto" style="--pc:#00897b"><b>Como se usa</b><p><code>[[prop]]</code> solo lee el valor (el dato va del JS al DOM). <code>{{prop::input}}</code> lo sincroniza: si el usuario escribe, la propiedad se actualiza sola.</p></div>
        <div class="punto" style="--pc:#6a1b9a"><b>Que hace</b><p>Cada vez que cambia una propiedad, Polymer actualiza todos los lugares del template donde aparece. No tienes que tocar el DOM.</p></div>
        <div class="punto" style="--pc:#e65100"><b>vs HTML5 puro</b><p>En vanilla tienes que escuchar el evento, leer el valor y asignarlo a cada elemento a mano. Con Polymer es automatico y declarativo.</p></div>
      </div>

      <div class="cmp">
        <div class="bloque v">
          <div class="bh">HTML5 puro</div>
          <pre><span class="kw">const</span> input = document.<span class="fn">querySelector</span>(<span class="str">'#inp'</span>);
<span class="kw">const</span> out   = document.<span class="fn">querySelector</span>(<span class="str">'#out'</span>);
input.<span class="fn">addEventListener</span>(<span class="str">'input'</span>, () => {
  out.textContent = input.value; <span class="cm">// manual</span>
});</pre>
        </div>
        <div class="bloque p">
          <div class="bh">Polymer</div>
          <pre><span class="cm">&lt;!-- two-way: dos inputs siempre sincronizados --&gt;</span>
<span class="tag">&lt;input</span> <span class="at">value=</span><span class="str">"{{nombre::input}}"</span><span class="tag">&gt;</span>
<span class="tag">&lt;input</span> <span class="at">value=</span><span class="str">"{{nombre::input}}"</span><span class="tag">&gt;</span>
<span class="tag">&lt;p&gt;</span>Hola, [[nombre]]<span class="tag">&lt;/p&gt;</span></pre>
        </div>
      </div>

      <div class="demo">
        <div class="dt">Demo interactivo</div>
        <div class="grid">
          <div>
            <label>[[one-way]] — escribe aqui:</label>
            <input type="text" value="{{textoA::input}}" placeholder="Escribe...">
            <div class="out">Hola, <strong>[[_nombre(textoA)]]</strong></div>
          </div>
          <div>
            <label>{{two-way}} — Input A:</label>
            <input type="text" value="{{textoB::input}}" placeholder="Input A...">
            <label style="margin-top:8px">Input B (sincronizado):</label>
            <input type="text" value="{{textoB::input}}" placeholder="Input B...">
            <div class="out">Valor: <strong>[[textoB]]</strong></div>
          </div>
        </div>
        <div style="margin-top:14px">
          <label>class$="[[nivel]]" — cambia la clase del div:</label>
          <div class="btns">
            <button style="background:#e3f2fd;color:#1565c0" on-click="_nivel" data-v="info">Info</button>
            <button style="background:#fff8e1;color:#e65100" on-click="_nivel" data-v="warning">Advertencia</button>
            <button style="background:#ffebee;color:#c62828" on-click="_nivel" data-v="error">Error</button>
          </div>
          <div class$="out [[nivel]]" style="margin-top:8px">Clase activa: <strong>[[nivel]]</strong></div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      textoA: { type: String, value: '' },
      textoB: { type: String, value: '' },
      nivel:  { type: String, value: 'info' },
    };
  }

  _nombre(t) { return t || 'mundo'; }
  _nivel(e)  { this.nivel = e.target.dataset.v; }
}
customElements.define('databinding-view', DatabindingView);
