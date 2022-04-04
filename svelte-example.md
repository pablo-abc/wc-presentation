```svelte [|1|29-38|4-5|6-11|20-26]
<svelte:options tag="my-modal" />

<script>
  export let label = '';
  export let open = false;
  export function show() {
    open = true;
  }
  export function hide() {
    open = false;
  }

  function handleEscape(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      hide();
    }
  }

  $: {
    if (open) {
      document.addEventListener('keyup', handleEscape);
    } else {
      document.removeEventListener('keyup', handleEscape);
    }
  }
</script>

<div hidden={!open} on:click={hide} id="overlay"></div>
<div hidden={!open} id="content" role="dialog" aria-modal="true" aria-labelledby="title">
  <header id="header">
    <h1 id="title">{label}</h1>
    <button on:click={hide} id="close-button">X</button>
  </header>
  <section>
    <slot></slot>
  </section>
</div>

<style>
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
</style>
```
