import {html, css, LitElement} from 'lit';
import { ButtonDefinition } from "../../services/DialogManager";
import { LitHelper } from "../../services/LitHelper";

export class DialogComponent extends LitElement {
    static containerName = "view-container";

    static styles = css`
    div {
        background-color: yellow;
    }
    `;

    static properties = {
        name: {type: String},
      };

    /**
     * @param {HTMLElement | string} view 
     * @param {ButtonDefinition[]} buttons 
     */
  constructor(view, buttons) {
    super();

    /** @type { HTMLElement } */
    this.view = LitHelper.load(view);

    /** @type { ButtonDefinition[] } */
    this.buttons = buttons;
  }

  firstUpdated() {
    /** @type {HTMLElement} */
    const container = this.renderRoot.getElementById("view-container");
    container.replaceChild(this.view);
  }

  render() {
    return html`
      <div>
        <div>
            ${this.buttons.map(button => html`<button @click="${() => button.onClick()}">${button.title}</button>`)}
        </div>
        <div id="view-container"></div>
      </div>
    `;
  }
}