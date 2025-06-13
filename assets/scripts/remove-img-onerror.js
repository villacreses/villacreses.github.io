export default function setupRemoveImgOnError() {
  document.querySelectorAll("img[data-remove-on-error]").forEach(img => {
    const existingHandler = img.onerror;
    
    img.onerror = function (event) {
      if (typeof existingHandler === 'function') {
        try {
          existingHandler.call(this, event);
        } catch (err) {
          console.warn('Existing onerror handler threw an error:', err);
        }
      }
      
      console.warn(`Removing failed image: ${this.src}`);
      this.remove();
    };
  }); 
}