import { injectGlobal } from "react-emotion"

export default function setEditorStyle() {
  injectGlobal`
    .ace_editor {
      width: 100% !important;
      height: 100% !important;
      background-color: #191324 !important;
      color: white;
    }

    .ace_editor .ace_gutter {
      background: #191324;
      color: white;
    }

    .ace_editor .ace_list {
      color: #d8d8d8;
    }

    .ace_editor .ace_gutter-active-line {
      background-color: #373142;
    }

    .ace_editor .ace_heading {
      color: #82d8d8;
    }

    .ace_editor .ace_cursor {
      color: white;
    }

    .ace_editor .ace_string {
      color: #e54b4b;
    }
  `
}
