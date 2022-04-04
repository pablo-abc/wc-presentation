```javascript [|5-17|8-9|10-15|11|35-57|18|20-33]
import { customElement } from 'solid-element';
import { onMount, onCleanup } from 'solid-js';
import styles from './my-modal.css';

customElement(
  'my-modal',
  {
    open: false,
    label: '',
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    },
  },
  (props, { element }) => {
    const hide = props.hide.bind(element);

    function handleEscape(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        hide();
      }
    }

    onMount(() => {
      document.addEventListener('keyup', handleEscape);
    });

    onCleanup(() => {
      document.removeEventListener('keyup', handleEscape);
    });

    return (
      <>
        <div onClick={hide} id="overlay" hidden={!props.open} />
        <div
          id="content"
          hidden={!props.open}
          role="dialog"
          aria-modal="true"
          aria-labelledby="title"
        >
          <header id="header">
            <h1 id="title">{props.label}</h1>
            <button id="close-button" onClick={hide}>
              X
            </button>
          </header>
          <section>
            <slot></slot>
          </section>
        </div>
        <style>{styles}</style>
      </>
    );
  }
);
```
