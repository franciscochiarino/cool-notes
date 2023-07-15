import { notes } from '../database.js';

const renderPinnedNotes = (notes) => {
  let pinnedNotes = notes.filter(note => note.pinned === 'true');
  let content = '';

  for (let note of pinnedNotes) {
    content += `
      <c-note id="${note.id}" pinned="${note.pinned}" remove="deleteNote" update-pinned="updatePinnedNotes">
        <h3 slot="title">${note.title}</h3>
        <p slot="description">${note.description}</p>
      </c-note>
    `;
  }
  return content;
};

class NoteGroup extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['count', 'group'];
  }

  get group() {
    return this.getAttribute('group');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') {
      this.render();
    }
  }

  render() {
    this.root.innerHTML = `
      <style>
          @import url('https://unpkg.com/nes.css/css/nes.min.css');

          :host {
            display: block;
          }

          .note-group {
            display: flex;
            flex-flow: row wrap;
            gap: 1rem;
            margin-top: 1rem;
            margin-bottom: 3rem;
          }
      </style>

      <section>
        <a href="#" class="nes-badge">
          <c-badge type="${this.group}"></c-badge>
        </a>
        <div class="note-group">
          ${renderPinnedNotes(notes)}
        </div>
      </section>
      `;
  }
}

customElements.define('c-note-group', NoteGroup)
