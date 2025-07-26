import markdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";

const options = {
  html: true,
  linkify: true,
  breaks: true
};

export const markdownLib = markdownIt(options).use(markdownItLinkAttributes, {
  pattern: /^https?:\/\//, // Match external links
  attrs: {
    target: "_blank",
    rel: "noopener"
  }
});