class CreateNoteButton extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');
      </style>

      <button type="button" class="nes-btn is-primary">
        Create Note
      </button>
    `;
  }
}

customElements.define('c-create-note-button', CreateNoteButton)
