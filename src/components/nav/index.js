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
  <div>
    <Link to={`/${props.location}`}>{props.title}</Link>
    {props.target === props.location && props.links && (
      <Scrollspy 
        items={props.links.map(({ section }) => section)} 
        currentClassName="active"
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
                { text: "About me", section: "about" },
                { text: "Awards", section: "awards" },
                { text: "Education", section: "education" },
                { text: "Skills", section: "skills" },
                { text: "Projects", section: "projects" },
                { text: "Interests", section: "interests" }
              ]}
            />
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
