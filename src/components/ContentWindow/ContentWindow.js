import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"
// Components
import Readability from "./AnalysisContent/Readability"

const propTypes = {
  html: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  analysis: PropTypes.string.isRequired,
}

const ContentWindow = ({ html, markdown, analysis, ...props }) => (
  <div {...props} className={styles.contentWindowCss}>
    {(() => {
      if (!analysis) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />
      } else if (analysis === "readability") {
        return <Readability markdown={markdown} html={html} />
      }
    })()}
  </div>
)

ContentWindow.propTypes = propTypes

export default ContentWindow
