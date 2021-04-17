/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Nav from '../nav'

import './flex.css';
import "./layout.css";
import './layout-custom.scss';

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Layout = ({ children, location }) => {
  const data = useStaticQuery(query);
  return (
    <>
      <Nav location={location} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
