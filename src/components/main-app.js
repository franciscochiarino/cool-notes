import homePage from "../pages/home.js";

class MainApp extends HTMLElement {
  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });
    root.append(homePage.content.cloneNode(true));
  }
}

customElements.define('main-app', MainApp)
