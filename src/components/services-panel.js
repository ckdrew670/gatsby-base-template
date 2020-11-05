import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react";

export default function ServicesPanel({
    services
  }) {
    const servicesData = useStaticQuery(
        graphql`
          query {
            allMarkdownRemark(filter: {fields: {collection: {eq: "services"}}}) {
                edges {
                  node {
                    id
                    frontmatter {
                      title
                    }
                    html
                  }
                }
            }
          }
        `
    )
    

    let { title, subtitle, ctaText, ctaUrl } = services;
    let data = servicesData.allMarkdownRemark.edges;

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
                <h2 style={{ margin: "1rem 2rem" }}>{ subtitle }</h2> : null }

            <div class="services-list" style={{ 
                background: "green", 
                height: "auto", 
                display: "flex", 
                justifyContent: "center", 
                flexDirection: "row", 
                color: "black",
                textAlign: "center",
                alignItems: "center",
                margin: "0 2rem" }}>

                { data.map(({ node }) => (
                    <div key={ node.id} class="service-card" style={{ 
                        height: "auto",
                        backgroundColor: "white",
                        border: "1px solid black",
                        margin: "2rem",
                        padding: "2rem"
                        }}>
                        <h2>{ node.frontmatter.title }</h2>
                        <div
                            className="service-card-content"
                            dangerouslySetInnerHTML={{ __html: node.html }}
                        />
                    </div>
                ))}
                
            </div>
                    <Link to={ ctaUrl }>{ ctaText }</Link>
        </section>
    )
}
