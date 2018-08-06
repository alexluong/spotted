import React from "react"
import { css } from "react-emotion"
import Color from "utilities/Color"

const Greeting = () => (
  <div className={greetingCss}>
    <h1>Press Cmd + O to open directory</h1>
  </div>
)

export default Greeting

const greetingCss = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Color.get("text")};
  background-color: ${Color.get("background")};
  h1 {
    font-size: 2.4rem;
  }
`
