import React from "react"
import PropTypes from "prop-types"
// Components
import ContentWindowContainer from "./Container"
import SpellingAndGrammar from "./AnalysisContent/SpellingAndGrammar"
import Readability from "./AnalysisContent/Readability"

const propTypes = {
  html: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  analysis: PropTypes.string.isRequired,
}

const ContentWindow = ({ html, markdown, analysis, ...props }) => (
  <ContentWindowContainer {...props}>
    {(() => {
      if (!analysis) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />
      } else if (analysis === "spelling-and-grammar") {
        return <SpellingAndGrammar markdown={markdown} html={html} />
      } else if (analysis === "readability") {
        return <Readability markdown={markdown} html={html} />
      }
    })()}
  </ContentWindowContainer>
)

ContentWindow.propTypes = propTypes

export default ContentWindow
