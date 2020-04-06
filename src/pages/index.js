import React from "react";
// import { Link } from "gatsby"

import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faStackOverflow,
  faMediumM,
  faHackerrank
} from '@fortawesome/free-brands-svg-icons';
import { faFileWord, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import SkillIcons from '../components/skill-icons';
import Seo from '../components/seo';
import ResumeItem from '../components/resume-item';

import {
  socialIcons,
  awards,
  education,
  experience
} from '../content';

const iconMap = {
  'fab fa-linkedin-in': faLinkedinIn,
  'fab fa-github': faGithub,
  'fab fa-stack-overflow': faStackOverflow,
  'fab fa-medium-m': faMediumM,
  'fab fa-hackerrank': faHackerrank,
  'far fa-file-word': faFileWord
};

const email = 'MarioVillacreses@outlook.com';

const IndexPage = props => (
  <Layout location={props['*']}>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section id="intro">
      <h1>Mario <span className="blue">Villacreses</span></h1>
      <div className="subheading">
        <span>
          Boston, MA
        </span>
        {' '}
        <span className="blue">
          <span className="desktop">
            {email}
          </span>
          <a href={`mailto:${email}`} className="mobile">
            <FontAwesomeIcon icon={faEnvelope} />
            {' '}
            <span>Contact</span>
          </a>
        </span>
      </div>
  
      <p className="lead">
        I'm a software developer currently based in the Greater Boston Area.
      </p>
      <p>
        After having managed databases for various small businesses for several years, I've decided to take my career to the next level. I've switched over to full-stack web development and have been thoroughly enjoying it. Having graduated with a BA in Applied Mathematics, I'm particularly interested in analytics and security, though my passion for problem solving shines through in whatever tasks are given to me.
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

        <section id={experience.id}>
          <h2>{experience.heading}</h2>
          {experience.content.map(({ key, ...data }) => <ResumeItem key={key} {...data} />)}
        </section>
        <hr />

        <section id={awards.id}>
          <h2>{awards.heading}</h2>
          {awards.content.map(({ key, ...data }) => <ResumeItem key={key} {...data} />)}
        </section>
        <hr />

        <section id={education.id}>
          <h2>{education.heading}</h2>
          {education.content.map(({ key, ...data }) => <ResumeItem key={key} {...data} />)}
        </section>
        <hr />

    <section id="skills">
      <h2>Skills</h2>
      <div className="subheading">
        Programming Languages &amp; Tools
      </div>
      <SkillIcons />
    </section>
  </Layout>
);

export default IndexPage;
