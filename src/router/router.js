import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class AppRouter extends PolymerElement {
  static get properties() {
    return {
      route: { type: String, value: 'databinding', notify: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._onHash = () => {
      this.route = window.location.hash.replace('#', '') || 'databinding';
    };
    window.addEventListener('hashchange', this._onHash);
    this._onHash();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._onHash);
  }
}

customElements.define('app-router', AppRouter);
