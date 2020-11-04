import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from 'gatsby';

export default function Post({
  data // this prop will be injected by the GraphQL query
}) {
  const post = data.markdownRemark; // data.markdownRemark holds your post data
  const tags = post.frontmatter.tags;

  return (

    <Layout>
        <SEO title="Post"/>
        <div className="blog-post-container">
            <Helmet title={`Your Blog Name - ${ post.frontmatter.title }`} />
            <div className="blog-post">
                <h1>{ post.frontmatter.title }</h1>
                <h3>{ post.frontmatter.date }</h3>
                <p>Author: { post.frontmatter.author }</p>
                <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
                />
                <h3>Tags</h3>
                <ul>
                    {
                        tags.map((tag, i) => 
                            <li key={ i }><Link to={ tag }>{ tag }</Link></li>
                        )
                    }
                </ul>
            </div>
        </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY HH:MM:SS")
        path
        title
        author
        tags
      }
    }
  }
`