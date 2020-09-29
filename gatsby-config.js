module.exports = {
    plugins: [
      {
        resolve: "gatsby-theme-woocommerce",
        options: {
          basePath: "/shop/",
          storeUrl: "https://www.midwest-tropical.com/graphql",
        },
      },
    ],
  }
module.exports = options => {

  return {
    siteMetadata: {
      title: `Gatsby Woocommerce`,
      description: `Ecommerce store buit with gatsby and wordpress`,
      basePath: options.basePath ? options.basePath : '/',
      author: 'sagarnasit'
    },
    plugins: [
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: "gatsby-source-graphql",
        options: {
          // This type will contain remote schema Query type
          typeName: "WPGraphQL",
          // This is field under which it's accessible
          fieldName: "wpgraphql",
          // Url to query from
          url: options.storeUrl
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Woocommerce Store`,
          short_name: `Woocommerce Store`,
          start_url: options.basePath,
          background_color: `#2c2d33`,
          theme_color: `#2c2d33`,
          display: `standalone`,
          icon: `${__dirname}/src/images/gatsby-icon.png`,
        },
      },
      {
        resolve: `gatsby-plugin-offline`,
        options: {
          precachePages: [`/*`],
        },
      },
      'gatsby-plugin-sass',
    ],
  }

}