import { LitElement, html, css } from 'lit';

export class MyComponent extends LitElement {
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

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <p>Welcome to Lit!</p>
    `;
  }
}

customElements.define('my-component', MyComponent);
