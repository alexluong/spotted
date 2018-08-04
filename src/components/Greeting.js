import React from "react"
import { css } from "react-emotion"

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
  color: #fff;
  background-color: #191324;

  h1 {
    font-size: 2.4rem;
  }
`
