import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../styles/shared-styles.js';

class EventoHijo extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .caja { background: #e8eaf6; border: 2px dashed #7986cb; padding: 14px; text-align: center; }
        button { padding: 7px 14px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: 600; margin: 3px; }
        .ok  { background: #3f51b5; color: white; }
        .bad { background: #ffebee; color: #c62828; }
      </style>
      <div class="caja">
        <button class="ok"  on-click="_ok">Disparar (composed: true)</button>
        <button class="bad" on-click="_bad">Sin composed (bloqueado)</button>
      </div>
    `;
  }

  _ok()  { this.dispatchEvent(new CustomEvent('hijo-click', { detail: { ok: true,  hora: new Date().toLocaleTimeString() }, bubbles: true, composed: true  })); }
  _bad() { this.dispatchEvent(new CustomEvent('hijo-click', { detail: { ok: false, hora: new Date().toLocaleTimeString() }, bubbles: true, composed: false })); }
}
customElements.define('evento-hijo', EventoHijo);


class EventsView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        .log { max-height: 160px; overflow-y: auto; background: #1e1e2e; padding: 10px 12px; margin-top: 8px; }
        .ev-ok  { font-size: 12px; font-family: Consolas, monospace; color: #a6e3a1; line-height: 1.9; }
        .ev-bad { font-size: 12px; font-family: Consolas, monospace; color: #f38ba8; line-height: 1.9; }
      </style>

      <h1>Custom Events</h1>
      <p class="sub">Comunicacion entre componentes. <strong>composed: true</strong> permite cruzar el Shadow DOM.</p>

      <div class="puntos">
        <div class="punto" style="--pc:#1565c0"><b>Donde se usa</b><p>Cuando un componente hijo necesita comunicar algo al padre: un boton presionado, un valor cambiado, una operacion completada. El hijo dispara, el padre escucha.</p></div>
        <div class="punto" style="--pc:#00897b"><b>Como se usa</b><p>El hijo llama <code>dispatchEvent(new CustomEvent('nombre', &#123; bubbles: true, composed: true &#125;))</code>. El padre lo recibe declarando <code>on-nombre="_handler"</code> directamente en el template, sin buscar el elemento.</p></div>
        <div class="punto" style="--pc:#6a1b9a"><b>Que hace</b><p><code>composed: true</code> permite que el evento salga del Shadow DOM del hijo y suba por el arbol hasta el padre. Sin esto, el evento queda atrapado dentro del componente y el padre nunca lo recibe.</p></div>
        <div class="punto" style="--pc:#e65100"><b>vs HTML5 puro</b><p>En vanilla los eventos normales no cruzan el Shadow DOM. Tienes que obtener una referencia directa al hijo con <code>querySelector</code> y agregarle un listener manualmente desde el padre.</p></div>
      </div>

      <div class="cmp">
        <div class="bloque v">
          <div class="bh">HTML5 puro</div>
          <pre><span class="cm">// Padre necesita referencia directa</span>
<span class="kw">const</span> hijo = <span class="kw">this</span>.shadowRoot
  .<span class="fn">querySelector</span>(<span class="str">'evento-hijo'</span>);
hijo.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, handler);</pre>
        </div>
        <div class="bloque p">
          <div class="bh">Polymer</div>
          <pre><span class="cm">// Hijo:</span>
<span class="kw">this</span>.<span class="fn">dispatchEvent</span>(<span class="kw">new</span> <span class="fn">CustomEvent</span>(<span class="str">'hijo-click'</span>, {
  bubbles: <span class="kw">true</span>, composed: <span class="kw">true</span>,
}));
<span class="cm">// Padre (declarativo):</span>
<span class="tag">&lt;evento-hijo</span> <span class="at">on-hijo-click=</span><span class="str">"_handler"</span><span class="tag">&gt;&lt;/evento-hijo&gt;</span></pre>
        </div>
      </div>

      <div class="demo">
        <div class="dt">Demo interactivo</div>
        <div class="grid">
          <div>
            <p style="font-size:12px;color:#546e7a;margin:0 0 8px">El hijo dispara el evento. El padre lo recibe via <code>on-hijo-click</code>:</p>
            <evento-hijo on-hijo-click="_recibir"></evento-hijo>
          </div>
          <div>
            <div style="font-size:12px;color:#546e7a;font-weight:600">Log del padre:</div>
            <div class="log">
              <template is="dom-repeat" items="[[eventos]]" as="ev">
                <div class$="[[ev.css]]">[[ev.texto]]</div>
              </template>
              <template is="dom-if" if="[[_vacio(eventos.length)]]">
                <div class="ev-ok" style="color:#6c7086">Esperando eventos...</div>
              </template>
            </div>
            <div class="out">Recibidos: <strong>[[eventos.length]]</strong></div>
            <button style="background:#e8eaf6;color:#3f51b5;margin-top:8px" on-click="_limpiar">Limpiar log</button>
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return { eventos: { type: Array, value: () => [] } };
  }

  _recibir(e) {
    const ok = e.detail.ok;
    this.unshift('eventos', {
      texto: ok ? `✓ ${e.detail.hora} — composed:true recibido` : `✗ ${e.detail.hora} — BLOQUEADO`,
      css: ok ? 'ev-ok' : 'ev-bad',
    });
  }

  _limpiar() { this.set('eventos', []); }
  _vacio(n)  { return n === 0; }
}
customElements.define('events-view', EventsView);
