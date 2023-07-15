class Badge extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['type'];
  }

  get type() {
    return this.getAttribute('type');
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');
      </style>

      <a href="#" class="nes-badge">
        ${this.type === 'pinned'
        ? '<span class="is-warning">pinned</span>'
        : '<span class="is-dark">other</span>'
      }
      </a>
      `;
  }
}

customElements.define('c-badge', Badge)
