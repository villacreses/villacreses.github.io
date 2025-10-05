import { formatRecipeJSON } from "./parsers.js";
import Recipe from "./Recipe.js";


document.addEventListener('DOMContentLoaded', onDOMLoaded);

function onDOMLoaded() {
  Recipe.register();
  
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

      
      const data = await res.json().catch(err => {
        throw new Error('Error in parsing response body', err);
      });

      if (data.error) throw new Error('Server error:', data.error)
      console.log('Raw:', data);

      const node = new Recipe(data);
      
      console.log('node', node)
    } catch (err) {
      console.error(err);
    }
  });
}

