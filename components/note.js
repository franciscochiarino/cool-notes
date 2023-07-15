import { getCallback, getLocalStorage, setLocalStorage } from '../utils.js';
class Note extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.notes = getLocalStorage('notes');
    this.handlePinButtonClick = this.handlePinButtonClick.bind(this);
    this.render();
    this.assignCallbacks();

    this.pinButtons = this.root.querySelectorAll('button.is-success');
    this.deleteButtons = this.root.querySelectorAll('button.is-error');
    this.bindEvents();
  }

  static get observedAttributes() {
    return ['id', 'pinned', 'delete-note', 'update-note-groups'];
  }

  get id() {
    return this.getAttribute('id');
  }

  get pinned() {
    return this.getAttribute('pinned');
  }

  set pinned(value) {
    this.setAttribute('pinned', value);
  }

  get deleteNote() {
    return this.getAttribute('delete-note');
  }

  set deleteNote(value) {
    this.setAttribute('delete-note', value);
  }

  get updateNoteGroups() {
    return this.getAttribute('update-note-groups');
  }

  set updateNoteGroups(value) {
    this.setAttribute('update-note-groups', value);
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'pinned') this.togglePinButtonText(newValue);
  }

  assignCallbacks() {
    this.updateNoteGroupsCallback = getCallback(this.updateNoteGroups);
    this.deleteNoteCallback = getCallback(this.deleteNote);
  }

  updateNoteAndNoteGroups = (id, attributes) => {
    const note = this.notes.find(note => note.id === id);
    Object.assign(note, attributes);
    setLocalStorage(this.notes);

    this.updateNoteGroupsCallback(this.notes);
  };

  togglePinButtonText(newValue) {
    const pinButton = this.shadowRoot.querySelector('button.is-success');

    newValue === 'true' ? pinButton.innerText = 'Unpin' : pinButton.innerText = 'Pin';
  }

  handlePinButtonClick() {
    const nextPinnedState = this.pinned === 'true' ? 'false' : 'true';

    this.pinned = nextPinnedState;
    this.updateNoteAndNoteGroups(this.id, { pinned: nextPinnedState });
  }

  handleDeleteButtonClick(e) {
    this.deleteNoteCallback(e, this.id);
  }

  bindEvents() {
    this.pinButtons.forEach((pinButton) => {
      pinButton.addEventListener('click', (e) => {
        this.handlePinButtonClick(e)
      });
    });

    this.deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', (e) => {
        this.handleDeleteButtonClick(e);
      });
    });
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');

        .c-note {
          width: 350px;
        }

      </style>

      <div class="c-note">
        <div class="nes-container is-rounded">
          <slot name="title"></slot>
          <slot name="description"></slot>

          <button type="button" class="nes-btn is-success"></button>
          <button type="button" class="nes-btn is-error">Delete</button>
        </div>
      </div>
    `;
  }
}

customElements.define('c-note', Note)
