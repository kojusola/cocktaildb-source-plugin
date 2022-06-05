const path = require(`path`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
  return graphql(`
    {
      allPost {
        edges {
          node {
            idDrink
            strDrink
            strDrinkThumb
            featuredImg {
              childImageSharp {
                gatsbyImageData
              }
            }
            furtherInformationHTML
            furtherInformationExcerpt
            slug
            relatedDrinks {
              idDrink
              strDrink
              strDrinkThumb
              featuredImg {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allPost.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`src/templates/drink.js`),
        context: {
          slug: node.slug,
        },
      })
    })
  })
}
