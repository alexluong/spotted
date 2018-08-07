import styled from "react-emotion"

const EditorWindowContainer = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: ${props => props.theme.background};
  height: 100%;

  .ace_editor {
    width: 100% !important;
    height: 100% !important;
    background-color: ${props => props.theme.background} !important;
    color: ${props => props.theme.text} !important;
  }

  .ace_editor .ace_gutter {
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  .ace_editor .ace_list {
    color: ${props => props.theme.text};
  }

  .ace_editor .ace_gutter-active-line {
    background-color: ${props => props.theme.backgroundLight};
  }

  .ace_editor .ace_heading {
    color: ${props => props.theme.primary};
  }

  .ace_editor .ace_cursor {
    color: ${props => props.theme.text} !important;
  }

  .ace_editor .ace_string {
    color: ${props => props.theme.secondary};
  }

  .ace_active-line {
    background: ${props => props.theme.backgroundLight} !important;
  }
`

export default EditorWindowContainer
