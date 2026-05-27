import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class HomeView extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .intro { background: #1a237e; padding: 22px; margin-bottom: 20px; color: white; }
        .intro h1 { font-size: 26px; font-weight: 800; margin: 0 0 6px; }
        .intro p  { font-size: 13px; opacity: 0.8; margin: 0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .card { background: white; padding: 14px; border-left: 4px solid var(--c, #3f51b5); }
        .card h3 { font-size: 13px; font-weight: 800; color: var(--c, #3f51b5); margin: 0 0 4px; }
        .card p  { font-size: 12px; color: #546e7a; margin: 0; }
        .card code { font-family: Consolas, monospace; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; background: white; font-size: 12px; }
        th { background: #f5f5f5; padding: 8px 12px; text-align: left; color: #546e7a; font-size: 11px; text-transform: uppercase; }
        td { padding: 8px 12px; border-bottom: 1px solid #f0f0f0; color: #37474f; }
        td:first-child { font-weight: 600; color: #1a237e; }
        .ok { color: #2e7d32; } .no { color: #b71c1c; }
      </style>

      <div class="intro">
        <h1>Polymer 3</h1>
        <p>Libreria de Google para construir Web Components reutilizables con estado reactivo, data binding y Shadow DOM.</p>
      </div>

      <div class="grid">
        <div class="card" style="--c:#3f51b5"><h3>Custom Elements</h3><p>Define tus propias etiquetas HTML. <code>customElements.define()</code></p></div>
        <div class="card" style="--c:#7c4dff"><h3>Shadow DOM</h3><p>Estilos y DOM aislados por componente. Ningun CSS externo los rompe.</p></div>
        <div class="card" style="--c:#00897b"><h3>Data Binding</h3><p><code>[[one-way]]</code> y <code>{{two-way}}</code> — la UI se actualiza sola.</p></div>
        <div class="card" style="--c:#e91e63"><h3>Properties</h3><p>Sistema declarativo con <code>computed</code>, <code>observer</code>, <code>notify</code>.</p></div>
        <div class="card" style="--c:#f57c00"><h3>Custom Events</h3><p>Comunicacion entre componentes con <code>composed: true</code>.</p></div>
        <div class="card" style="--c:#c2185b"><h3>Lifecycle Hooks</h3><p><code>ready()</code>, <code>connectedCallback()</code>, <code>disconnectedCallback()</code>.</p></div>
      </div>

      <table>
        <tr><th>Tarea</th><th>HTML5 puro</th><th>Polymer</th></tr>
        <tr><td>Actualizar texto</td><td class="no">querySelector + textContent manual</td><td class="ok">[[prop]] automatico</td></tr>
        <tr><td>Sincronizar input</td><td class="no">addEventListener + asignacion manual</td><td class="ok">{{prop::input}}</td></tr>
        <tr><td>Valor calculado</td><td class="no">Recalcular en cada cambio</td><td class="ok">computed: '_fn(a)'</td></tr>
        <tr><td>Aislar estilos</td><td class="no">attachShadow + innerHTML manual</td><td class="ok">Shadow DOM integrado</td></tr>
        <tr><td>Eventos entre componentes</td><td class="no">No cruzan Shadow DOM</td><td class="ok">composed: true</td></tr>
      </table>
    `;
  }
}
customElements.define('home-view', HomeView);
