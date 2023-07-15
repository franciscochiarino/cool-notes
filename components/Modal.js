class Modal extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['open', 'close-modal'];
  }

  get open() {
    return this.getAttribute('open');
  }

  set open(value) {
    this.setAttribute('open', value);
  }

  get closeModal() {
    return this.getAttribute('close-modal');
  }

  set closeModal(value) {
    this.setAttribute('close-modal', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && this.open === 'true') {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      this.render();
      this.bindEvents();
    }

    if (name === 'open' && this.open === 'false') {
      this.render();
    }
  }

  bindEvents() {
    this.cancelButton = this.root.querySelector('.cancel');
    this.confirmButton = this.root.querySelector('.confirm');

    this.cancelButton.addEventListener('click', () => this.handleCancelButtonClick());
    this.confirmButton.addEventListener('click', () => this.handleConfirmButtonClick());
  }

  handleCancelButtonClick() {
    this.open = 'false';
    document.body.style.backgroundColor = 'white';

    let closeModal =
      this.closeModal && typeof window[this.closeModal] === 'function'
        ? window[this.closeModal]
        : console.error('No close modal defined for this modal');

    closeModal();
  }

  handleConfirmButtonClick() {
    this.titleInput = this.root.querySelector('#title');
    this.textarea = this.root.querySelector('#textarea');
    this.checkbox = this.root.querySelector('.nes-checkbox');

    console.log(this.titleInput.value);
    console.log(this.textarea.value);
    console.log(this.checkbox.checked);
  }

  render() {
    if (this.open !== 'true') return this.root.innerHTML = '';

    return this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');

        dialog {
          z-index: 9999;
        }

        label,
        .dialog-content,
        .dialog-buttons {
          margin-top: 1.5rem;
        }

        .dialog-message {
          display: flex;
        }

        .dialog-buttons {
          text-align: center;
        }
      </style>

      <section>
        <dialog class="nes-dialog is-rounded" id="dialog-rounded" open="">
          <div class="dialog-message">
            <i class="nes-ash"></i>
            <div class="nes-balloon from-left">
              <p>Hey there my friend!</p>
            </div>
          </div>

          <div class="dialog-content">
            <div class="nes-field">
              <label for="title">Title</label>
              <input type="text" id="title" class="nes-input">
            </div>

            <div class="nes-field">
              <label for="textarea">Textarea</label>
              <textarea id="textarea" class="nes-textarea"></textarea>
            </div>

            <div class="nes-field">
              <label>
                <input type="checkbox" class="nes-checkbox" checked />
                <span>Pin</span>
              </label>
            </div>
          </div>

          <div class="dialog-buttons">
            <button class="nes-btn cancel">Cancel</button>
            <button class="nes-btn is-primary confirm">Confirm</button>
          </div>
        </dialog>
      </section>
      `;
  }
}

customElements.define('c-modal', Modal);
