import React, { Fragment } from "react"
import { Link } from "gatsby"
import Scrollspy from "react-scrollspy"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import navMenus from '../../content/nav-menus';

import "./nav.scss"

const query = graphql`
  query {
    profileImage: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const MenuSection = props => (
  <div className="menu-section">
    {props.title && <Link to={`/${props.target}`}>{props.title}</Link>}
    {props.target === props.location && props.links && (
      <Scrollspy
        items={props.links.map(({ section }) => section)}
        currentClassName="active"
        className="scroll-spy"
      >
        {props.links.map(({ text, section }) => (
          <li key={section}>
            <a href={`#${section}`}>{text}</a>
          </li>
        ))}
      </Scrollspy>
    )}
  </div>
);

const Nav = props => (
  <StaticQuery
    query={query}
    render={data => (
      <nav id="sidebar">
        <Img
          fluid={data.profileImage.childImageSharp.fluid}
          className="profile-circle"
        />
        <div className="nav-main-menu">
          {navMenus.map(({ title, target, links }) => (
            <Fragment key={title}>
              <MenuSection
                location={props.location}
                target={target}
                links={links}
              />
            </Fragment>
          ))}
        </div>
      </nav>
    )}
  />
);

export default Nav;
