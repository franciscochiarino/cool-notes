class Overlay extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['is-modal-open'];
  }

  get isModalOpen() {
    return this.getAttribute('is-modal-open');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'is-modal-open') this.render();
  }

  render() {
    if (this.isModalOpen === 'false') return this.root.innerHTML = '';

    return this.root.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          z-index: 1;
        }
      </style>
    `;
  }
}

customElements.define('c-overlay', Overlay);
