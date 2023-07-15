class Header extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');

        header {
          text-align: center;
          padding: 3rem 0;
          display: flex;
        }

        h1 {
          display: inline;
        }

        .right-elements {
          margin-left: auto;
        }
      </style>

      <header>
        <div>
          <h1>Cool Notes</h1>
        </div>

        <div class="right-elements">
          <c-create-note-button></c-create-note-button>
        </div>
      </header>
    `;
  }
}

customElements.define('c-header', Header)
