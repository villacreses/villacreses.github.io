import { formatRecipeJSON } from "./parsers.js";
/**
 * @typedef {import('./types.js').ISchemaRecipe} ISchemaRecipe
 */


export default class Recipe extends HTMLElement {
  static _isRegistered = false;

  static register() {
    if (!this._isRegistered) {
      customElements.define('mv-recipe', this);
      this._isRegistered = true;
    }
  }
  
  constructor(rawJSON){
    super();
    this.rawJSON = rawJSON;
    this.formatted = formatRecipeJSON(rawJSON);
    this.buildElements();
    this.attach();
  }

  attach() {
    const root = document.getElementById('recipe-container');
    root.appendChild(this);
  }

  buildElements() {
    this.innerHTML = `
      <h2>${this.formatted.name}</h2>
      <ul>
        ${this.formatted.ingredients?.map(Recipe.formatIngredient)}
      </ul>
    `;
  }

  /**
   * 
   * @param {} ingredient 
   * @returns 
   */
  static formatIngredient(ingredient) {

    return `<li>${}</li>`
  }
}