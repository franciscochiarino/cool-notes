import { notes } from '../database.js';

const template = document.createElement('template');
template.innerHTML = `
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

class Note extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(template.content.cloneNode(true));

    this.toogglePinned = this.toogglePinned.bind(this);

    const pinButtons = root.querySelectorAll('button.is-success');
    const deleteButtons = root.querySelectorAll('button.is-error');

    pinButtons.forEach((pinButton) => {
      pinButton.addEventListener('click', (e) => {
        this.toogglePinned(e)
      });
    });

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', (e) => {
        let remove =
          this.remove && typeof window[this.remove] === 'function'
            ? window[this.remove]
            : this.removeFallback;

        remove(e);
      });
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pinned') {
      const pinButton = this.shadowRoot.querySelector('button.is-success');

      if (newValue === 'true')
        pinButton.innerText = 'Unpin';
      else
        pinButton.innerText = 'Pin';
    }
  }

  updateNote = (id, attributes) => {
    const note = notes.find(note => note.id === id);
    Object.assign(note, attributes);

    let updateNoteGroups =
      this.updateNoteGroups && typeof window[this.updateNoteGroups] === 'function'
        ? window[this.updateNoteGroups]
        : this.updateNoteGroupsFallback;

    updateNoteGroups(notes);
  };

  toogglePinned() {
    const nextPinnedState = this.pinned === 'true' ? 'false' : 'true';

    this.pinned = nextPinnedState;
    this.updateNote(parseInt(this.id), { pinned: nextPinnedState });
  }

  removeFallback() {
    console.error('No delete defined for this note');
  }

  updateNoteGroupsFallback() {
    console.error('No update note group defined for this note');
  }

  static get observedAttributes() {
    return ['pinned', 'remove', 'id', 'update-note-groups'];
  }

  get pinned() {
    return this.getAttribute('pinned');
  }

  set pinned(value) {
    this.setAttribute('pinned', value);
  }

  get remove() {
    return this.getAttribute('remove');
  }

  set remove(value) {
    this.setAttribute('remove', value);
  }

  get id() {
    return this.getAttribute('id');
  }

  get updateNoteGroups() {
    return this.getAttribute('update-note-groups');
  }

  set updateNoteGroups(value) {
    this.setAttribute('update-note-groups', value);
  }
}

customElements.define('c-note', Note)
