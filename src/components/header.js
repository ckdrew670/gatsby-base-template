import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react";
import MainNav from "../components/main-nav";

const Header = ({ siteTitle, menuLinks }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        display: `flex`,
        justifyContent: `space-between`,
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <MainNav menuLinks={ menuLinks }/>
      
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.array
}

Header.defaultProps = {
  siteTitle: ``,
  menuLinks: []
}

export default Header
