class GithubLink extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.root.innerHTML = `
      <style>
        @import url('https://unpkg.com/nes.css/css/nes.min.css');

        :host {
          display: block;
          position: fixed;
          bottom: 8px;
          left: 8px;
        }
      </style>

      <a href="https://github.com/franciscochiarino/cool-notes" target="_blank">
        <i class="nes-icon github is-medium"></i>
      </a>
      `;
  }
}

customElements.define('c-github-link', GithubLink)
