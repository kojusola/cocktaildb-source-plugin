module.exports = options => {
  const { fonts } = options
  return {
    plugins: [
      require.resolve(`../gatsby-source-cocktaildb`),
      {
        resolve: `gatsby-plugin-google-fonts`,
        options: fonts
          ? fonts
          : {
              fonts: [
                `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
              ],
              display: "swap",
            },
      },
      `gatsby-plugin-robots-txt`,
      `gatsby-plugin-sitemap`,
    ],
  }
}
