class Note extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.notes = JSON.parse(localStorage.getItem('notes'));
    this.handlePinButtonClick = this.handlePinButtonClick.bind(this);
    this.render();

    this.pinButtons = this.root.querySelectorAll('button.is-success');
    this.deleteButtons = this.root.querySelectorAll('button.is-error');
    this.bindEvents();
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === 'pinned') this.togglePinButtonText(newValue);
  }

  updateNoteAndNoteGroups = (id, attributes) => {
    const note = this.notes.find(note => note.id === id);
    Object.assign(note, attributes);
    localStorage.setItem('notes', JSON.stringify(this.notes));

    let updateNoteGroups =
      this.updateNoteGroups && typeof window[this.updateNoteGroups] === 'function'
        ? window[this.updateNoteGroups]
        : console.error('No update note group defined for this note');

    updateNoteGroups(this.notes);
  };

  togglePinButtonText(newValue) {
    const pinButton = this.shadowRoot.querySelector('button.is-success');

    newValue === 'true' ? pinButton.innerText = 'Unpin' : pinButton.innerText = 'Pin';
  }

  handlePinButtonClick() {
    const nextPinnedState = this.pinned === 'true' ? 'false' : 'true';

    this.pinned = nextPinnedState;
    this.updateNoteAndNoteGroups(parseInt(this.id), { pinned: nextPinnedState });
  }

  handleDeleteButtonClick(e) {
    let remove =
      this.remove && typeof window[this.remove] === 'function'
        ? window[this.remove]
        : console.error('No delete defined for this note');

    remove(e);
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
