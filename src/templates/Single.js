import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Single({
  data// this prop will be injected by the GraphQL query
}) {

  const page = data.markdownRemark; // data.markdownRemark holds your page data

  return (

    <Layout>
        <SEO title={ page.frontmatter.title } />

        <div className="page">
            <div
            className="page-content"
            dangerouslySetInnerHTML={{ __html: page.html }}
            />
        </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`