import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faStackOverflow,
  faMediumM,
  faHackerrank
} from '@fortawesome/free-brands-svg-icons';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';

const query = graphql`
  query {
    allSocialIconsJson {
      nodes {
        title
        slug
        href
      }
    }
  }
`;

const map = {
  linkedin: faLinkedinIn,
  github: faGithub,
  stackOverflow: faStackOverflow,
  medium: faMediumM,
  hackerRank: faHackerrank,
  msWord: faFileWord,
};

const SocialIcons = () => {
  const data = useStaticQuery(query);

  return (
    <div className="social-icons">
      {data.allSocialIconsJson.nodes.map(({ slug, ...linkProps }) => (
        <a key={slug} target="_blank" rel="noopener noreferrer" {...linkProps}>
          <FontAwesomeIcon icon={map[slug]} />
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;
