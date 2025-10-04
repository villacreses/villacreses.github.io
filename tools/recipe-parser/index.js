/**
 * @typedef {import('./types.js').ISchemaRecipe} ISchemaRecipe
 * @typedef {import('./types.js').ESHowToStep} ESHowToStep
 * @typedef {import('./types.js').ESHowToSection} ESHowToSection
 */

const form = document.querySelector('form');

form.addEventListener('submit', async function(evt) {
  evt.preventDefault();
  const formData = Object.fromEntries((new FormData(form)).entries());
  this.reset();

  try {
    const res = await fetch('https://mv-base.mariovillacreses.workers.dev/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log('Raw:', data);
    const formatted = await formatRecipeJSON(data);
    console.log('formatted', formatted)
  } catch (err) {
    console.error(err);
  }
})

/**
 * 
 * @param {ISchemaRecipe} rawJSON 
 * @returns {Promise<any>}
 */
async function formatRecipeJSON(rawJSON) {
  try {
    const formatted = {
      name: rawJSON.name,
      author: getAuthor(rawJSON.author),
      instructions: parseInstructions(rawJSON.recipeInstructions),
      prepTime: parseDuration(rawJSON.prepTime),
      cookTime: parseDuration(rawJSON.cookTime),
      totalTime: parseDuration(rawJSON.totalTime),
      ingredients: rawJSON.recipeIngredient?.map(parseIngredient),
      yields: parseRecipeYield(rawJSON.recipeYield),
      nutrition: parseNutrition(rawJSON.nutrition)
    }

    return formatted;
  } catch (err) {
    throw new Error('Recipe format error:', err)
  }
}
/**
 * 
 * @param {ISchemaRecipe['author']} author 
 * @returns {string | undefined}
 */
function getAuthor(author) {
  if (typeof author === "string") return author;
  if (Array.isArray(author)) return author[0].name;
  return author?.name;
}

/**
 * 
 * @param {ISchemaRecipe["recipeInstructions"]} instructions 
 * @returns {{ heading?: string; steps: string[]}[]}
 */
export function parseInstructions(instructions = [])  {
  /**
   * 
   * @param {ESHowToStep} v 
   * @returns {string}
   */
  const mapToInstructionText = (v) => v.text || v.name || "";
  const hasMultipleSections = instructions.every(item => {
    if ('itemListElement' in item) return true; // I hate JSDocs
    else return false;
  });
  
  if (hasMultipleSections) return instructions.map(
    /**
     * @param {ESHowToSection} section
     * @returns {{ heading: string, steps: string[] }}
     */
    section => ({
        heading: section.name,
        steps: section.itemListElement.map(mapToInstructionText)
    })
  )

  return [{
    steps: instructions.map(mapToInstructionText)
  }];
}

/**
 * Parses an ISO 8601 duration string like "PT1H30M"
 * @param {string} isoDuration
 * @returns {{ hours: number, minutes: number, totalMinutes: number }}
 */
function parseDuration(isoDuration) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return { hours: 0, minutes: 0, totalMinutes: 0 };

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  return {
    hours,
    minutes,
    totalMinutes: hours * 60 + minutes,
  };
}

/**
 * Parses a recipeYield value into structured parts.
 * @param {string | string[]} yieldData
 * @returns {{ quantity: number | null, description: string | null }}
 */
function parseRecipeYield(yieldData) {
  let quantity = null;
  let description = null;

  const values = Array.isArray(yieldData) ? yieldData : [yieldData];

  for (const val of values) {
    const numMatch = val.match(/^(\d+)/); // match number at start
    if (numMatch && quantity === null) {
      quantity = parseInt(numMatch[1], 10);
    }

    const descMatch = val.match(/[a-zA-Z]/);
    if (descMatch) {
      // Remove leading quantity from description if present
      description = val.replace(/^(\d+)\s*/, '').trim();
    }
  }

  return {
    quantity,
    description: description || null,
  };
}
  
function parseNutritionField(raw) {
  if (!raw) return { value: null, unit: null };

  const match = raw.match(/([\d.]+)\s*([a-zA-Z]+)?/);
  if (!match) return { value: null, unit: null };

  const [, value, unit] = match;
  return {
    value: parseFloat(value),
    unit: unit?.toLowerCase() || null
  };
}

