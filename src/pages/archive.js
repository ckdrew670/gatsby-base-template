import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import SEO from "../components/seo"

// import '../css/index.css'; // add some style if you want!

export default function Archive({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
    
        <SEO title="Archive" />
        
        <div className="blog-posts">
        {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
            return (
                <div className="blog-post-preview" key={post.id}>
                <h1>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                </h1>
                <h2>{post.frontmatter.date}</h2>
                <p>{post.excerpt}</p>
                </div>
            )
            })}
        </div>
    </Layout>
  )
}

// the query below is just getting data from the posts thanks to the gatsby-plugin-remark-collection plugin

export const pageQuery = graphql`
  query ArchiveQuery {
    allMarkdownRemark(
        filter: { fields: { collection: { eq: "posts" }}}
        sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`