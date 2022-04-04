```javascript [|3|23-44|47-57|3|4|20-21|24|6-18]
import { c, css, useProp, useEffect, useCallback } from 'atomico';

function modal({ label }) {
  const [open, setOpen] = useProp('open');

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  });
  useEffect(() => {
    if (open) {
      document.addEventListener('keyup', handleEscape);
    } else {
      document.removeEventListener('keyup', handleEscape);
    }
  }, [open]);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return (
    <host shadowDom show={show} hide={hide}>
      <div onclick={hide} id="overlay" hidden={!open} />
      <div
        id="content"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
      >
        <header id="header">
          <h1 id="title">{label}</h1>
          <button id="close-button" onclick={hide}>
            X
          </button>
        </header>
        <section>
          <slot></slot>
        </section>
      </div>
    </host>
  );
}

modal.props = {
  label: {
    type: String,
    value: '',
  },
  open: {
    type: Boolean,
    value: false,
    reflect: true,
  },
};

modal.styles = css`
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

export const MyModal = c(modal);

customElements.define('my-modal', MyModal);
```
