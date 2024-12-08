import { LitElement, html, css } from 'lit';
import { DialogManager } from '../services/DialogManager';
import { render } from 'lit';

class MainComponent extends LitElement {
  static properties = {
    activeView: { type: String }, // Die aktuell ausgewählte View
    dialogContent: { type: String }, // Inhalt des Dialogs
    showDialog: { type: Boolean }, // Steuert die Sichtbarkeit des Dialogs
  };

  constructor() {
    super();
    this.activeView = 'home'; // Standard-View
    this.showDialog = false; // Dialog ist zunächst nicht sichtbar
    this.dialogManager = DialogManager.getInstance();

    this.navigator = Navigator.getInstance();


    this.views =  [
        new MainView(
            'Overview', 
            () => {
                return html`<div><p>Welcome to the Home viewwwwwwwwwwwwwwwwwww!</p><button>click me</button></div>`
            }),
        new MainView(
            'Accounts', 
            () => {
                return html`<p>Welcome to the Home view!</p><button>click me</button>`
            },
            [
                new View(
                    "Lohnkonto", 
                    () => html`<div>No money, scusi.</div>`
                ),
                new View(
                    "Sparkonto", 
                    () => html`<div>Again no money, scusi.</div>`
                ),
            ]),
        new MainView(
            'About', 
            () => {
                return html`<p>Welcome to the Home view!</p><button>click me</button>`
            },
            this.navigator),
    ];
  }

  // Methode zum Schließen des Dialogs
  closeDialog() {
    this.showDialog = false;
    this.dialogManager.closeDialog();
  }

  // Navigation zwischen verschiedenen Views
  changeView(view) {
    this.activeView = view;
  }

  /** @type {HTMLElement} element */
  openDialog(element) {
    console.log("Bubibuuuu");

    this.dialogProperties.container.appendChild(element);
    this.dialogProperties.show = true;

    this.requestUpdate();
  }

  firstUpdated() {
    console.log("firstUpdated of MainComponent called");

    /**
     * @type {HTMLDivElement}
     */
    const mainViewContainer = this.renderRoot.querySelector('#main-view-container');
    const mainViewMonitor = (element) => {
        mainViewContainer.replaceChildren(element);
    }
    this.navigator.init(mainViewMonitor);




    const dialogContainer = this.renderRoot.querySelector('#dialog-container');


    this.dialogProperties = {
        /** @type {boolean} */
        show: false,
        /** @type {HTMLElement} */
        container: dialogContainer
    };

    const consumer = (element) => {
        console.log("Show dialog", element);
        this.openDialog(element);
      };
    this.dialogManager.initialize(consumer);
  }

  render() {
    console.log("Renderrrr", this.dialogProperties);
    return html`
      <div class="main">
        <!-- Navigation -->
        <nav>
          ${this.views.map(view => view.createNavButton())}
        </nav>
        <nav id="sub-navigation">
          
        </nav>

        <!-- Aktive View -->
        <div class="view" id="main-view-container">
        </div>

        <!-- Dialog -->
        <div
            class="overlay"
            style="${this.dialogProperties?.show ? 'display: block;' : 'display: none;'}"
            @click="${this.closeDialog}">
        </div>
        <div
        class="dialog"
        style="${this.dialogProperties?.show ? 'display: block;' : 'display: none;'}">
            <div id="dialog-container"></div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .main {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
    }

    /* Navigation Styles */
    nav {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    nav button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    nav button:hover {
      background-color: #0056b3;
    }

    /* View Container */
    .view {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      width: 100%;
      max-width: 600px;
      text-align: center;
    }

    /* Dialog Styles */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }

    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      z-index: 1001;
    }

    .dialog button {
      background: red;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
    }

    .dialog button:hover {
      background: darkred;
    }
  `;
}

class Navigator {
    static instance = null;
  
    static getInstance() {
      if (!this.instance) {
        console.log("Create navigator singleton");
        this.instance = new Navigator();
      }
      return this.instance;
    }

    /**
     * @param {(value: HTMLElement | string) => void} monitor 
     */
    init(monitor) {
        this.monitor = monitor;
    }

    /** @type {MainView} mainView */
    changeView(mainView) {
        const result = mainView.render();
        
        if (typeof result === "string") {
            const container = document.createElement("div");
            container.innerHTML = result;

            this.monitor(container.firstElementChild);
        } else if (result instanceof HTMLElement) {
            this.monitor(result);
        } else if (this.isTemplateResult(result)) {
            const container = document.createElement("div");
            render(result, container); // Lit's render function
            this.monitor(container.firstElementChild);
        } else {
            throw new Error("Render method must return a string or an HTMLElement.");
        }
    }

    /**
     * Check if the result is a Lit-style TemplateResult.
     * 
     * @param {*} result - The object to check.
     * @returns {boolean} True if the object is a TemplateResult.
     */
    isTemplateResult(result) {
        // In Lit, TemplateResult instances typically have a `_$litType$` property.
        return result && typeof result === 'object' && result._$litType$ !== undefined;
    }
}

class MainView {
    constructor(title, render, childViews) {
        this.title = title;
        this.render = render;
        this.childViews = childViews;
    }

    createNavButton() {
        const navigator = Navigator.getInstance();

        return html `
        <button @click="${() => navigator.changeView(this)}">${this.title}</button>
        `
    }
}

class View {
    constructor(title, render) {
        this.title = title;
        this.render = render;
    }

    createNavButton() {
        const navigator = Navigator.getInstance();

        return html `
        <button @click="${() => navigator.changeView(this)}">${this.title}</button>
        `
    }
}

customElements.define('main-component', MainComponent);
