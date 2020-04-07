import BulletList from "../components/resume/ResumeItem/BulletList";

const resume = [
  {
    id: 'experience',
    component: 'ResumeSection',
    props: {
      schema: [
        {
          id: 'section-heading',
          component: 'h2',
          props: {
            text: 'Experience',
          }
        },
        {
          id: 'knovva',
          component: 'ResumeItem',
          props: {
            heading: 'Knovva Academy',
            subheading: 'Full Stack Web Developer',
            date: 'November 2018 - January 2020',
            schema: [
              {
                id: 'knovva-impact',
                component: 'BulletList',
                props: {
                  items: [
                    {
                      id: 'knovva-impact-1',
                      text: 'Developed user interface components in React, reducing component sizes by up to 50%'
                    },
                    {
                      id: 'knovva-impact-2',
                      text: 'Worked with a cloud architect to build analytics dashboards for project managers and student relationship managers.'
                    },
                  ],
                },
              }
            ]
          }
        },
        {
          id: 'odyssey',
          component: 'ResumeItem',
          props: {
            heading: 'New World Odyssey Import & Export, Inc.',
            subheading: 'Co-founder & Webmaster',
            date: 'November 2013 - May 2014',
            schema: [
              {
                id: 'odyssey-impact',
                component: 'BulletList',
                props: {
                  items: [
                    {
                      id: 'odyssey-impact-1',
                      text: 'Built and maintained an online catalog of medical technologies using HTML5, CSS, and jQuery'
                    },
                    {
                      id: 'odyssey-impact-2',
                      text: 'Researched and maintained database of U.S.-manufactured medical technologies '
                    },
                  ],
                },
              }
            ],
          },
        },
        {
          id: 'hfp',
          component: 'ResumeItem',
          props: {
            heading: 'HFP Capital Markets',
            subheading: 'Intern',
            date: 'June 2010 - January 2013',
            schema: [
              {
                id: 'hfp-impact',
                component: 'BulletList',
                props: {
                  items: [
                    {
                      id: 'hfp-impact-1',
                      text: 'Catalogued transaction records and customer accounts',
                    },
                    {
                      id: 'hfp-impact-2',
                      text: 'Prepared transaction reports to streamline the government auditing process',
                    },
                  ]
                }
              }
            ]
          },
        },
      ]
    }
  },
  {
    id: 'awards',
    component: 'ResumeSection',
    props: {
      schema: [
        {
          id: 'section-heading',
          component: 'h2',
          props: {
            text: 'Awards',
          }
        },
        {
          id: 'graph-hacks-2018',
          component: 'ResumeItem',
          props: {
            heading: 'Graph Hacks 2018: Buzzword Bingo Hackathon',
            subheading: 'Winner: Most Complete Project',
            date: 'September 2018',
            schema: [
              {
                id: 'desc',
                component: 'Paragraph',
                props: {
                  text: 'A recipe recommendation engine built with React, Axios.js, Python 3, and Neo4j graph database platform.',
                },
              },
            ],
          },
        },
        {
          id: 'sextech',
          component: 'ResumeItem',
          props: {
            heading: 'NY Sextech Hackathon',
            subheading: 'Winner: First Place',
            date: 'August 2018',
            schema: [
              {
                id: 'desc',
                component: 'Paragraph',
                props: {
                  text: 'I collaborated with UI/UX Designers and a certified health education teacher to develop a health education video streaming platform for high schools, built using Firebase & React. The NY Board of Education is considering adoption within select schools.',
                }
              },
              {
                id: 'articles',
                component: 'BulletList',
                props: {
                  opener: 'Featured articles:',
                  items: [
                    {
                      key: 'socratex-mens-health',
                      href: 'https://www.menshealth.com/sex-women/a23064407/sex-tech-hackathon/',
                      text: `Men's Health - "I Went to a 'Shark Tank' for Sex Tech Entrepreneurs, and Here's What I Saw"`
                    },
                    {
                      key: 'socratex-forbes',
                      href: 'https://www.forbes.com/sites/estrellajaramillo/2018/09/18/technology-meets-sex-to-solve-some-of-the-most-pressing-concerns-of-our-times/#385cb0e91810',
                      text: 'Forbes - "Technology Meets Sex To Solve Some Of The Most Pressing Concerns Of Our Times"'
                    },
                  ],
                },
              }
            ],
          },
        },
      ]
    }
  },
  {
    id: 'education',
    component: 'ResumeSection',
    props: {
      schema: [
        {
          id: 'section-heading',
          component: 'h2',
          props: {
            text: 'Education',
          }
        }
      ]
    }
  },
];

export default resume;
