import { Link } from "gatsby"
import React from "react"

const MainNav = ({ menuLinks }) => (
    <nav>
        <ul style={{ display: "flex", margin: "0" }}>
            { menuLinks.map(link => (
            <li
                key={ link.name }
                style={{
                listStyleType: `none`,
                padding: `1rem`,
                margin: `0`
                }}
            >
                <Link 
                    style={{ 
                        color: `white`, 
                        fontWeight: `bold`, 
                        textDecoration: `none`, 
                        fontFamily: `Arial`, 
                        fontSize: `1.4rem`, 
                        padding: `0.5rem 1rem`, 
                        borderRadius: `20px` 
                    }}
                    activeStyle={{ 
                        backgroundColor: `white`, 
                        color: `rebeccapurple`
                    }}

                    to={ link.link }>
                    { link.name }
                </Link>
            </li>
            ))}
        </ul>
    </nav>
);

export default MainNav;