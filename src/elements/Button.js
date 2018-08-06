import React from "react"
import { css, cx } from "react-emotion"
import Color from "utilities/Color"

const Button = ({ className, ...props }) => (
  <button {...props} className={cx(buttonCss, className)} />
)

export default Button

const buttonCss = css`
  display: block;
  background-color: transparent;
  color: ${Color.get("text")};
  border: 1px solid ${Color.get("primary")};
  border-radius: 4px;
  margin: 1rem auto;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${Color.get("primary")};
    color: ${Color.get("background")};
  }
`
