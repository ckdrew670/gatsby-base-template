/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`src/templates/Post.js`);
    const pageTemplate = path.resolve(`src/templates/Single.js`);

    // add a GraphQL query to fetch the path data from your posts
    const posts = await graphql(`
      {
        allMarkdownRemark(filter: {fields: {collection: {eq: "posts"}}}) {
            edges {
              node {
                id
                frontmatter {
                  path
                }
              }
            }
          }
      }
    `)

    if (posts.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
      }

    // create a post page for each markdown file
    posts.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {} // additional data can be passed via context
        })
    })

    // add a GraphQL query to fetch the path data from your pages
    const pages = await graphql(`
      {
        allMarkdownRemark(filter: {fields: {collection: {eq: "pages"}}}) {
            edges {
              node {
                id
                frontmatter {
                  path
                }
              }
            }
          }
      }
    `)

    if (pages.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    // create a page for each markdown file
    
    pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
            path: node.frontmatter.path,
            component: pageTemplate,
            context: {} // additional data can be passed via context
            })
    })
}