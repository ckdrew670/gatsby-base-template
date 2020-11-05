module.exports = {
  siteMetadata: {
    title: `Your Blog Title`,
    description: `Add a description for your site here.`,
    author: `Your Name`,
    menuLinks:[
        {
            name:'Home',
            link:'/'
        },
        {
            name:'Posts',
            link:'/archive'
        },
        {
            name:'About',
            link:'/about'
        }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remark-collection`,
    `gatsby-plugin-sass`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts`,
          path: `${__dirname}/content/posts`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `pages`,
          path: `${__dirname}/content/single-pages`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `services`,
          path: `${__dirname}/content/services`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: `${__dirname}/content/index.md`,
        },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
