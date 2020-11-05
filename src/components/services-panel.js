import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react";

export default function ServicesPanel({
    services
  }) {
    let { title, subtitle } = services;
  
    return (
        <section class="services" style={{ 
            background: "green", 
            height: "90vh", 
            display: "flex", 
            justifyContent: "center", 
            flexDirection: "column", 
            color: "white",
            textAlign: "center",
            alignItems: "center" }}>
            <h1 style={{ fontSize: "6rem" }}>{ title }</h1>
            { subtitle ? 
                <h2>{ subtitle }</h2> : null }
        </section>
    )
}
