import React from "react";
// import { Link } from "gatsby"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import Seo from '../components/seo';

import SchemaRenderer from '../components/SchemaRenderer';
import ResumeSection from '../components/resume/ResumeSection'
import resume from '../content/resume';

import SocialIcons from '../components/social-icons';

const email = 'MarioVillacreses@outlook.com';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section id="intro">
      <header>
        <h1>Mario <span className="blue">Villacreses</span></h1>
        <div className="subheading">
          <span>
            Palo Alto, CA
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
      </header>
  
      <p className="lead">
        I'm a full stack software engineer at <a href="https://doc.ai/" target="_blank" rel="noopener noreferrer">doc.ai</a>
      </p>
      <p>
        I graduated with a BA in Applied Mathematics, but my startup experience during college left me with an appetite for web development. 
        After college I attended a coding bootcamp, learned full stack web development in Javascript and launched my career from there.
      </p>
      <SocialIcons />
    </section>
    <hr />
    <SchemaRenderer
      schema={resume}
      componentMap={{ ResumeSection }}
    />
  </Layout>
);

export default IndexPage;
