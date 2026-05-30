import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class TarjetaUsuario extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .card { background: white; border-radius: 12px; padding: 24px; width: 200px; 
        border-top: 5px solid var(--color, #3f51b5); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--color, #3f51b5); 
        color: white; font-size: 22px; font-weight: 700; display: flex; align-items: center; 
        justify-content: center; margin-bottom: 12px; }
        .nombre { font-size: 16px; font-weight: 700; color: #1a237e; margin-bottom: 4px; }
        .rol { font-size: 12px; color: #607d8b; }
      </style>
      <div class="card" style="--color: [[color]]">
        <div class="avatar">[[_inicial(nombre)]]</div>
        <div class="nombre">[[nombre]]</div>
        <div class="rol">[[rol]]</div>
      </div>
    `;
  }
  static get properties() {
    return {
      nombre: { type: String, value: '' },
      rol:    { type: String, value: '' },
      color:  { type: String, value: '#3f51b5' },
    };
  }
  _inicial(nombre) { return nombre ? nombre[0].toUpperCase() : '?'; }
}

customElements.define('tarjeta-usuario', TarjetaUsuario);

