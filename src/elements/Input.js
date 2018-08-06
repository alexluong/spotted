import React from "react"
import { css, cx } from "react-emotion"
import Color from "utilities/Color"

const Input = ({ className, ...props }) => (
  <input {...props} className={cx(inputCss, className)} />
)

export default Input

const inputCss = css`
  display: block;
  max-width: 100%;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: transparent;
  color: ${Color.get("text")};
`
