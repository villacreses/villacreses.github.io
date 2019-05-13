const awards = [
  {
    date: 'September 2018',
    heading: 'Graph Hacks 2018: Buzzword Bingo Hackathon',
    subheading: 'Winner: Most Complete Project',
    paragraphs: [
      {
        key: 'desc1',
        content: 'A recipe recommendation engine built with React, Axios.js, Python 3, and Neo4j graph database platform.',
      }
    ]
  },
  {
    date: 'August 2018',
    heading: 'NY Sextech Hackathon',
    subheading: 'Winner: First Place',
    paragraphs: [
      {
        key: 'desc1',
        content: 'I collaborated with UI/UX Designers and a certified health education teacher to develop a health education video streaming platform for high schools, built using Firebase & React. The NY Board of Education is considering adoption within select schools.'
      },
      {
        key: 'sextech-articles',
        type: 'HREF_LIST',
        opener: 'Featured articles:',
        liArr: [
          {
            href: 'https://www.menshealth.com/sex-women/a23064407/sex-tech-hackathon/',
            text: `Men's Health - "I Went to a 'Shark Tank' for Sex Tech Entrepreneurs, and Here's What I Saw"`
          },
          {
            href: 'https://www.forbes.com/sites/estrellajaramillo/2018/09/18/technology-meets-sex-to-solve-some-of-the-most-pressing-concerns-of-our-times/#385cb0e91810',
            text: 'Forbes - "Technology Meets Sex To Solve Some Of The Most Pressing Concerns Of Our Times"'
          }
        ]
      }
    ]
  }
];

export default awards;
