import { LitElement, html, css } from 'lit';
import { CsvLoader } from '../../services/CsvLoader';
import { DialogManager } from '../../services/DialogManager';

import { MapCsvEntriesComponent } from './MapCsvEntriesComponent';


export class AccountOverviewComponent extends LitElement {
    static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    nav {
      display: flex;
      gap: 10px;
      padding: 10px;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ccc;
    }
    nav button {
      padding: 8px 12px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    nav button:hover {
      background-color: #0056b3;
    }
    main {
      padding: 20px;
    }
  `;

  constructor() {
    super();

    this.dialogManager = DialogManager.getInstance();
  }

  render() {
    return html`
      <!-- Navigation -->
      <nav>
        <button @click="${() => this.onImport()}">import</button>
        <button>add</button>
      </nav>

      <!-- Main View Content -->
      <main>
      </main>
    `;
  }

  onImport() {
    /**
     * @type {Promise<string[][]>}
     */
    const promise = CsvLoader.selectAndParseCSV();

    promise.then(entries => {
        console.log("Entries loaded", entries);

        this.dialogManager.openDialog(new MapCsvEntriesComponent(entries));
    })
  }
}

customElements.define('account-overview', AccountOverviewComponent);