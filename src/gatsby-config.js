module.exports = {
  plugins: [`gatsby-plugin-catch-links`], resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: `www.midwest-tropical.com/GatsbyWP`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: true,
}
