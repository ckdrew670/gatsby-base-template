import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react";
import MainNav from "../components/main-nav";

const Header = ({ siteTitle, menuLinks }) => (
  <header class="site-header">
    <div class="site-header__content">
      <h1 class="site-header__title">
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
