import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

// Tarjeta reutilizable para mostrar info de una ventaja de Polymer
class FeatureCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host { display: block; }
        .card {
          background: white; border-radius: 12px; padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border-top: 4px solid var(--fc, #3f51b5);
          height: 100%;
        }
        .titulo {
          font-size: 15px; font-weight: 700; color: #1a237e;
          margin-bottom: 8px; display: flex; align-items: center; gap: 8px;
        }
        .icono { font-size: 20px; }
        .desc { font-size: 13px; color: #546e7a; line-height: 1.6; }
        .api {
          margin-top: 10px; font-size: 12px; font-family: Consolas, monospace;
          background: #f5f6fa; padding: 4px 10px; border-radius: 4px;
          color: #3f51b5; display: inline-block;
        }
      </style>

      <div class="card">
        <div class="titulo">
          <span class="icono">[[icono]]</span>
          [[titulo]]
        </div>
        <div class="desc">[[descripcion]]</div>
        <div class="api">[[api]]</div>
      </div>
    `;
  }

  static get properties() {
    return {
      titulo:      { type: String, value: '' },
      descripcion: { type: String, value: '' },
      icono:       { type: String, value: '' },
      api:         { type: String, value: '' },
    };
  }
}

customElements.define('feature-card', FeatureCard);
