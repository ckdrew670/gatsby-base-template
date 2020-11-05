import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react";
import heroImage from "../assets/images/lighthouse.jpg"

export default function Hero({
    hero
  }) {
    let { title, subtitle } = hero;
  
    return (
        <section class="hero" style={{ 
            backgroundImage: `url(${heroImage})`, 
            height: "90vh", 
            display: "flex", 
            justifyContent: "center", 
            flexDirection: "column", 
            color: "white", 
            alignItems: "center" }}>
            <h1 style={{ fontSize: "6rem" }}>{ title }</h1>
            { subtitle ? 
                <h2>{ subtitle }</h2> : null }
        </section>
    )
  }
