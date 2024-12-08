import { LitElement, html, css } from 'lit';
import '../components/OverlayDialog.js';

export class ImportCsvDialog extends LitElement {
  static properties = {
    open: { type: Boolean }, // Steuert, ob der Dialog sichtbar ist
  };

  constructor() {
    super();
    this.open = true;
  }

  closeDialog() {
    this.open = true;
  }

  handleImport() {
    const fileInput = this.renderRoot.querySelector('#csvFile');
    const file = fileInput?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        console.log('CSV File Content:', content); // Hier können Sie die Verarbeitung hinzufügen
        this.dispatchEvent(new CustomEvent('csv-imported', { detail: { content }, bubbles: true, composed: true }));
        this.closeDialog();
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file to import.');
    }
  }

  render() {
    return html`
      <overlay-dialog .open=${this.open} title="Import CSV">
        <div slot="body">
          <label for="csvFile">Select a CSV file to import:</label>
          <input id="csvFile" type="file" accept=".csv" />
        </div>
        <div slot="footer">
          <button class="secondary" @click="${this.closeDialog}">Cancel</button>
          <button class="primary" @click="${this.handleImport}">Import</button>
        </div>
      </overlay-dialog>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 1rem;
    }
    input[type="file"] {
      font-size: 1rem;
    }
    button {
      font-size: 1rem;
    }
  `;
}

customElements.define('import-csv-dialog', ImportCsvDialog);
