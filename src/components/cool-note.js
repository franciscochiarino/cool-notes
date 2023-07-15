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
      <slot name="title"></slot>
      <slot name="description"></slot>

      <button type="button" class="nes-btn is-success"></button>
      <button type="button" class="nes-btn is-error">Delete</button>
    </div>
  </div>
`;

class CoolNote extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(template.content.cloneNode(true));

    this.toogglePinned = this.toogglePinned.bind(this);

    const pinButtons = root.querySelectorAll('button.is-success');
    const deleteButtons = root.querySelectorAll('button.is-error');

    pinButtons.forEach((pinButton) => {
      pinButton.addEventListener('click', (e) => {
        this.toogglePinned()
      });
    });

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', (e) => {
        console.log('this.action')
        console.log(window[this.action])
        let action =
          this.action && typeof window[this.action] === 'function'
            ? window[this.action]
            : this.defaultActionFallback;

        action(e);
      });
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pinned') {
      const pinButton = this.shadowRoot.querySelector('button.is-success');

      if (newValue === 'true')
        pinButton.innerText = 'Unpin';
      else
        pinButton.innerText = 'Pin';
    }
  }

  toogglePinned() {
    this.pinned = this.pinned === 'true' ? 'false' : 'true';
  }

  defaultActionFallback(e) {
    console.error('No action defined for this note');
  }

  static get observedAttributes() {
    return ['pinned', 'action'];
  }

  get pinned() {
    return this.getAttribute('pinned');
  }

  set pinned(value) {
    this.setAttribute('pinned', value);
  }

  get action() {
    return this.getAttribute('action');
  }

  set action(value) {
    this.setAttribute('action', value);
  }
}

customElements.define('cool-note', CoolNote)
