import markdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import extFootnote from 'markdown-it-footnote';
import extDefList from 'markdown-it-deflist';
import extPrism from 'markdown-it-prism';
import extAttrs from 'markdown-it-attrs';

const options = {
  html: true,
  linkify: true,
  breaks: true
};

export const markdownLib = markdownIt(options)
  .use(extFootnote)
  .use(extDefList)
  .use(extPrism)
  .use(extAttrs)
  .use(markdownItLinkAttributes, {
    pattern: /^https?:\/\//, // Match external links
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });
