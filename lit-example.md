```javascript [|80-99|91|85|44-48|55-61|70-78|102]
import { LitElement, html, css } from 'lit';

class MyModal extends LitElement {
  static styles = css`
    [hidden] {
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
  `;

  constructor() {
    super();
    this.open = false;
    this.label = '';
  }

  static properties = {
    open: { type: Boolean },
    label: {},
  };

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  handleEscape = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.hide();
    }
  };

  updated(changed) {
    if (changed.has('open')) {
      if (this.open) {
        document.addEventListener('keyup', this.handleEscape);
      } else {
        document.removeEventListener('keyup', this.handleEscape);
      }
    }
  }

  render() {
    return html`
      <div @click=${this.hide} id="overlay" ?hidden=${!this.open}></div>
      <div
        id="content"
        ?hidden=${!this.open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
      >
        <header id="header">
          <h1 id="title">${this.label}</h1>
          <button id="close-button" @click=${this.hide}>X</button>
        </header>
        <section>
          <slot></slot>
        </section>
      </div>
    `;
  }
}

customElements.define('my-modal', MyModal);
```
