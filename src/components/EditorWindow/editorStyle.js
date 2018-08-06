import { injectGlobal } from "react-emotion"
import Color from "utilities/Color"

export default function setEditorStyle() {
  injectGlobal`
    .ace_editor {
      width: 100% !important;
      height: 100% !important;
      background-color: ${Color.get("background")} !important;
      color: white;
    }

    .ace_editor .ace_gutter {
      background: ${Color.get("background")};
      color: ${Color.get("text")};
    }

    .ace_editor .ace_list {
      color: #d8d8d8;
    }

    .ace_editor .ace_gutter-active-line {
      background-color: ${Color.get("backgroundLight")};
    }

    .ace_editor .ace_heading {
      color: ${Color.get("primary")};
    }

    .ace_editor .ace_cursor {
      color: ${Color.get("text")};
    }

    .ace_editor .ace_string {
      color: ${Color.get("secondary")};
    }
  `
}
