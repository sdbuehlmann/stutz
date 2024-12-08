import { LitElement, html, css } from 'lit';

class ColumnMappingComponent extends LitElement {
  static properties = {
    columns: { type: Array },
    accountName: { type: String },
    mappings: { type: Array },
  };

  constructor() {
    super();
    this.columns = ['Column 1', 'Column 2', 'Column 3']; // Beispielspalten
    this.accountName = '';
    this.mappings = Array(this.columns.length).fill('ignore');
  }

  handleMappingChange(index, event) {
    const newMappings = [...this.mappings];
    newMappings[index] = event.target.value;
    this.mappings = newMappings;
    this.dispatchEvent(new CustomEvent('mapping-changed', {
      detail: { mappings: this.mappings },
    }));
  }

  handleAccountNameChange(event) {
    this.accountName = event.target.value;
    this.dispatchEvent(new CustomEvent('account-name-changed', {
      detail: { accountName: this.accountName },
    }));
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <label for="account-name">Account Name:</label>
          <input
            id="account-name"
            type="text"
            .value="${this.accountName}"
            @input="${this.handleAccountNameChange}"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Column</th>
              <th>Mapping</th>
            </tr>
          </thead>
          <tbody>
            ${this.columns.map(
              (column, index) => html`
                <tr>
                  <td>${column}</td>
                  <td>
                    <select
                      .value="${this.mappings[index]}"
                      @change="${(event) => this.handleMappingChange(index, event)}"
                    >
                      <option value="ignore">Ignore</option>
                      <option value="date">Date</option>
                      <option value="charge">Charge</option>
                      <option value="credit">Credit</option>
                      <option value="description1">Description 1</option>
                      <option value="description2">Description 2</option>
                      <option value="description3">Description 3</option>
                    </select>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = css`
    .container {
      font-family: Arial, sans-serif;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .header {
      margin-bottom: 16px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    select,
    input {
      padding: 8px;
      font-size: 1rem;
    }
  `;
}

customElements.define('column-mapping-component', ColumnMappingComponent);
