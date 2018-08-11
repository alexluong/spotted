import React from "react"
import checkSpellingAndGrammar from "actions/unified/analysis/spelling"

const SpellingAndGrammar = ({ markdown, html, modal, ...props }) => {
  const Analyzed = checkSpellingAndGrammar(html, modal)

  return (
    <div {...props} style={{ color: "#fff" }}>
      {Analyzed}
    </div>
  )
}

export default SpellingAndGrammar
