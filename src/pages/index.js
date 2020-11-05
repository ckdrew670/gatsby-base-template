import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import ServicesPanel from "../components/services-panel"

// try and build a homepage like the lunar one already using components with separate content
// content added to index.md file but could be seeded into components by passing component data objects down through index.md as props

export default function Homepage({
    data // this prop will be injected by the GraphQL query
  }) {
    const content = data.markdownRemark; // data.markdownRemark holds your post data
    const hero = content.frontmatter.hero;
    const services = content.frontmatter.services;

    return (
      <Layout>
          <SEO title="Home"/>
          <Hero hero={ hero } />
          <ServicesPanel services={ services } />
      </Layout>
    )
  }

export const pageQuery = graphql`
  query Homepage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        hero {
            title
            subtitle
            backgroundImage
        }
        services {
            title
            subtitle
            ctaUrl
            ctaText
        }
      }
    }
  }
`
