/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */

const axios = require("axios")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { convert } = require("html-to-text")

const POST_NODE_TYPE = `Post`

const shuffleArray = posts => {
  const duplicateArray = [...posts]

  for (
    let currentIndex = duplicateArray.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
    ;[duplicateArray[currentIndex], duplicateArray[randomIndex]] = [
      duplicateArray[randomIndex],
      duplicateArray[currentIndex],
    ]
  }

  return duplicateArray.slice(0, 3)
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  const data = await axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then(response => {
      return response?.data?.drinks
    })
  if (data) {
    for (const post of data) {
      const result = await axios
        .get(
          encodeURI(
            `https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${post.strDrink}`
          )
        )
        .then(response => {
          return response?.data?.parse?.text["*"]
        })

      const text = convert(result, {
        wordwrap: 100,
      }).substring(0, 100)

      createNode({
        ...post,
        slug: post.strDrink.toLowerCase().split(" ").join("_"),
        furtherInformationHTML: result,
        furtherInformationExcerpt: `${text ? `${text}...` : null}`,
        relatedDrinks: shuffleArray(data),
        id: createNodeId(`${POST_NODE_TYPE}-${post.idDrink}`),
        parent: null,
        children: [],
        internal: {
          type: POST_NODE_TYPE,
          content: JSON.stringify(post),
          contentDigest: createContentDigest(post),
        },
      })
    }
  }
  return
}

exports.onCreateNode = async ({
  node, // i.e. the just-created node
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === POST_NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // The remote image URL for which to generate a node.
      url: node.strDrinkThumb,
      parentNodeId: node.idDrink,
      createNode,
      createNodeId,
      getCache,
    })
    if (fileNode) {
      createNodeField({ node, name: "localFile", value: fileNode.id })
    }
    for (const drink of node?.relatedDrinks) {
      const fileNode = await createRemoteFileNode({
        // The remote image URL for which to generate a node.
        url: drink?.strDrinkThumb,
        parentNodeId: drink?.idDrink,
        createNode,
        createNodeId,
        getCache,
      })
      delete drink.featuredImg
      drink.featuredImg = fileNode.id
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Post implements Node {
      post: Post
      featuredImg: File @link(from: "fields.localFile")
    }
    type Post {
      idDrink: String!
      strDrink: String
      strDrinkThumb: String
      slug: String
      furtherInformationHTML: String
      furtherInformationExcerpt: String
      relatedDrinks: [Related]
    }
    type Related {
      idDrink: String!
      strDrink: String
      strDrinkThumb: String
      featuredImg: File @link(from: "featuredImg" by: "id")
    }
  `)
}

exports.onPreInit = () => console.log("Loaded gatsby-source-cocktaildb")
