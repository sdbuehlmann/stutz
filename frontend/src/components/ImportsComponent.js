import { LitElement, html, css } from 'lit';
import { DialogManager } from '../services/DialogManager';

class ImportsComponent extends LitElement {
  static properties = {
    imports: { type: Array }, // Enthält die Import-Daten
  };

  constructor() {
    super();
    this.imports = [
      { date: '2024-12-01', account: 'Account 1', entries: 10 },
      { date: '2024-12-05', account: 'Account 2', entries: 5 },
    ];

    this.dialogManager = DialogManager.getInstance();
  }

  // Methode zum Öffnen des Import-Dialogs
  openImportDialog() {
    const dialog = document.createElement('column-mapping-component');

    this.dialogManager.openDialog(dialog);
  }

  render() {
    return html`
      <div class="imports-container">
        <h2>Imports</h2>
        <!-- Tabelle -->
        <table>
          <thead>
            <tr>
              <th>Imported at</th>
              <th>Account</th>
              <th>Nr. of entries</th>
            </tr>
          </thead>
          <tbody>
            ${this.imports.map(
              (item) => html`
                <tr>
                  <td>${item.date}</td>
                  <td>${item.account}</td>
                  <td>${item.entries}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
        <!-- Button -->
        <button class="add-button" @click="${this.openImportDialog}">+</button>
      </div>
    `;
  }

  static styles = css`
    .imports-container {
      font-family: Arial, sans-serif;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    h2 {
      margin: 0;
      font-size: 24px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 600px;
      margin-top: 16px;
    }

    table th,
    table td {
      border: 1px solid #ddd;
      text-align: left;
      padding: 8px;
    }

    table th {
      background-color: #f4f4f4;
      font-weight: bold;
    }

    table tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    table tr:hover {
      background-color: #f1f1f1;
    }

    .add-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      font-size: 24px;
      font-weight: bold;
      color: white;
      background-color: #28a745;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .add-button:hover {
      background-color: #218838;
    }

    .add-button:active {
      background-color: #1e7e34;
    }
  `;
}

customElements.define('imports-component', ImportsComponent);
