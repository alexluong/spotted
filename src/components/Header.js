import React from "react"
import PropTypes from "prop-types"
import { cx, css } from "react-emotion"

const propTypes = {
  headerContent: PropTypes.string.isRequired,
}

const Header = ({ headerContent, className, ...props }) => (
  <header className={cx(headerCss, className)}>{headerContent}</header>
)

Header.propTypes = propTypes

export default Header

const headerCss = css`
  background-color: #191324;
  color: #75717c;
  font-size: 1.4rem;
  height: 23px;
  line-height: 23px;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
`