// FIXME: Emoji is not working well with editor yet!!!

import React from "react"
import { css } from "react-emotion"
import PropTypes from "prop-types"
import AceEditor from "react-ace"

const propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
}

const EditorWindow = ({ value, onEditorChange, ...props }) => (
  <div {...props} className={editorWindowCss}>
    <AceEditor
      mode="markdown"
      theme="dracula"
      name="markdown_editor"
      fontSize={14}
      showGutter={false}
      showPrintMargin={false}
      value={value}
      onChange={onEditorChange}
    />
  </div>
)

EditorWindow.propTypes = propTypes

export default EditorWindow

const editorWindowCss = css`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
  height: 100%;
`
