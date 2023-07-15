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

class PinnedNotes extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['count'];
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

          .pinned-notes {
            display: flex;
            flex-flow: row wrap;
            gap: 1rem;
            margin-bottom: 3rem;
          }
      </style>

      <section>
        <a href="#" class="nes-badge">
          <span class="is-warning">pinned</span>
        </a>
        <div class="pinned-notes">
          ${renderPinnedNotes(notes)}
        </div>
      </section>
      `;
  }
}

customElements.define('c-pinned-notes', PinnedNotes)
