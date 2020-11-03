# Gatsby Template

## Introduction

This Gatsby base theme includes the following plugins. Run `npm install` to install:

* [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=source-file)
* [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/)
* [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)
* [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)
* [gatsby-plugin-remark-collection](https://www.gatsbyjs.com/plugins/gatsby-plugin-remark-collection/?=gatsby-pluginremark)

## Gatsby CLI

Install the Gatsby CLI `npm install -g gatsby-cli`. You'll need Node v10+ (`nvm use v10`). You can set up an `.nvmrc` file in your project to manage your version of Node.

There is a comprehensive cheatsheet for Gatsby CLI commands [here](https://www.gatsbyjs.com/docs/cheat-sheet/) or run `gatsby --help`.

## Quick Start

Create a new project folder and run it using:

```bash
gatsby new {project-name} && cd {project-name} && gatsby develop
```

`gatsby new {project-name}` will set up a new project folder using Gatsby's default starter theme, which includes several necessary plugins, and `gatsby develop` will start a hot-reloading development server accessible at: `http://localhost:8000`

## Plugins

The Gatsby default theme comes with some popular plugins added (see the `gatsby-config.js` file for the full list). You'll need to run `npm install` to install them.

You can easily add extra plugins from Gatsby's vast library using `npm install {plugin-name}`. Then go and update your `gatsby-config.js` plugins list to include the new plugin:

```js
module.exports = {
  plugins: [
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet"
  ]
}
```

[Explore the Gatsby Plugin Library here](https://www.gatsbyjs.com/plugins/).

### Source Plugins

Source plugins create nodes which can then be transformed into a usable format by a transformer plugin. For instance, a typical workflow often involves using `gatsby-source-filesystem`, which loads files off of disk (e.g. markdown files) and then specifying a Markdown transformer, eg. `gatsby-transformer-remark` to transform the Markdown into HTML.

#### gatsby-source-filesystem

The [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=source-file) plugin allows you to access content from Markdown files in your filesystem. For a blog post, you might want to update the config to create pages from markdown files. An `options` object can be passed to a plugin, and you're passing the filesystem `path` (which is where your Markdown files will be located) and then a `name` for the source files. You can add multiple instances.

```js
module.exports = {
  plugins: [
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
  ]
}
```

### Transformer Plugins

Transformer plugins takes data from a source such as a markdown, json or yaml file and transforms it into a format that Gatsby can understand so that you can use GraphQL to query it. The source plugins and transformer plugins work together to pull data from eg. markdown files off your system and the markdown transformer will convert that to usable HTML.

#### gatsby-transformer-remark

The [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/) plugin is used for converting Markdown files.

You can add all sorts of extra functionality to this with extra plugins e.g. add syntax highlighting with `gatsby-remark-prismjs`, `gatsby-remark-copy-linked-files` to copy relative files specified in markdown, `gatsby-remark-images` to compress images and add responsive images with `srcset`, etc.

```js
{
    resolve: "gatsby-transformer-remark",
        options: {
        plugins: [] // add any additional transformer-remark plugins here
    }
}
```

#### gatsby-plugin-remark-collection

If you use multiple `gatsby-source-filesystem` definitions to load multiple directories of content, how can you request just one directory in Gatsby? [This plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-remark-collection/?=gatsby-pluginremark) adds a `field` called `collection` which simply copies the value from the `File` node to the `MarkdownRemark` node.

Example `gatsby-config.js`:

```js
{
  resolve: "gatsby-source-filesystem",
  options: {
    name: "posts",
    path: `${__dirname}/content/posts`
  }
},
{
  resolve: "gatsby-source-filesystem",
  options: {
    name: "pages",
    path: `${__dirname}/src/pages`
  }
},
```

Now you can query for these specifically like so:

```graphql
posts: allMarkdownRemark(
  filter: { fields: { collection: { eq: "posts" } } }
  sort: { fields: [frontmatter___date], order: DESC }
) {
  edges {
    node {
      id
      frontmatter {
        title
        path
        tags
      }
    }
  }
}
pages: allMarkdownRemark(
  filter: { fields: { collection: { eq: "pages" } } }
) {
  edges {
    node {
      id
      frontmatter {
        title
        path
      }
    }
  }
}

```

## Site metadata

You can add site metadata in your `gatsby-config.js` file like so:

```js
  module.exports = {
    siteMetadata: {
      title: `Your Blog Title`,
      description: `Add a description for your site here.`,
      author: `Your Name`,
    },
    plugins: [
      "gatsby-plugin-catch-links",
      "gatsby-plugin-react-helmet",
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/pages`,
          name: "pages"
        }
      }
    ]
  }
