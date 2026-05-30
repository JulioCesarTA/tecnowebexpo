import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class NavbarComponent extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; background: #1a237e; width: 220px; min-height: 100vh; flex-shrink: 0; padding: 0 0 24px 0; }
        .logo { padding: 22px 20px 18px; font-size: 18px; font-weight: 800; color: white; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 8px; }
        .logo span { color: #7986cb; }
        .seccion { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #5c6bc0; padding: 14px 20px 6px; }
        a { display: flex; align-items: center; gap: 10px; padding: 11px 20px; color: #9fa8da; text-decoration: none; font-size: 14px; border-left: 3px solid transparent; }
        a:hover { background: rgba(255,255,255,0.06); color: white; }
        a.activo { background: rgba(121,134,203,0.18); color: white; border-left-color: #7986cb; font-weight: 600; }
        .ic { font-size: 15px; width: 20px; text-align: center; }
      </style>

      <div class="logo">Polymer <span>3</span></div>

      <div class="seccion">Ventajas</div>
      <a href="custom-elements.html" class$="[[_cls('custom-elements', ruta)]]"><span class="ic">⬡</span> Custom Elements</a>
      <a href="databinding.html"     class$="[[_cls('databinding',     ruta)]]"><span class="ic">↔</span> Data Binding</a>
      <a href="properties.html"      class$="[[_cls('properties',      ruta)]]"><span class="ic">#</span> Properties</a>
      <a href="events.html"          class$="[[_cls('events',          ruta)]]"><span class="ic">→</span> Events</a>
      <a href="lifecycle.html"       class$="[[_cls('lifecycle',       ruta)]]"><span class="ic">◎</span> Lifecycle</a>
    `;
  }

  static get properties() {
    return { ruta: { type: String } };
  }

  _cls(vista, ruta) { return ruta === vista ? 'activo' : ''; }
}

customElements.define('navbar-component', NavbarComponent);
