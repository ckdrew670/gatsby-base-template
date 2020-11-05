# Using this Gatsby Base Theme

<!-- TOC -->

- [Gatsby CLI](#gatsby-cli)
- [Quickstart](#quickstart)
- [Plugins](#plugins)
    - [Included Plugins](#included-plugins)
    - [Add a New Plugin](#add-a-new-plugin)
- [Config](#config)
    - [Site Metadata](#site-metadata)
- [Navigation](#navigation)
- [Content Creation](#content-creation)
    - [Add Site Metadata](#add-site-metadata)
    - [Add a post](#add-content-for-a-post)
    - [Add content for the homepage](#add-content-for-the-homepage)
    - [Add content for an archive page](#add-content-for-an-archive-page)
    - [Add a new content collection](#add-a-new-content-collection)
- [Creating Components](#creating-components)
    - [Add content for a new component](#adding-content-for-a-new-component)
- [Creating a new data query](#creating-a-new-data-query)
- [Custom Styling](#custom-styling)

<!-- END TOC -->

## Gatsby CLI

Install the Gatsby CLI `npm install -g gatsby-cli`. You'll need Node v10+ (`nvm use v10`). You can set up an `.nvmrc` file in your project to manage your version of Node.

There is a comprehensive cheatsheet for Gatsby CLI commands [here](https://www.gatsbyjs.com/docs/cheat-sheet/) or run `gatsby --help`.

## Quickstart

Create a new project using the Gatsby CLI and this repo as a base:

`gatsby new project-name git@github.com:ckdrew670/gatsby-base-template.git`

Move into your project folder, run `npm install` to download plugins and then run the development server:

```bash
cd project-name
npm install
gatsby develop
```

Your site is now available to view at `http://localhost:8000`.

## Plugins

### Included plugins

This Gatsby base theme includes the following plugins. Run `npm install` to install:

* [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=source-file)
* [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/)
* [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)
* [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)
* [gatsby-plugin-remark-collection](https://www.gatsbyjs.com/plugins/gatsby-plugin-remark-collection/?=gatsby-pluginremark)

### Add a new plugin

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

## Config

### Site metadata

You can add site metadata in your `gatsby-config.js` file like so:

```js
  module.exports = {
    siteMetadata: {
      title: `Your Blog Title`,
      description: `Add a description for your site here.`,
      author: `Your Name`,
      menuLinks: [
        {
            name:'Home',
            link:'/'
        },
        {
            name:'Posts',
            link:'/posts'
        },
        {
            name:'About',
            link:'/about'
        }
    ]
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

This is also where the data for your site navigation (main menu) lives. See [Navigation](#navigation) for more details.

## Navigation

The data for site navigation items in the main header menu are stored in the `gatsby-config.js` file under `menuLinks`. To add a new menu item, simply add the content of the link (eg. "Home") and its filepath (eg. "/") as a new object in the `menuLinks` array:

```js
{
    name:'Home',
    link:'/'
},
```

## Content Creation

The content of the site should be kept separate from the templates. There is a `/content` folder where all content files are stored. Content is added using Markdown.

### Add site metadata

You can add site metadata, including site navigation data in the `gatsby-config.js` file. For more info see [Site Metadata](#site-metadata).

### Add content for a post

Create a new markdown file in `/content/posts`. Available variables in the frontmatter data include:

```md
---
path: "/your-path"
date: "2020-11-03 08:00:00"
title: "Hello World"
author: "Charlotte Drew"
excerpt: "Lorem ipsum dolor sit amet consectetur adipiscing elit."
tags: [ "world", "hello" ]
---
```

This will automatically generate a new post with `/your-path` as the url slug. This uses the `Post.js` template found at `src/templates/Post.js`.

### Add content for the homepage
### Add content for an archive page
## Add a component
### Add content for a component
## Styling
