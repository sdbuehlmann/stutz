import { render } from 'lit';

export class LitHelper {

    /**
     * @param {*} result 
     * @returns {HTMLElement}
     */
    static load(result) {

        if (typeof result === "string") {
            const container = document.createElement("div");
            container.innerHTML = result;

            return container.firstElementChild;
        } else if (result instanceof HTMLElement) {
            return result;
        } else if (this.isTemplateResult(result)) {
            const container = document.createElement("div");
            render(result, container); // Lit's render function
            return container.firstElementChild;
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
    static isTemplateResult(result) {
        // In Lit, TemplateResult instances typically have a `_$litType$` property.
        return result && typeof result === 'object' && result._$litType$ !== undefined;
    }
}