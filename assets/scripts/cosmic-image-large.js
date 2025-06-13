export class CosmicLargeImageHandler {
  static cosmicBaseUrl = "https://imgix.cosmicjs.com/";

  constructor(imgElement) {
    this.img = imgElement;
    if (!this.img) {
      console.warn("CosmicImageHandler: Image element not found.");
      return;
    }

    this.loadImage();
  }

  loadImage() {
    const imageId = this.img.getAttribute("data-large-src");
    if (!imageId) {
      console.warn("CosmicImageHandler: No 'data-large-src' found on image element.");
      return;
    }

    const width = this.img.width || "auto";
    const height = this.img.height || "auto";

    // Build Cosmic CDN URL dynamically
    const imageUrl = `${CosmicImageHandler.cosmicBaseUrl}${imageId}?w=${width}&h=${height}&q=80`;
    this.img.src = imageUrl;

    this.img.onload = () => {
      console.log(`CosmicImageHandler: Image loaded successfully (${imageUrl})`);
    };

    this.img.onerror = () => {
      console.warn(`CosmicImageHandler: Failed to load image (${imageUrl})`);
      this.img.style.display = "none";
    };
  }

  // Static method to initialize all Cosmic images at once
  static initializeAll() {
    document.querySelectorAll("img[data-large-src]").forEach((img) => {
      new CosmicImageHandler(img);
    });
  }
}

export const loadLargeCosmicImages = CosmicImageHandler.initializeAll;

// Initialize automatically on DOMContentLoaded
document.addEventListener("DOMContentLoaded", CosmicImageHandler.initializeAll);
