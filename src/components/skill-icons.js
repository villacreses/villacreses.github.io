import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

const query = graphql`
  query {
    allSkillLogosJson {
      nodes {
        title
        slug
        image {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const SkillLogos = () => {
  const data = useStaticQuery(query);
  return (
    <div className="skill-logo-container">
      {data.allSkillLogosJson.nodes.map(({ image, slug, ...imageProps }) => (
        <Image
          {...imageProps}
          key={slug}
          className={`skill-logo ${imageProps.key}`}
          fluid={image.childImageSharp.fluid}
        />
      ))}
    </div>
  );
}

export default SkillLogos;
