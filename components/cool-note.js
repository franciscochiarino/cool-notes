const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://unpkg.com/nes.css/css/nes.min.css');

    .cool-note {
      width: 350px;
    }

  </style>

  <div class="cool-note">
    <div class="nes-container is-rounded">
      <slot name="task"></slot>
      <slot name="description"></slot>

      <button type="button" class="nes-btn is-success">Pin</button>
      <button type="button" class="nes-btn is-error">Delete</button>
    </div>
  </div>
`;

class CoolNote extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }
}

customElements.define('cool-note', CoolNote)
