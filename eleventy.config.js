import markdownIt from "markdown-it";
import yaml from "js-yaml";

const md = new markdownIt();

export default async function(eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents)); 

  eleventyConfig.addNunjucksFilter("markdown", function(content) {
    return md.render(content);
  });

  return {
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};