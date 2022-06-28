/** @jsxImportSource @compiled/react */
import React from "react"
import Header from "./header"

export default function Layout({ children }) {
  return (
    <div css={{ width: "100%" }}>
      <Header />
      <div css={{ width: "100%", padding: "20px" }}>{children}</div>
    </div>
  )
}
