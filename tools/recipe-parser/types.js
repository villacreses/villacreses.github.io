/**
 * @typedef {Object} NutritionInfo
 * @property {string} [calories]
 * @property {string} [carbohydrateContent]
 * @property {string} [fatContent]
 * @property {string} [fiberContent]
 * @property {string} [proteinContent]
 * @property {string} [sugarContent]
 */

/**
 * @typedef {Object} AggregateRating
 * @property {string} ratingValue
 * @property {string} ratingCount
 * @property {string} bestRating
 * @property {string} worstRating
 */

/**
 * @typedef {Object} ESHowToStep
 * @property {string} [name]
 * @property {string} [text]
 * @property {string} [url]
 * @property {string} [image]
 */

/**
 * @typedef {Object} ESHowToSection
 * @property {string} name
 * @property {ESHowToStep[]} itemListElement
 */

/**
 * @typedef {Object} IESPublisher
 * @property {string} [name]
 */

/**
 * @typedef {Object} IESIsPartOf
 * @property {string} [name]
 * @property {string} [url]
 * @property {string} [description]
 * @property {IESIsPartOf} [isPartOf]
 */

/**
 * @typedef {Object} ISchemaRecipe
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [dateModified]
 * @property {string} [datePublished]
 * @property {string|IESPublisher} [publisher]
 * @property {string|IESIsPartOf} [isPartOf]
 * @property {string} [keywords]
 * @property {string|IESPublisher|IESPublisher[]} [author]
 * @property {NutritionInfo} [nutrition]
 * @property {AggregateRating} [aggregateRating]
 * @property {string[]} [recipeIngredient]
 * @property {ESHowToStep[] | ESHowToSection[]} [recipeInstructions]
 * @property {string} [recipeYield]
 * @property {string|string[]} [cookingMethod]
 * @property {string|string[]} [recipeCategory]
 * @property {string|string[]} [recipeCuisine]
 * @property {string|string[]} [tool]
 * @property {string} [cookTime]
 * @property {string} [prepTime]
 * @property {string} [totalTime]
 */

/**
 * @typedef {{
 *  heading?: string;
 *  steps: string[]
 * }[]} ParsedInstructions
 */

/**
 * @typedef {{ num: number, dem?: number, unit: string, item: string }} ParsedIngredient
 */

/**
 * @typedef {Object} FormattedRecipe
 * @property {string} [name]
 * @property {string} [author]
 * @property {ParsedInstructions} [instructions]
 */

export {}