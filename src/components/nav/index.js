import React from "react"
import { Link } from "gatsby"
import Scrollspy from "react-scrollspy"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

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

const MenuSection = props => 
  <div className="menu-section">
    <Link to={`/${props.target}`}>{props.title}</Link>
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

const Nav = props => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <nav id="sidebar">
            <Img
              fluid={data.profileImage.childImageSharp.fluid} 
              className="profile-circle"
            />
            <MenuSection
              title="About Me"
              location={props.location}
              target=""
              links={[
                { text: "Intro", section: "intro" },
                { text: "Awards", section: "awards" },
                { text: "Education", section: "education" },
                { text: "Skills", section: "skills" }
              ]}
            />
            <hr />
            <MenuSection
              title="My portfolio"
              location={props.location}
              target="portfolio"
            />
          </nav>
        )
      }}
    />
  )
}
export default Nav
