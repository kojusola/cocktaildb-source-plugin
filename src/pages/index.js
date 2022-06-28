import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Link from "gatsby-link"
import "../styles/index.css"
import Layout from "../components/layout"

const Home = ({ data }) => {
  return (
    <Layout>
      <div
        style={{
          padding: "32px",
          paddingTop: "80px",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1>Drinks</h1>
        <section
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat( auto-fit, minmax(250px, 1fr) )`,
            gridGap: 16,
          }}
        >
          {data?.allPost?.edges?.map(post => {
            return (
              // <Link to={post?.node?.slug} style={{ textDecoration: "none" }}>
              <Link
                key={post?.node?.idDrink}
                to={post?.node?.slug}
                className="drink-link"
                style={{
                  display: `flex`,
                  flexDirection: `column`,
                  padding: 16,
                  border: `1px solid #ccc`,
                  textDecoration: "none",
                  borderRadius: "10px",
                  color: "black",
                  ":hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                <h2>{post?.node?.idDrink}</h2>
                <GatsbyImage
                  image={
                    post?.node?.featuredImg?.childImageSharp?.gatsbyImageData
                  }
                  alt={post?.node?.strDrink}
                />
                <span style={{ textAlign: "center", marginTop: "20px" }}>
                  {post?.node?.strDrink}
                </span>
                <span style={{ textAlign: "center", marginTop: "10px" }}>
                  {post?.node?.furtherInformationExcerpt === "null"
                    ? "No further information"
                    : `${post?.node?.furtherInformationExcerpt}`}
                </span>
              </Link>
              // </Link>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export default Home

export const query = graphql`
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
`
