const content = [
  {
    key: 'experience-knovva',
    date: 'November 2018 - Present',
    heading: 'Knovva Academy',
    subheading: 'Full Stack Web Developer',
    paragraphs: [
      {
        key: 'knovva-p1',
        type: 'HREF_LIST',
        liArr: [
          {
            key: 'knovva-li-1',
            text: 'Developed user interface components in React, reducing component sizes by up to 50%'
          },
          {
            key: 'knovva-li-2',
            text: 'Worked with a cloud architect to build analytics dashboards for project managers and student relationship managers.'
          }
        ]
      }
    ]
  },
  {
    key: 'experience-odyssey',
    date: 'November 2013 - May 2014',
    heading: 'New World Odyssey Import & Export, Inc.',
    subheading: 'Co-founder & Webmaster',
    paragraphs: [
      {
        key: 'odyssey-p1',
        type: 'HREF_LIST',
        liArr: [
          {
            key: 'odyssey-li-1',
            text: 'Built and maintained an online catalog of medical technologies using HTML5, CSS, and jQuery'
          },
          {
            key: 'odyssey-li-2',
            text: 'Researched and maintained database of U.S.-manufactured medical technologies '
          }
        ]
      }
    ]
  },
  {
    key: 'experience-hfp',
    date: 'June 2010 - January 2013',
    heading: 'HFP Capital Markets',
    subheading: 'Intern',
    paragraphs: [
      {
        key: 'hfp-p1',
        type: 'HREF_LIST',
        liArr: [
          {
            key: 'hfp-li-1',
            text: 'Catalogued transaction records and customer accounts'
          },
          {
            key: 'hfp-li-2',
            text: 'Prepared transaction reports to streamline the government auditing process'
          }
        ]
      }
    ]
  }
];

const experience = {
  id: 'experience',
  heading: 'Experience',
  content
};

export default experience;
