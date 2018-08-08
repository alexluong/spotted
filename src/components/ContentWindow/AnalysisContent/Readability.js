import React from "react"
import analyzeReadability from "actions/unified/analysis/readability"

class Readability extends React.Component {
  render() {
    const { markdown, html, ...props } = this.props

    const Analyzed = analyzeReadability(html)

    return (
      <div {...props} style={{ color: "#fff" }}>
        {Analyzed}
      </div>
    )
  }
}

export default Readability
