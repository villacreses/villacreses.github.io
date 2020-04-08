import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faStackOverflow,
  faMediumM,
  faHackerrank
} from '@fortawesome/free-brands-svg-icons';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';

import socialIcons from '../content/social-icons';

const IconRenderer = ({ schema, iconMap }) => schema.map(
  ({ title, href, icon }) => (
    <a
      key={href}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={iconMap[icon]} />
    </a>
  )
);

const SocialIcons = () => (
  <div className="social-icons">
    <IconRenderer
      schema={socialIcons}
      iconMap={{
        linkedin: faLinkedinIn,
        github: faGithub,
        stackOverflow: faStackOverflow,
        medium: faMediumM,
        hackerRank: faHackerrank,
        msWord: faFileWord,
      }}
    />
  </div>
);

export default SocialIcons;
