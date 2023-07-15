import { getCallback } from '../utils.js';

class OpenModalButton extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.handleOnClick = this.handleOnClick.bind(this);
    this.render();

    this.button = this.root.querySelector('.open-modal');
    this.button.addEventListener('click', this.handleOnClick);
  }

  static get observedAttributes() {
    return ['open-modal'];
  }

  get openModal() {
    return this.getAttribute('open-modal');
  }

  set openModal(value) {
    this.setAttribute('open-modal', value);
  }

  handleOnClick() {
    this.openModalCallback = getCallback(this.openModal);

    this.openModalCallback();
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');
      </style>

      <button type="button" class="nes-btn is-primary open-modal">
        Create Note
      </button>
    `;
  }
}

customElements.define('c-open-modal-button', OpenModalButton)
