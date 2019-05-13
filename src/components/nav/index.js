import React from "react"
import { Link } from "gatsby"
import Scrollspy from "react-scrollspy"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./nav.scss"

const links = [
  { text: "About me", section: "about" },
  { text: "Awards", section: "awards" },
  { text: "Education", section: "education" },
  { text: "Skills", section: "skills" },
  { text: "Portfolio", section: "portfolio" },
  { text: "Interests", section: "interests" }
]

const items = links.map(({ section }) => section)

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

const Nav = () => {
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
            <Scrollspy items={items} currentClassName="active">
              {links.map(({ text, section }) => (
                <li key={section}>
                  <a href={`#${section}`}>{text}</a>
                </li>
              ))}
            </Scrollspy>
          </nav>
        )
      }}
    />
  )
}
export default Nav
