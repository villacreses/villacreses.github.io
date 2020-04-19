import React, { useEffect } from "react"
import { Link } from "gatsby"
import Scrollspy from "react-scrollspy"
import { graphql, useStaticQuery } from "gatsby"

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

  return (
    <nav
      id="sidebar"
      className="flex-col justify-center align-center"
    >
      <ul aria-label="main navigation">
        {data.menus.nodes.map(menu => (
          <li key={menu.slug}>
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
                  <li key={slug}>
                    <a href={`#${slug}`}>{text}</a>
                  </li>
                ))}
              </Scrollspy>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