function parseNutrition(nutrition) {
  if (!nutrition) return null;

  return {
    calories: parseNutritionField(nutrition.calories),
    fat: parseNutritionField(nutrition.fatContent),
    protein: parseNutritionField(nutrition.proteinContent),
    carbs: parseNutritionField(nutrition.carbohydrateContent),
    sugar: parseNutritionField(nutrition.sugarContent),
    fiber: parseNutritionField(nutrition.fiberContent),
    sodium: parseNutritionField(nutrition.sodiumContent),
    cholesterol: parseNutritionField(nutrition.cholesterolContent),
    saturatedFat: parseNutritionField(nutrition.saturatedFatContent),
    unsaturatedFat: parseNutritionField(nutrition.unsaturatedFatContent),
    servingSize: nutrition.servingSize || null
  };
}
  
const unitMap = {
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  tbsp: "tbsp",
  teaspoon: "tsp",
  teaspoons: "tsp",
  tsp: "tsp",
  cup: "cup",
  cups: "cup",
  ounce: "oz",
  ounces: "oz",
  oz: "oz",
  gram: "g",
  grams: "g",
  g: "g",
  kilogram: "kg",
  kilograms: "kg",
  kg: "kg",
  liter: "l",
  liters: "l",
  l: "l",
  milliliter: "ml",
  milliliters: "ml",
  ml: "ml",
  pinch: "pinch",
  pinches: "pinch",
  clove: "clove",
  cloves: "clove",
  slice: "slice",
  slices: "slice",
  piece: "piece",
  pieces: "piece",
  stick: "stick",
  sticks: "stick",
  egg: "egg",
  eggs: "egg"
};
  

/**
 * Parses a basic ingredient string into structured parts.
 * @param {string} input
 * @returns {{ num: number, dem?: number, unit: string, item: string }}
 */
export function parseIngredient(inputRaw) {
  const input = normalizeFractions(inputRaw)
  const rangeRegex = /^(\d+(?:\.\d+)?)(?:\s*(?:–|to)\s*(\d+(?:\.\d+)?))?\s+(\w+)\s+(.*)$/;
  const fractionRegex = /^(\d+)\s+(\d+)\/(\d+)\s+(\w+)\s+(.*)$/;
  const simpleFractionRegex = /^(\d+)\/(\d+)\s+(\w+)\s+(.*)$/;
  const looseQuantityRegex = /^(\d+(?:\.\d+)?)(?:\s+)?(.*)$/;
  const isOptional = /optional/i.test(input);
  
  let match;
  
  if ((match = input.match(fractionRegex))) {
    const [, whole, num, dem, unit, item] = match;
    return {
      num: parseInt(whole) * parseInt(dem) + parseInt(num),
      dem: parseInt(dem),
      unit: normalizeUnit(unit),
      item,
      ...(isOptional ? { optional: true } : {}),
    };
  }
  
  if ((match = input.match(simpleFractionRegex))) {
    const [, num, dem, unit, item] = match;
    return {
      num: parseInt(num),
      dem: parseInt(dem),
      unit: normalizeUnit(unit),
      item,
      ...(isOptional ? { optional: true } : {}),
    };
  }
  
  if ((match = input.match(rangeRegex))) {
    const [, num, max, unit, item] = match;
    const parsedNum = parseFloat(num);
    const parsedMax = max ? parseFloat(max) : undefined;

    return {
      num: parsedNum,
      ...(parsedMax ? { max: parsedMax } : {}),
      unit: normalizeUnit(unit),
      item,
      ...(isOptional ? { optional: true } : {}),
    };
  }

  if ((match = input.match(looseQuantityRegex))) {
    const [, num, rest] = match;
    return {
      num: parseFloat(num),
      unit: '',
      item: rest.trim(),
    };
  }
  
  // Fallback
  return {
    num: 1,
    unit: '',
    item: input,
    ...(isOptional ? { optional: true } : {}),
  };
}

function normalizeUnit(rawUnit) {
  const cleaned = rawUnit.toLowerCase().replace(/s$/, '');
  return unitMap[rawUnit.toLowerCase()] || unitMap[cleaned] || rawUnit;
}

function normalizeFractions(str) {
  return str
    .replace(/(\d+)\s*⁄\s*(\d+)/g, '$1/$2') // Unicode fraction slash
    .replace(/½/g, '1/2')
    .replace(/¼/g, '1/4')
    .replace(/¾/g, '3/4');
}
  