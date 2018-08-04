import React from "react"
import { css, cx } from "react-emotion"

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
  background-color: #191324;
  color: #fff;
`
