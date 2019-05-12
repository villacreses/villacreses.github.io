import React from 'react';
import { Link } from 'gatsby';
import './nav.scss';

const Nav = () => {
  const links = [
    { text: 'About me', href: '#about' },
    { text: 'Awards', href: '#awards' },
    { text: 'Education', href: '#education' },
    { text: 'Skills', href: '#skills' },
    { text: 'Portfolio', href: '#portfolio' },
    { text: 'Interests', href: '#interests' },
  ];

  return (
    <nav id="sidebar">
      <ul>
        {links.map(({ text, href }) => (
          <li key={href}>
            <Link to={href}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
