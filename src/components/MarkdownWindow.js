import React from "react"
import { css } from "react-emotion"
import PropTypes from "prop-types"

const propTypes = {
  content: PropTypes.string.isRequired,
}

const MarkdownWindow = ({ content, ...props }) => (
  <div {...props} className={markdownWindowCss}>
    <div dangerouslySetInnerHTML={{ __html: content }} />
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
