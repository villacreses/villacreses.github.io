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

import {
  socialIcons,
  awards,
  education
} from '../content';

const iconMap = {
  'fab fa-linkedin-in': faLinkedinIn,
  'fab fa-github': faGithub,
  'fab fa-stack-overflow': faStackOverflow,
  'fab fa-medium-m': faMediumM
};

const IndexPage = props => {
  return (
    <Layout location={props['*']}>
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

      <section id="skills">
        <h2>Skills</h2>
        <div className="subheading">
          Programming Languages &amp; Tools
        </div>
      </section>
      <hr />

      <section id="projects">
        <h2>Select Projects</h2>
        <Link to="/portfolio">See More</Link>
      </section>
      <hr />

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
