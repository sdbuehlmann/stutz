import { LitElement, html, css } from 'lit';

export class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      color: #333;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = 'World';
  }

  openDialog() {
    const dialog = document.createElement('my-dialog');
    dialog.open = true;

    // Optional: Inhalte per Slot hinzufügen
    dialog.innerHTML = `
      <span slot="content">
        <h3>Dynamic Dialog</h3>
        <p>This is a dynamically added dialog.</p>
      </span>
    `;

    document.body.appendChild(dialog); // Dialog ins DOM einfügen
  }

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <p>Welcome to Lit!</p>
      <button @click="${this.openDialog}">Press me</button>
    `;
  }
}

customElements.define('my-app', App);
