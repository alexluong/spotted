import React from "react"
import checkSpellingAndGrammar from "actions/unified/analysis/spelling"

const SpellingAndGrammar = ({ markdown, html, ...props }) => {
  const Analyzed = checkSpellingAndGrammar(html)

  return (
    <div {...props} style={{ color: "#fff" }}>
      {Analyzed}
    </div>
  )
}

export default SpellingAndGrammar
