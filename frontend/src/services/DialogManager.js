import { LitHelper } from './LitHelper';
import { DialogComponent } from '../components/general/DialogComponent';

export class DialogManager {
    static instance = null;
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new DialogManager();
      }
      return this.instance;
    }
  
    constructor() {
      this.dialogProperties = null;

      /** {(value: HTMLElement) => void} */
      this.dialogMonitor = null;
    }

    
  
    /**
     * @param {value: HTMLElement) => void} dialogMonitor 
     */
    initialize(dialogMonitor) {
      console.log("DialogManager initialized", dialogMonitor);
      this.dialogMonitor = dialogMonitor;
    }
  
    /** @type {HTMLElement} element*/ 
    openDialog(element) {
        console.log("Open dialog", element);
        this.dialogMonitor(new DialogComponent(element, [new ButtonDefinition("test", () => console.log("test"))]));
    }
  
    closeDialog() {
      if (this.dialogProperties) {
        this.dialogProperties.container.innerHTML = '';
        this.dialogProperties.show = false;
      }
    }
  }

  export class DialogDefinition {
    constructor(view, buttons) {
        this.view = view;
        this.buttons = buttons;
    }
  }

  export class ButtonDefinition {
    constructor(title, onClick) {
        this.title = title;
        TouchList.onClick = onClick;
    }
  }
  
  export const dialogManager = DialogManager.getInstance();
  