const homePage = document.createElement('template');

homePage.innerHTML = `
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
    <pinned-notes></pinned-notes>
  </div>
  `;

export default homePage;
