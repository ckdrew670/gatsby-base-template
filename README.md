# Gatsby Template

## Introduction

This Gatsby base theme includes the following plugins. Run `npm install` to install:

* [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=source-file)
* [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/)
* [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)
* [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)

## Gatsby CLI

Install the Gatsby CLI `npm install -g gatsby-cli`. You'll need Node v10+ (`nvm use v10`). You can set up an `.nvmrc` file in your project to manage your version of Node.

There is a comprehensive cheatsheet for Gatsby CLI commands [here](https://www.gatsbyjs.com/docs/cheat-sheet/) or run `gatsby --help`.

## Quick Start

Create a new project folder and run it using:

```bash
gatsby new {project-name} && cd {project-name} && gatsby develop
```

This will set up a new project using Gatsby's default starter theme, which includes several necessary plugins, and start a hot-reloading development server accessible at: `http://localhost:8000`

## Install Plugins

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

The [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=source-file) plugin allows you to access content from Markdown files in your filesystem. For a blog post, you might want to update the config to create pages from markdown files. An `options` object can be passed to a plugin, and you're passing the filesystem `path` (which is where your Markdown files will be located) and then a `name` for the source files.

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
    }
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

## Site Metadata

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
