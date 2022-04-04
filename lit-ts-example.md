```typescript [|2|4|46-50]
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-modal')
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

  @property()
  label = '';

  @property({ type: Boolean })
  open = false;

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
```
