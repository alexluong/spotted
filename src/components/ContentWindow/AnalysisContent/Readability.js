import React from "react"
import analyzeReadability from "actions/unified/analysis/readability"

const Readability = ({ markdown, html, ...props }) => {
  const Analyzed = analyzeReadability(html)

  return (
    <div {...props} style={{ color: "#fff" }}>
      {Analyzed}
    </div>
  )
}

export default Readability
