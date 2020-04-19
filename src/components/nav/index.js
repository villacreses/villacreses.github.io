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

const Nav = ({ location }) => {
  const data = useStaticQuery(query);

  // Since the Scrollspy component doesn't accept any ARIA attributes as props,
  // they're set manually here every time the user navigates to a new page.
  // Location prop doesn't change on click of <a href="#"> links
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('aria-hidden', 'true');
      ref.current.setAttribute('aria-expanded', 'false');
    }

    const activeScrollSpy = document.querySelector('.currentPage')

    if (activeScrollSpy) {
      activeScrollSpy.nextElementSibling.setAttribute('aria-hidden', 'false');
      activeScrollSpy.nextElementSibling.setAttribute('aria-expanded', 'true');
    }

    ref.current = activeScrollSpy;
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
              aria-haspopup={!!menu.links}
              activeClassName="currentPage"
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
