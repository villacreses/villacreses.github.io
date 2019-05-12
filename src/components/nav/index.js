import React from 'react';
import { Link } from 'gatsby';
import Scrollspy from 'react-scrollspy';

import './nav.scss';

const links = [
  { text: 'About me', section: 'about' },
  { text: 'Awards', section: 'awards' },
  { text: 'Education', section: 'education' },
  { text: 'Skills', section: 'skills' },
  { text: 'Portfolio', section: 'portfolio' },
  { text: 'Interests', section: 'interests' },
];

const items = links.map(({ section }) => section);

const Nav = () => {
  return (
    <nav id="sidebar">
      <img
        className="profile-circle"
        src="http://mariovillacreses.com/img/profile.jpg"
      />
      <Scrollspy
        items={items}
        currentClassName="active"
      >
        {links.map(({ text, section }) => (
          <li key={section}>
            <a href={`#${section}`}>
              {text}
            </a>
          </li>
        ))}
      </Scrollspy>
    </nav>
  );
};

export default Nav;
