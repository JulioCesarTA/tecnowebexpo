import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

// Router basado en window.location.hash — lee la ruta actual y escucha cambios
class AppRouter extends PolymerElement {
  static get template() {
    return html`<slot></slot>`;
  }

  static get properties() {
    return {
      // notify: true permite two-way binding con app-shell ({{ruta}})
      route: { type: String, value: 'home', notify: true },
    };
  }

  // Lifecycle: connectedCallback para registrar eventos del navegador
  connectedCallback() {
    super.connectedCallback();
    this._onHash = () => {
      this.route = window.location.hash.replace('#', '') || 'home';
    };
    window.addEventListener('hashchange', this._onHash);
    this._onHash(); // leer ruta inicial al montar
  }

  // Lifecycle: limpiar listeners al desmontar el elemento
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._onHash);
  }
}

customElements.define('app-router', AppRouter);
