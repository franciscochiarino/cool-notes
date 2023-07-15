const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://unpkg.com/nes.css/css/nes.min.css');

    header {
      text-align: center;
      padding: 3rem 0;
    }

    h1 {
      display: inline;
    }
  </style>

  <header>
    <i class="snes-jp-logo"></i>
    <h1>Cool Notes</h1>
    <i class="snes-jp-logo"></i>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(template.content.cloneNode(true));
  }
}

customElements.define('c-header', Header)
