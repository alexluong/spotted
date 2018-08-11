import React from "react"
import PropTypes from "prop-types"
// Components
import ContentWindowContainer from "./Container"
import AnalysisModal from "./AnalysisModal"
import SpellingAndGrammar from "./AnalysisContent/SpellingAndGrammar"
import Readability from "./AnalysisContent/Readability"

const propTypes = {
  html: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  analysis: PropTypes.string.isRequired,
}

let modal = React.createRef()

const ContentWindow = ({ html, markdown, analysis, ...props }) => {
  let renderedComponent

  switch (analysis) {
    case "spelling-and-grammar":
      renderedComponent = <SpellingAndGrammar />
      break
    case "readability":
      renderedComponent = <Readability />
      break
    default:
      renderedComponent = null
      break
  }

  return (
    <React.Fragment>
      <ContentWindowContainer {...props}>
        {renderedComponent === null ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          React.cloneElement(renderedComponent, { html, markdown, modal })
        )}
      </ContentWindowContainer>

      <AnalysisModal ref={instance => (modal = instance)} />
    </React.Fragment>
  )
}

ContentWindow.propTypes = propTypes

export default ContentWindow
