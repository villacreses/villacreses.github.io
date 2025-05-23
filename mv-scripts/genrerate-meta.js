/**
 * Just a quick script to print out meta tags to copy-paste.
 * Sure, a bit more work than auto-generating, but still no managing packages.
 * Although I still use node to run it haha.
 * 
 * Metadata types:
 * https://github.com/vercel/next.js/blob/c810c30c4e988d84b99da906ccef8755ff0e1c85/packages/next/src/lib/metadata/types/metadata-interface.ts#L90
 * 
 * OpenGraph types:
 * https://github.com/vercel/next.js/blob/c810c30c4e988d84b99da906ccef8755ff0e1c85/packages/next/src/lib/metadata/types/opengraph-types.ts
 */

const baseData = {
  title: 'Mario Villacreses',
  description: 'Personal website for Mario Villacreses',
  author: 'Mario Villacreses',
  keywords: ['portfolio', 'software engineer'].join(', '),
  openGraph: {
    type: 'website',
    url: "https://mariovillacreses.com/",
    site_name: "Mario Villacreses",
  },
};

const nowPageData = {
  page: 'Now page',
  title: 'Now | Mario Villacreses',
  description: `My Now page offers a quick snapshot of where I've recently been investing my energy. If we haven't connected in the last six months, you can catch up on my latest endeavors here.`,
  openGraph: {
    url: "https://mariovillacreses.com/now",
  },
};

const careerPageData = {
  page: 'Career page',
  title: 'Career | Mario Villacreses',
  description: `This page highlights my work history, along with any significant accomplishments that shaped me as I've navigated the tech industry.`,
  openGraph: {
    url: "https://mariovillacreses.com/career",
  },

}

print([baseData, nowPageData, careerPageData])

function print(dataObjArr) {
  const format = (obj, prefix = '', keyAttr = 'name') =>
    Object
      .entries(obj)
      .map(([key, value]) =>
        `<meta ${keyAttr}="${prefix}${key}" content="${value}">`
      );

  dataObjArr
    .map(pageData => ({
      ...baseData,
      ...pageData,
      openGraph: {
        ...baseData.openGraph,
        ...pageData?.openGraph,
        title: pageData.title || baseData.title,
        description: pageData.description || baseData.description,
      },
      twitter: {
        card: 'summary',
        title: pageData.title || baseData.title,
        description: pageData.description || baseData.description,
      }
    })).map(({ page = 'Home', openGraph, twitter, ...rest }) => {
      const baseMeta = format(rest);
      const ogMeta = format(openGraph, 'og:', 'property');
      const twitterMeta = format(twitter, 'twitter:');

      return [page].concat(baseMeta, ogMeta, twitterMeta).join('\n');
    }).forEach(output => console.log(output, '\n'))
}
