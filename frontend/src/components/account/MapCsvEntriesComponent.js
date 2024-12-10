import { LitElement, html, css } from 'lit';

export class MapCsvEntriesComponent extends LitElement {

    static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
    }

    .table-container {
      flex: 1;
      border: 1px solid #ccc;
      over
    }

    table {
    width: 100%;
        border-collapse: collapse; /* Entfernt Abstände zwischen Zellen */
    }

    th, td {
        padding: 10px;
        text-align: right;
        border: none; /* Entfernt alle Ränder */
    }

    /* Header-Stil anpassen */
    thead th {
        background-color: #555; /* Etwas dunkleres Grau für den Header */
        color: white;
        font-weight: bold; /* Fettgedruckte Schrift */
    }

    tr:nth-child(odd) {
        background-color: #f9f9f9; /* Alternierende Zeilenfarbe */
    }

    tr:nth-child(even) {
        background-color: #e8e8e8;
    }
  `;

  /**
   * @param {string[][] | undefined} loadedCsv 
   */
  constructor(loadedCsv) {
    super();

    this.loadedCsv = loadedCsv;
    this.titles = this.loadedCsv.shift();

    // Standard-Mappings
    this.columnMappings = [];
  }

  /**
   * Aktualisiert das Mapping für eine Spalte.
   * @param {number} index - Index der Spalte
   * @param {string} mapping - Ausgewähltes Mapping
   */
  updateMapping(index, mapping) {
    this.columnMappings[index] = mapping;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <!-- Tabellenkopf -->
          <thead>
            <tr>
              <th></th>
              ${this.loadedCsv[0]?.map(
                (_, colIndex) => html`
                  <th>
                    ${this.titles[colIndex]}
                    <select
                      @change="${(e) =>
                        this.updateMapping(colIndex, e.target.value)}"
                    >
                      <option value="Ignore" ?selected=${this.columnMappings[colIndex] === 'Ignore'}>Ignore</option>
                      <option value="Date" ?selected=${this.columnMappings[colIndex] === 'Date'}>Date</option>
                      <option value="Charge" ?selected=${this.columnMappings[colIndex] === 'Charge'}>Charge</option>
                      <option value="Description" ?selected=${this.columnMappings[colIndex] === 'Description'}>Description</option>
                    </select>
                  </th>
                `
              )}
            </tr>
          </thead>

          <!-- Tabelleninhalt -->
          <tbody>
            ${this.loadedCsv.map(
              (row, rowIndex) => html`
                <tr>
                  <td class="row-number">${rowIndex + 1}</td>
                  ${row.map(
                    (cell) => html`<td>${cell}</td>`
                  )}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('map-csv-entries', MapCsvEntriesComponent);