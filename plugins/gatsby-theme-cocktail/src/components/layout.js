import React from "react"
import { jsx } from "theme-ui"
import Header from "./header"

export default function Layout({ children }) {
  return (
    <div className="w-full">
      <Header />
      <div sx={{ width: "100%", padding: "20px" }}>{children}</div>
    </div>
  )
}
