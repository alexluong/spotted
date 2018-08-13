import React from "react"
import ReactDOM from "react-dom"
import styled from "react-emotion"
import { Transition, animated } from "react-spring"

class AnalysisModal extends React.Component {
  state = { renderedComponent: null }

  createModal(target, reason) {
    this.setState({ target, reason })
  }

  removeModal() {
    this.setState({ target: null, reason: "" })
  }

  render() {
    const { target, reason } = this.state

    const popupWidth = 200
    const popupHeight = 75
    const position = {}

    if (target) {
      const targetRect = target.getBoundingClientRect()
      position.top = targetRect.top - popupHeight - 5
      position.left = targetRect.left + targetRect.width / 2 - popupWidth / 2
    } else {
      position.top = 0
      position.left = 0
    }

    const popup = ReactDOM.createPortal(
      <Transition
        native
        from={{ opacity: 0, scale: 0.3 }}
        enter={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 0, scale: 0.3 }}
      >
        {target
          ? ({ opacity, scale }) => (
              <PopUp
                style={{
                  position: "absolute",
                  top: position.top,
                  left: position.left,
                  width: popupWidth,
                  height: popupHeight,
                  transform: scale.interpolate(scale => `scale(${scale})`),
                  opacity,
                }}
              >
                {reason}
              </PopUp>
            )
          : null}
      </Transition>,
      document.body,
    )

    return popup
  }
}

export default AnalysisModal

const PopUp = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
  background-color: ${props => props.theme.popup};
  color: red;
  box-shadow: 5px 3px 3px 0px rgba(0, 0, 0, 0.16);
  padding: 2rem 2.3rem;
  line-height: 1.2;
`
