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

const Nav = () => {
  const data = useStaticQuery(query);

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
                className="scoll-spy"
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
