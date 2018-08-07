import React from "react"
import PropTypes from "prop-types"
import styled from "react-emotion"

const propTypes = {
  headerContent: PropTypes.string.isRequired,
}

const Header = ({ headerContent, ...props }) => (
  <StyledHeader {...props}>{headerContent}</StyledHeader>
)

Header.propTypes = propTypes

export default Header

const StyledHeader = styled.header`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.headerText};
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
