```tsx [|3-7|4|5|6|41-58|9-13|12-13|15-23|32-39]
import { Component, Prop, Method, Watch, Host, h } from '@stencil/core';

@Component({
  tag: 'my-modal',
  styleUrl: 'my-modal.css',
  shadow: true,
})
export class MyModal {
  @Prop()
  label = '';

  @Prop({ mutable: true, reflect: true })
  open = false;

  @Method()
  async show() {
    this.open = true;
  }

  @Method()
  async hide() {
    this.open = false;
  }

  handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.hide();
    }
  };

  @Watch('open')
  watchOpenHandler(newValue: boolean) {
    if (newValue) {
      document.addEventListener('keyup', this.handleEscape);
    } else {
      document.removeEventListener('keyup', this.handleEscape);
    }
  }

  render() {
    return (
      <Host>
        <div onClick={() => this.hide()} id="overlay" hidden={!this.open} />
        <div id="content" hidden={!this.open} role="dialog" aria-modal="true" aria-labelledby="title">
          <header id="header">
            <h1 id="title">{this.label}</h1>
            <button id="close-button" onClick={() => this.hide()}>
              X
            </button>
          </header>
          <section>
            <slot></slot>
          </section>
        </div>
      </Host>
    );
  }
}
```
