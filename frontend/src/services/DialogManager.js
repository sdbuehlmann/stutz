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
        this.dialogMonitor(element);
    }
  
    closeDialog() {
      if (this.dialogProperties) {
        this.dialogProperties.container.innerHTML = '';
        this.dialogProperties.show = false;
      }
    }
  }
  
  export const dialogManager = DialogManager.getInstance();
  