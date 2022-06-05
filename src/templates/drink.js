import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Drink = ({ data }) => {
  const post = data?.allPost?.edges[0]?.node
  console.log(post)
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "32px",
          paddingTop: "80px",
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <h1>{post?.strDrink}</h1>
        <GatsbyImage
          image={post?.featuredImg?.childImageSharp?.gatsbyImageData}
          alt={post?.strDrink}
          style={{
            marginBottom: "40px",
          }}
        />
        <span
          style={{
            textAlign: "center",
            fontSize: "1.2em",
            color: "black",
          }}
          dangerouslySetInnerHTML={{
            __html: post?.furtherInformationHTML,
          }}
        ></span>
        <div style={{ marginTop: "100px" }}>
          <h1>Related Drinks</h1>
          <section
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat( auto-fit, minmax(250px, 1fr) )`,
              gridGap: 16,
              marginTop: "50px",
              width: "100%",
              maxWidth: "1440px",
            }}
          >
            {post?.relatedDrinks?.map(post => {
              return (
                <a
                  key={post?.idDrink}
                  href={post?.strDrink.toLowerCase().split(" ").join("_")}
                  className="drink-link"
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    padding: 16,
                    border: `1px solid #ccc`,
                    textDecoration: "none",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  <h2>{post?.idDrink}</h2>
                  {post?.featuredImg ? (
                    <GatsbyImage
                      image={
                        post?.featuredImg?.childImageSharp?.gatsbyImageData
                      }
                      alt={post?.strDrink}
                    />
                  ) : (
                    <img
                      src={post?.strDrinkThumb}
                      alt={post?.strDrink}
                      style={{
                        width: "414px",
                        height: "414px",
                      }}
                    ></img>
                  )}
                  <span style={{ textAlign: "center", marginTop: "20px" }}>
                    {post?.strDrink}
                  </span>
                </a>
              )
            })}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Drink

export const query = graphql`
  query ($slug: String!) {
    allPost(filter: { slug: { eq: $slug } }) {
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
`
