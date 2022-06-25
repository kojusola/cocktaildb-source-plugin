// module.exports = {
//   plugins: [
//     `gatsby-plugin-postcss`,
//     require.resolve(`../gatsby-source-cocktaildb`),
//     // `gatsby-plugin-google-fonts`,
//     `gatsby-plugin-robots-txt`,
//     `gatsby-plugin-sitemap`,
//   ],
// }

module.exports = {
  plugins: [
    require.resolve(`../gatsby-source-cocktaildb`),
    // `gatsby-plugin-google-fonts`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-theme-ui`,
  ],
}
