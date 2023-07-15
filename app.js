import { notes } from './database.js';
import { getNotes, setNotes } from './utils.js';

class MainApp extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.notes = getNotes() || null;
  }

  connectedCallback() {
    if (!this.notes) {
      setNotes(notes);
      this.notes = notes;
    }

    this.pinnedNotesCount = this.notes.filter(note => note.pinned === 'true').length;
    this.otherNotesCount = this.notes.filter(note => note.pinned === 'false').length;

    this.render();
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');

        :host {
          display: block;
          max-width: 1114px;
          margin: 0 auto 4rem;
          padding: 0 1rem;
        }
      </style>

      <div class="app">
        <c-header></c-header>
        <c-modal open="true"></c-modal>
        <c-note-group count="${this.pinnedNotesCount}" group="pinned"></c-note-group>
        <c-note-group count="${this.otherNotesCount}" group="other"></c-note-group>

        <c-github-link></c-github-link>
      </div>
      `;
  }
}

customElements.define('c-app', MainApp)
