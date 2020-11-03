/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`src/templates/Post.js`)
  
    // add a GraphQL query to fetch the path data from your posts
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `)
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    // create a page for each markdown file
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {} // additional data can be passed via context
        })
    })
  }