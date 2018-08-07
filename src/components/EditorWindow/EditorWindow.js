// FIXME: Emoji is not working well with editor yet!!!

import React from "react"
import PropTypes from "prop-types"
import AceEditor from "react-ace"
import EditorWindowContainer from "./Container"

const propTypes = {
  value: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
}

const EditorWindow = ({ value, onEditorChange, ...props }) => (
  <EditorWindowContainer {...props}>
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
  </EditorWindowContainer>
)

EditorWindow.propTypes = propTypes

export default EditorWindow
