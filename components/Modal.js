class Modal extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.getAttribute('open');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && this.open === 'true') {
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      this.render();
    }
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
              <label for="name_field">Title</label>
              <input type="text" id="name_field" class="nes-input">
            </div>

            <div class="nes-field">
              <label for="textarea_field">Textarea</label>
              <textarea id="textarea_field" class="nes-textarea"></textarea>
            </div>

            <div class="nes-field">
              <label>
                <input type="checkbox" class="nes-checkbox" checked />
                <span>Pin</span>
              </label>
            </div>
          </div>

          <div class="dialog-buttons">
            <button class="nes-btn">Cancel</button>
            <button class="nes-btn is-primary">Confirm</button>
          </div>
        </dialog>
      </section>
      `;
  }
}

customElements.define('c-modal', Modal);
