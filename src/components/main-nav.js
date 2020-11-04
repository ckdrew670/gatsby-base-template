import { Link } from "gatsby"
import React from "react"

const MainNav = ({ menuLinks }) => (
    <nav>
        <ul style={{ display: "flex", flex: 1 }}>
            { menuLinks.map(link => (
            <li
                key={ link.name }
                style={{
                listStyleType: `none`,
                padding: `1rem`,
                }}
            >
                <Link style={{ color: `white` }} to={ link.link }>
                    { link.name }
                </Link>
            </li>
            ))}
        </ul>
    </nav>
);

export default MainNav;