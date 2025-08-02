import markdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import extFootnote from 'markdown-it-footnote';
import extDefList from 'markdown-it-deflist';
import extPrism from 'markdown-it-prism';
import extAttrs from 'markdown-it-attrs';
import extCallouts from 'markdown-it-callouts';

export const markdownLib = markdownIt({ html: true })
  .use(extFootnote)
  .use(extDefList)
  .use(extPrism)
  .use(extAttrs)
  .use(extCallouts, {
    emptyTitleFallback: "match-type",
    calloutTitleElementType: "header",
  })
  .use(markdownItLinkAttributes, {
    pattern: /^https?:\/\//, // Match external links
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });
