import React, { useEffect, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Scrollspy from "react-scrollspy"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars } from '@fortawesome/free-solid-svg-icons';

import "./nav.scss"

const query = graphql`
  query {
    menus: allNavMenusJson {
      nodes {
        slug
        title
        target
        links {
          slug
          text
        }
      }
    }
  }
`;

const ref = React.createRef();

const resetScrollMenu = menu => {
  menu.setAttribute('aria-hidden', 'true');
  menu.setAttribute('aria-expanded', 'false');
}; 

const Nav = ({ location }) => {
  const data = useStaticQuery(query);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach(link => {
      const title = link.attributes.getNamedItem('data-menu-title').nodeValue;
      link.nextElementSibling.setAttribute('aria-label', `${title} submenu`);
      resetScrollMenu(link.nextElementSibling);
    })
  }, [])

  // Since the Scrollspy component doesn't accept any ARIA attributes as props,
  // they're set manually here every time the user navigates to a new page.
  // Location prop doesn't change on click of <a href="#"> links
  useEffect(() => {
    if (ref.current) {
      resetScrollMenu(ref.current);
    }

    const activePageLink = document.querySelector('.currentPage')

    if (activePageLink) {
      activePageLink.nextElementSibling.setAttribute('aria-hidden', 'false');
      activePageLink.nextElementSibling.setAttribute('aria-expanded', 'true');
      ref.current = activePageLink.nextElementSibling;
    }
  }, [location])

  const mainNavClass = open ? 'main-nav open' : 'main-nav';

  return (
    <nav
      id="sidebar"
      className="flex-col justify-center"
    >
      <button
        className="burger"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={mainNavClass} aria-label="main navigation">
        {data.menus.nodes.map(menu => {
          const menuClass = menu.target === location.pathname ? 'current' : '';

          return (
            <li key={menu.slug} className={`page-menu ${menuClass}`}>
              <Link
                to={menu.target}
                className="page-link"
                activeClassName="currentPage"
                aria-haspopup={!!menu.links}
                data-menu-title={menu.title}
              >
                {menu.title}
              </Link>
              {menu.links && (
                <Scrollspy
                  className="scroll-spy"
                  items={menu.links.map(({ slug }) => slug)}
                  currentClassName="active-section"
                >
                  {menu.links.map(({ slug, text }) => (
                    <li key={slug} className="scroll-link">
                      <a
                        href={`#${slug}`}
                        onClick={() => { if (open) setOpen(false) }}
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </Scrollspy>
              )}
            </li>
          )}
        )}
      </ul>
    </nav>
  );
};

export default Nav;
