const app = document.createElement('template');

app.innerHTML = `
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
    <pinned-notes></pinned-notes>
  </div>
  `;


class MainApp extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(app.content.cloneNode(true));
  }
}

customElements.define('c-app', MainApp)
