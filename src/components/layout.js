/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import ThemeLayout from "./gatsby-theme-cocktail/src/components/layout"

// import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  return <ThemeLayout>{children}</ThemeLayout>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
