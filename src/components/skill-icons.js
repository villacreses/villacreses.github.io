import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query {
    js: file(relativePath: { eq: "javascript.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    node: file(relativePath: { eq: "node.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    html_css: file(relativePath: { eq: "html-html5-css-css3.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    sass: file(relativePath: { eq: "sass.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    react: file(relativePath: { eq: "react.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    redux: file(relativePath: { eq: "redux.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    git: file(relativePath: { eq: "git.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    sql: file(relativePath: { eq: "sql.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    postgres: file(relativePath: { eq: "postgres.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    mongo: file(relativePath: { eq: "mongo.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const key = ({ src }) => src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));

const SkillLogos = () => (
  <StaticQuery
    query={query}
    render={data => {
      const images = Object.values(data).map(({ childImageSharp: { fluid } }) => fluid);
      const keyMap = images.map(key);
      return (
        <div className="skill-logo-container">
          {images.map((fluidData, i) => {
            return (
              <Img
                key={keyMap[i]}
                className={`skill-logo ${keyMap[i]}`}
                fluid={fluidData}
              />
            );
          })}
        </div>
      );
      }
    }
  />
);

export default SkillLogos;
