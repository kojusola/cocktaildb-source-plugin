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

const POST_NODE_TYPE = `Post`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  const data = await axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
    .then(response =>
      response?.data?.drinks?.forEach(post => {
        createNode({
          ...post,
          id: createNodeId(`${POST_NODE_TYPE}-${post.idDrink}`),
          parent: null,
          children: [],
          internal: {
            type: POST_NODE_TYPE,
            content: JSON.stringify(post),
            contentDigest: createContentDigest(post),
          },
        })
      })
    )
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
    }
  `)
}

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")
