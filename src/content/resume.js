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
        }
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
