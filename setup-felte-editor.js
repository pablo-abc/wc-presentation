import 'https://cdn.jsdelivr.net/npm/@pberganza/html-code-editor@0.0.6/dist/src/html-code-editor.min.js';
const editor = document.createElement('html-code-editor');
editor.setAttribute('shown', 'preview');
editor.code = /*html*/ `
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import 'https://unpkg.com/@felte/element@0.4.0/dist/min/felte-form.js';
      import 'https://unpkg.com/@felte/reporter-element@0.2.0/dist/min/validation-message.js';
      import { reporter } from 'https://unpkg.com/@felte/reporter-element@0.2.0/dist/min/index.js';
      const felteForm = document.querySelector('felte-form');
      const submittedSection = document.getElementById('submitted');
      felteForm.configuration = {
        onSubmit: (values) => {
          submittedSection.innerHTML = '<h2>Submitted:</h2><pre></pre>';
          submittedSection.querySelector('pre').innerHTML = JSON.stringify(
            values,
            null,
            2
          );
        },
        validate(values) {
          const errors = {
            email: [],
            password: [],
          };
          if (!values.email) errors.email.push('Must not be empty');
          if (!/[a-zA-Z][^@]*@[a-zA-Z][^@.]*.[a-z]{2,}/.test(values.email))
            errors.email.push('Must be a valid email');
          if (!values.password) errors.password.push('Must not be empty');
          return errors;
        },
        extend: [reporter],
      };
      document.querySelector('form').addEventListener('reset', () => {
        submittedSection.innerHTML = '';
      });
    </script>
    <style>
      label {
        display: block;
      }
      li {
        list-style-position: inside;
      }
      ul {
        padding: 0;
      }
    </style>
  </head>
  <body>
    <template id="validation-message">
      <ul aria-live="polite">
        <li data-part="item"></li>
      </ul>
    </template>
   <felte-form>
      <form>
        <fieldset>
          <legend>Sign In</legend>
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" />
          <felte-validation-message
            for="email"
            templateid="validation-message"
          ></felte-validation-message>
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" />
          <felte-validation-message
            for="password"
            templateid="validation-message"
          ></felte-validation-message>
        </fieldset>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </felte-form>
    <section id="submitted"></section>
  </body>
</html>
`;

setTimeout(() => {
  document.body.appendChild(editor);
}, 1000);