```

## Markdown

### Adding content as a Markdown file

We've defined the path to the post content files in our source plugin config above as `/content/posts`. This is where your post content files will need to live. For this example I'll be creating a file called `hello-world.md` as below:

```md
---
path: "/posts/hello-world"
date: "2020-11-02"
title: "A Hello World Post"
author: "Charlotte"
tags:
    - "fun"
    - "hello"
---
Hello there, world! Here's my first blog post!
```

The block between the `---` is **front matter** data that you can inject into your React components later on. All your important metadata for each post goes here. It's written in `yaml` format.

One important note is that `path` will be used when you dynamically create your pages to specify the URL/path to render the file. In this instance, `http://localhost:8000/posts/hello-world` will be the path to this file.

## React Templates

### Create a React template for your post page

Create a `templates` folder for your templates to live inside the `/src` folder. Inside here, create a `Post.js` file and add your template:

```js
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
```

This React component will be rendered to a static HTML string (for each route/blog post you define),which will serve as the basis of your routing/navigation for your blog.

## GraphQL

### Writing a GraphQL query

Now you need to connect your template and your content using GraphQL. You do this by adding a GraphQL query at the bottom of your template. This will inject the data via the `data` property passed in at the top.

```sql
export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
```

<!-- CONS -->

<!-- have to do some dangerouslySetInnerHTML stuff ... -->

There's good documentation on GraphQL in the [Gatsby docs](https://www.gatsbyjs.com/docs/graphql/) and the [GraphiQL](https://www.gatsbyjs.com/docs/running-queries-with-graphiql/) tool, which helps you to create GraphQL queries more easily. You'll find it when your development server is running at `http://localhost:8000/___graphql`.

The `BlogPostByPath` query will be injected with the current `path` for the specific blog post. This path is then available as `$path` in your query. For instance, if you were viewing your previously created blog post, the path of the file that data will be pulled from will be
`/hello-world`.

`markdownRemark` will be the injected in as the `data` prop at the top. Each prop you pull via the GraphQL query will be available under this `markdownRemark` property. For example, to access the transformed HTML, you would access the data prop via `data.markdownRemark.html`. To access the title from the `frontmatter` you use `data.markdownRemark.frontmatter.title`. See the React template above for examples.

NB: GraphQL queries take place at build time.

## Creating Static Pages

Gatsby exposes a powerful [Node API](https://www.gatsbyjs.com/docs/node-apis/) that allows you to create dynamic pages (and a host of other useful stuff too). You can interact with it in the `gatsby-node.js` file. You can use the [**createPages API**](https://www.gatsbyjs.com/docs/node-apis/#createPages) to tell plugins to add pages for you. 

In `gatsby-node.js`:

```js
const path = require("path") // grabbing the path property from your content

// set up a createPages action creator
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/Post.js`)
}
```

Here you are setting up a `createPages` action creator. Gatsby uses Redux under the hood. When you implement a Gatsby API, you are passed a collection of `actions` (equivalent to actions bound with `bindActionCreators` in Redux) which you can use to manipulate state on your site. Find out more about the **actions** object available to you [here](https://www.gatsbyjs.com/docs/actions/).

Now you'll need to add a GraphQL query to fetch all your Markdown posts.

```js
const path = require("path") // grabbing the path property from your content

// set up a createPages action creator
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
}
```

The `exports.createPages` API expects a Promise to be returned, so it works seamlessly with the graphql function, which returns a Promise.

Above, you're using GraphQL to get all Markdown nodes and making them available under the `allMarkdownRemark` GraphQL property. You're effectively seeding a GraphQL "database" that you can then query against via page-level GraphQL queries.

You now have your query written, but haven't used the `createPages` action creator to create a page. Here's how to do that:

```js
const path = require("path") // grabbing the path property from your content

// set up a createPages action creator
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
```

The actual posts are available via the path `result.data.allMarkdownRemark.edges`. Each edge contains an internal node, and this node holds the useful data that you will use to construct a page with Gatsby. Your GraphQL "shape" is directly reflected in this data object, so each property you pulled from that query will be available when you are querying in your GraphQL blog post template.

## Creating an Archive List

Gatsby has a standard for "listing pages," and they're placed in the root of our filesystem we specified in `gatsby-source-filesystem` (eg. `/src/pages`). So, create an `Archive.js` file therein. Additionally, note that all static JS files (that export a React component!) will get a corresponding static HTML file. For instance, if we create `src/pages/tags.js`, the path `http://localhost:8000/tags/` will be available within the browser and the statically generated site.

In `Archive.js`:

```js
import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
// import '../css/index.css'; // add some style if you want!
export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
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
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
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
```

<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's default starter
</h1>

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.com/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```shell
    # create a new Gatsby site using the default starter
    gatsby new my-default-starter https://github.com/gatsbyjs/gatsby-starter-default
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-default-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-default)

<!-- AUTO-GENERATED-CONTENT:END -->
