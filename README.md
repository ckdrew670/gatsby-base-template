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

- [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=source-file)
- [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/)
- [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/)
- [gatsby-plugin-catch-links](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/)
- [gatsby-plugin-remark-collection](https://www.gatsbyjs.com/plugins/gatsby-plugin-remark-collection/?=gatsby-pluginremark)
- [gatsby-plugin-sass](https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/?=sas)

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

You can add site metadata, including site navigation, header and footer data in the `gatsby-config.js` file. For more info see [Site Metadata](#site-metadata).

### Add content for a post

Create a new markdown file in `/content/posts`. Available variables in the frontmatter data include:

```yaml
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

You'll find the markdown file for the homepage at `content/index.md`. The homepage is built from a selection of separate components - eg. hero, services panel - that accept a data object as props. The properties of these data objects, as well as any other content for the page can be defined in the frontmatter of `index.md` as follows:

```yaml
---
path: "/"
title: "Home"
hero: {
    backgroundImage: "src/assets/images/lighthouse.jpg",
    title: "Hero title",
    subtitle: ""
}
services: {
    title: "Services",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipiscing.",
    ctaUrl: "/our-services",
    ctaText: "View our services"
}
---
```

### Add content for an archive page

Similarly to the homepage, the `archive.md` page can be found in `content.md`.

### Add a new content collection

Let's say you want to add a list of testimonials or business services to your site. You can store these in their own folder in `/content` and pull the data into your page or component templates.

Create a directory `/content/services`. This is where each of your markdown files for each service will live. In the repo each service has the following data:

```yaml
---
title: "Apps"
---

Lorem ipsum dolor sit amet consectetur adipiscing elit purus cras natoque, in litora parturient accumsan ad montes ligula mi metus tempus, dis suspendisse hac risus ante posuere convallis lobortis sagittis.

[Read more](/our-work)
```

Let's say you want to access this data in a homepage component (in the example our `services-panel.js` file). You'll need to use the `useStaticQuery` hook to access the data in a non-page component:

```js
import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react";

export default function ServicesPanel({
    services // this is the block data coming from index.md, passed through index.js as props
  }) {

    // create a static query to pull data in from your services markdown files ... 
    const servicesData = useStaticQuery(
        graphql`
          query {
            allMarkdownRemark(filter: {fields: {collection: {eq: "services"}}}) {
                edges {
                  node {
                    id
                    frontmatter {
                      title
                    }
                    html
                  }
                }
            }
          }
        `
    )

    // these variables come from index.md
    let { title, subtitle, ctaText, ctaUrl } = services;

    // these come from your static query
    let data = servicesData.allMarkdownRemark.edges;

    return (
        <section class="services-panel">
            <h1>{ title }</h1>
            { subtitle ? <h2>{ subtitle }</h2> : null }
            <div class="services-list">
                { data.map(({ node }) => (
                    <div key={ node.id} class="service-card">
                        <h2>{ node.frontmatter.title }</h2>
                        <div
                            className="service-card-content"
                            dangerouslySetInnerHTML={{ __html: node.html }}
                        />
                    </div>
                ))}
            </div>

            <Link to={ ctaUrl }>{ ctaText }</Link>
        </section>
    )
}

```

Find out how to query data in page components [here](#querying-data)
## Creating Components
### Adding content for a new component
## Querying Data

## Custom Styling

This base-theme uses Sass for styling. Sass files can be found in `src/assets/styles` and `main.scss` is imported into the `layout.js` file.

*NB: the `node-sass` version is **^4.14.1**. You might find some errors thrown if you update to the latest version.*

## Responsive Images
