import { notes } from '../../database.js';

const pinnedNotes = notes.filter(note => note.pinned === 'true');
const renderPinnedNotes = () => {
  let notes = '';

  for (let note of pinnedNotes) {
    notes += `
      <cool-note pinned="${note.pinned}">
        <h3 slot="title">${note.title}</h3>
        <p slot="description">${note.description}</p>
      </cool-note>
    `;
  }
  return notes;
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://unpkg.com/nes.css/css/nes.min.css');

    .pinned-notes {
      display: flex;
      flex-flow: row wrap;
      gap: 1rem;
    }
  </style>

  <a href="#" class="nes-badge">
    <span class="is-warning">pinned</span>
  </a>
  <div class="pinned-notes">
    ${renderPinnedNotes()}
  </div>
`;

class PinnedNotes extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(template.content.cloneNode(true));
  }
}

customElements.define('pinned-notes', PinnedNotes)
