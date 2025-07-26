import markdownIt from "markdown-it";
import yaml from "js-yaml";
import * as sass from "sass";
import path from "node:path";
import site from './_data/site.js';

const md = new markdownIt();

export default async function(eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents)); 

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // Output as .css
    useLayouts: false, // Disable layout processing

    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) return;

      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      this.addDependencies(inputPath, result.loadedUrls);

      return async () => result.css;
    },
  });

  eleventyConfig.addNunjucksFilter("asPageTitle", function(content) {
    const initContent = content || site.title;
    return initContent === site.title ? initContent : `${initContent} | ${site.title}`;
  });
  eleventyConfig.addNunjucksFilter("defaultStr", function(content, defaultContent) {
    return content || defaultContent;
  });
  eleventyConfig.addNunjucksFilter("markdown", function(content) {
    return md.render(content);
  });
  eleventyConfig.addNunjucksFilter("notEqual", function (arr, userString) {
		return arr.filter(str => str !== userString);
	});


  eleventyConfig.addPassthroughCopy("assets/styles/**/*.css");
  eleventyConfig.addPassthroughCopy("assets/**/*.js");
  eleventyConfig.addPassthroughCopy("index.css");
  eleventyConfig.addPassthroughCopy("index.js");

  eleventyConfig.addWatchTarget("assets/styles/**/*.scss");

  return {
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "scss"]
  };
};