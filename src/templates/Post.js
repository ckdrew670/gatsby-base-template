import React from "react"
import { Helmet } from "react-helmet"

export default function Post({
  data // this prop will be injected by the GraphQL query
}) {
  const { markdownRemark: post } = data // data.markdownRemark holds your post data
  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${ post.frontmatter.title }`} />
      <div className="blog-post">
        <h1>{ post.frontmatter.title }</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}