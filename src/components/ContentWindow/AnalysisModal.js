import React from "react"
import ReactDOM from "react-dom"

class AnalysisModal extends React.Component {
  state = { renderedComponent: null }

  createModal(target, reason) {
    const targetRect = target.getBoundingClientRect()
    console.log(targetRect)

    const popupWidth = 250
    const popupHeight = 80

    const popup = ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: targetRect.top - popupHeight,
          left: targetRect.left + targetRect.width / 2 - popupWidth / 2,
          width: popupWidth,
          height: popupHeight,
          background: "pink",
        }}
      >
        {reason}
      </div>,
      document.body,
    )

    this.setState({ renderedComponent: popup })
  }

  removeModal() {
    this.setState({ renderedComponent: null })
  }

  render() {
    return this.state.renderedComponent
  }
}

export default AnalysisModal
