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
    return ['action'];
  }

  get action() {
    return this.getAttribute('action');
  }

  set action(value) {
    this.setAttribute('action', value);
  }

  handleOnClick() {
    let openModal =
      this.action && typeof window[this.action] === 'function'
        ? window[this.action]
        : console.error('No action defined for this button');

    openModal();
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
