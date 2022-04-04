```javascript [|1-3|4-42|5-7|9|43-52|55|56-64|57|58-59|60-61|62-63|120-125|121|122|123-124|127-130|144-151|145|146-150|132-142|66-68|70-80|71|72-75|76-78|82-90|83|84|85-89|92-94|105-111|154]
const template = document.createElement('template');

template.innerHTML = /* HTML */ `
  <style>
    :host([hidden]) {
      display: none;
    }

    #content {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 700;
      background: var(--background, white);
      color: var(--font-color, inherit);
      padding: 1rem;
      border-radius: 10px;
    }

    #header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #close-button {
      height: 2rem;
      width: 2rem;
      font-weight: 700;
    }

    #overlay {
      position: fixed;
      background: black;
      opacity: 0.1;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  </style>
  <div id="overlay"></div>
  <div id="content" role="dialog" aria-modal="true" aria-labelledby="title">
    <header id="header">
      <h1 id="title"></h1>
      <button id="close-button">X</button>
    </header>
    <section>
      <slot></slot>
    </section>
  </div>
`;

class MyModal extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this._open = false;
    this._label = '';
    this.hide = this.hide.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
  }

  static get observedAttributes() {
    return ['label', 'open'];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'open':
        if (!this.hasAttribute('open')) this.open = false;
        else this.open = newValue !== 'false';
        break;
      case 'label':
        this.label = newValue;
        break;
    }
  }

  set open(value) {
    this._open = value;
    this.update();
    if (value) {
      document.addEventListener('keyup', this.handleEscape);
    } else {
      document.removeEventListener('keyup', this.handleEscape);
    }
  }

  get open() {
    return this._open;
  }

  set label(value) {
    this._label = value;
    this.update();
  }

  get label() {
    return this._label;
  }

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  handleEscape(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.hide();
    }
  }

  connectedCallback() {
    this.setAttribute('hidden', '');
    this.update();
    this.closeButton.addEventListener('click', this.hide);
    this.overlay.addEventListener('click', this.hide);
  }

  disconnectedCallback() {
    this.closeButton.removeEventListener('click', this.hide);
    this.overlay.removeEventListener('click', this.hide);
  }

  get title() {
    return this.shadowRoot.querySelector('#title');
  }

  get closeButton() {
    return this.shadowRoot.querySelector('#close-button');
  }

  get overlay() {
    return this.shadowRoot.querySelector('#overlay');
  }

  update() {
    this.title.textContent = this.label;
    if (this.open) {
      this.removeAttribute('hidden');
    } else {
      this.setAttribute('hidden', '');
    }
  }
}

customElements.define('my-modal', MyModal);
```
