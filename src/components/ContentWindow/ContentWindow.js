import React from "react"
import { css } from "react-emotion"
import PropTypes from "prop-types"
// Components
import Readability from "./AnalysisContent/Readability"

const propTypes = {
  html: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  analysis: PropTypes.string.isRequired,
}

const MarkdownWindow = ({ html, markdown, analysis, ...props }) => (
  <div {...props} className={markdownWindowCss}>
    {(() => {
      if (!analysis) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />
      } else if (analysis === "readability") {
        return <Readability markdown={markdown} />
      }
    })()}
  </div>
)

MarkdownWindow.propTypes = propTypes

export default MarkdownWindow

const markdownWindowCss = css`
  background-color: #191324;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 2rem;
  color: #fff;
  border-left: 1px solid #302b3a;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #82d8d8;
  }

  h1 {
    border-bottom: 3px solid #e54b4b;
    padding-bottom: 1rem;
  }

  a {
    color: #e54b4b;
  }
`
