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

const socialIcons = [
  { 
    title: 'Add me on LinkedIn',
    href: 'https://www.linkedin.com/in/villacreses/',
    icon: faLinkedinIn
  },
  {
    title: 'My GitHub profile',
    href: 'https://github.com/villacreses',
    icon: faGithub
  },
  {
    title: 'My StackOverflow profile',
    href: 'https://stackoverflow.com/story/villacreses',
    icon: faStackOverflow
  },
  {
    title: 'My Medium profile',
    href: 'https://medium.com/@villacreses',
    icon: faMediumM
  }
];

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <section>
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
          {socialIcons.map(({ title, href, icon }) => (
            <a key={href} href={href} title={title} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </section>
      <hr />
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
