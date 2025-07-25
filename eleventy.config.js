import markdownIt from "markdown-it";

const md = new markdownIt();

export default async function(eleventyConfig) {
	// Configure Eleventy
  eleventyConfig.addNunjucksFilter("markdown", function(content) {
    return md.render(content);
  });
};