import React, { Fragment } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import Seo from '../components/seo';
import ResumeItem from '../components/ResumeItem';
import SocialIcons from '../components/social-icons';

import resume from '../content/resume.yaml';
import intro from '../content/intro.yaml';

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section id="intro">
      <header>
        <h1>Mario <span className="blue">Villacreses</span></h1>
        <div className="subheading">
          <span>{intro.location}</span>
          {' '}
          <span className="blue">
            <span className="desktop">
              {intro.email}
            </span>
            <a href={`mailto:${intro.email}`} className="mobile">
              <FontAwesomeIcon icon={faEnvelope} />
              {' '}
              <span>Contact</span>
            </a>
          </span>
        </div>
      </header>
  
      <p className="lead">
        <span>{intro.lead.main + ' '}</span>
        <a
          href={intro.lead.link.href} 
          target="_blank" rel="noopener noreferrer"
        >
          {intro.lead.link.text}
        </a>
      </p>
      <p>{intro.description}</p>
      <SocialIcons />
    </section>
    <hr />
    {resume.map(({ id, heading, items = [], hideHr }) => (
      <Fragment key={id}>
        <section id={id}>
          {heading && <h2 id="section-heading">{heading}</h2>}
          {items.map(item => <ResumeItem key={item.id} {...item} />)}
        </section>
        {!hideHr && <hr />}
      </Fragment>
    ))}
  </Layout>
);

export default IndexPage;
