import { notes } from '../database.js';

const otherNotes = notes.filter(note => note.pinned === 'false');

const renderOtherNotes = () => {
  let notes = '';

  for (let note of otherNotes) {
    notes += `
      <c-note pinned="${note.pinned}" action="deleteNote">
        <h3 slot="title">${note.title}</h3>
        <p slot="description">${note.description}</p>
      </c-note>
    `;
  }
  return notes;
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://unpkg.com/nes.css/css/nes.min.css');

    .other-notes {
      display: flex;
      flex-flow: row wrap;
      gap: 1rem;
      margin-bottom: 3rem;
    }
  </style>

  <section>
    <a href="#" class="nes-badge">
      <span class="is-dark">others</span>
    </a>

    <div class="other-notes">
      ${renderOtherNotes()}
    </div>
  </section>
`;

class OtherNotes extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(template.content.cloneNode(true));
  }
}

customElements.define('c-other-notes', OtherNotes);
