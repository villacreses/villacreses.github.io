import React from "react";
import { Link } from "gatsby"

import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faStackOverflow,
  faMediumM
} from '@fortawesome/free-brands-svg-icons';

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Nav from '../components/nav';
import ResumeItem from '../components/resume-item';

const iconMap = {
  'fab fa-linkedin-in': faLinkedinIn,
  'fab fa-github': faGithub,
  'fab fa-stack-overflow': faStackOverflow,
  'fab fa-medium-m': faMediumM
};

const socialIcons = [
  { 
    title: 'Add me on LinkedIn',
    href: 'https://www.linkedin.com/in/villacreses/',
    iconClass: 'fab fa-linkedin-in'
  },
  {
    title: 'My GitHub profile',
    href: 'https://github.com/villacreses',
    iconClass: 'fab fa-github'
  },
  {
    title: 'My StackOverflow profile',
    href: 'https://stackoverflow.com/story/villacreses',
    iconClass: 'fab fa-stack-overflow'
  },
  {
    title: 'My Medium profile',
    href: 'https://medium.com/@villacreses',
    iconClass: 'fab fa-medium-m'
  }
];

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
      }
    ]
  }
];

const education = [
  {
    date: 'May 2018',
    heading: 'Fullstack Academy of Code',
    paragraphs: [
      {
        key: 'desc1',
        content: 'Software engineering immersive focused on full-stack web development using Node, Express, React, Redux, Sequelize, and PostgreSQL; additional instruction on data structures and algorithms.'
      }
    ]
  },
  {
    date: 'May 2016',
    heading: 'Queens College, City University of New York',
    paragraphs: [
      {
        key: 'desc1',
        opener: 'CS Courses',
        content: ' Algorithms, OOP in Java, OOP in C++, Data Structures, Computer Organization & Assembly Language'
      },
      {
        key: 'desc1',
        opener: 'Mathematics Courses',
        content: 'Linear Programming, Nonlinear Programming, Advanced Linear Algebra, Number theory, Game theory, Mathematical Problem Solving, Probability & Statistics, Chaotic Dynamical Systems, Advanced Calculus, Differential Geometry'
      },
    ]
  }
];

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <section id="about">
        <h1>Mario <span className="blue">Villacreses</span></h1>
        <div className="subheading">
          <span>
            Boston, MA
          </span>
          {' '}
          <span className="blue">
            MarioVillacreses@outlook.com
          </span>
        </div>
        <p className="lead">
          I'm a software developer currently based in the Greater Boston Area.
        </p>
        <p>
          After having managed databases for various small businesses for several years, I've decided to take my career to the next level. I've switched over to full-stack web development and have been thoroughly enjoying it. Having graduated with a BA in Applied Mathematics, I'm particularly interested in analytics and security, though my passion for problem solving shines through in whatever tasks are given to me.
        </p>
        <p>
          My resume is available in the following formats:
        </p>
        <div className="social-icons">
          {socialIcons.map(({ title, href, iconClass }) => (
            <a key={href} href={href} title={title} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={iconMap[iconClass]} />
            </a>
          ))}
        </div>
      </section>
      <hr />

      <section id="awards">
        <h2>Awards</h2>
        {awards.map(props => <ResumeItem {...props} />)}
      </section>
      <hr />

      <section id="education">
        <h2>Education</h2>
        {education.map(props => <ResumeItem {...props} />)}
      </section>
      <hr />

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
