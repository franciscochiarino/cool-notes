import { getNotes } from '../utils.js';
class NoteGroup extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.notes = getNotes();
    this.render();
  }

  static get observedAttributes() {
    return ['count', 'group'];
  }

  get group() {
    return this.getAttribute('group');
  }

  get count() {
    return this.getAttribute('count');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') {
      this.notes = getNotes();
      this.render();
    }
  }

  renderNotes(notes, group) {
    let isPinned = group === 'pinned';
    let filteredNotes = notes.filter(note => note.pinned === isPinned.toString());
    let content = '';

    for (let note of filteredNotes) {
      content += `
        <c-note id="${note.id}" pinned="${note.pinned}" remove="deleteNote" update-note-groups="updateNoteGroups">
          <h3 slot="title">${note.title}</h3>
          <p slot="description">${note.description}</p>
        </c-note>
      `;
    }

    return content;
  };

  render() {
    if (!parseInt(this.count)) return this.root.innerHTML = '';

    return this.root.innerHTML = `
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
          ${this.renderNotes(this.notes, this.group)}
        </div>
      </section>
      `;
  }
}

customElements.define('c-note-group', NoteGroup)
