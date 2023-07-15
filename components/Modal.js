import { setLocalStorage, getLocalStorage, randomId, getCallback } from "../utils.js";

class Modal extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['open', 'hide-overlay', 'update-note-groups'];
  }

  get open() {
    return this.getAttribute('open');
  }

  set open(value) {
    this.setAttribute('open', value);
  }

  get hideOverlay() {
    return this.getAttribute('hide-overlay');
  }

  set hideOverlay(value) {
    this.setAttribute('hide-overlay', value);
  }

  get updateNoteGroups() {
    return this.getAttribute('update-note-groups');
  }

  set updateNoteGroups(value) {
    this.setAttribute('update-note-groups', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && this.open === 'true') {
      this.render();
      this.bindEvents();
      this.assignCallbacks();
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

  assignCallbacks() {
    this.hideOverlayCallback = getCallback(this.hideOverlay);
    this.updateNoteGroupsCallback = getCallback(this.updateNoteGroups);
  }

  handleCancelButtonClick() {
    this.open = 'false';
    this.hideOverlayCallback();
  }

  handleConfirmButtonClick() {
    this.titleInput = this.root.querySelector('#title');
    this.textarea = this.root.querySelector('#textarea');
    this.checkbox = this.root.querySelector('.nes-checkbox');

    let newNote = {
      id: randomId(),
      title: this.titleInput.value,
      description: this.textarea.value,
      pinned: this.checkbox.checked.toString()
    };

    this.notes = getLocalStorage('notes');
    this.notes.push(newNote);
    setLocalStorage(this.notes);

    this.updateNoteGroupsCallback(this.notes);
    this.open = 'false';
    this.hideOverlayCallback();
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
              <p>Have fun creating notes!</p>
            </div>
          </div>

          <div class="dialog-content">
            <div class="nes-field">
              <label for="title">Title</label>
              <input type="text" id="title" class="nes-input">
            </div>

            <div class="nes-field">
              <label for="textarea">Description</label>
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
