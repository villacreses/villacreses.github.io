import { formatRecipeJSON } from "./parsers.js";
/**
 * @typedef {import('./types.js').ISchemaRecipe} ISchemaRecipe
 * @typedef {import('./types.js').ESHowToStep} ESHowToStep
 * @typedef {import('./types.js').ESHowToSection} ESHowToSection
 * @typedef {import('./types.js').FormattedRecipe} FormattedRecipe
 * @typedef {import('./types.js').ParsedIngredient} ParsedIngredient
 * @typedef {import('./types.js').ParsedInstructions} ParsedInstructions
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
    console.log('inst', this.formatted.instructions)
    this.innerHTML = `
      <h2>${this.formatted.name}</h2>
      <section>
        <h3>Ingredients</h3>
        <ul class="ingredients">
        ${this.formatted.ingredients?.map(Recipe.formatIngredient).join('\n')}
        </ul>
      </section>
      <section>
        <h3>Instructions</h3>
        <ol>
        ${this.formatted.instructions?.map(Recipe.formatInstructionSection).join('\n')}
        </ol>
      </section>
    `;
  }

  /**
   * @param {ParsedIngredient} ingredient 
   * @returns {string}
   */
  static formatIngredient(ingredient) {
    const {num, unit, item} = ingredient;
    return `<li><span class="bold">${num} ${unit}</span> ${item}</li>`
  }

  /**
   * @param {ParsedInstructions[number]} instructionSection
   * @returns {string}
   */
  static formatInstructionSection(instructionSection) {
    const heading = instructionSection.heading ? [`<h4>${instructionSection.heading}</h4>`] : []
    const mappedSteps = instructionSection.steps.map(step => `<li>${step}</li>`);
    return [].concat(heading, mappedSteps).join('\n');
  }
}