import React from "react"
import styled from "react-emotion"

const Button = props => <StyledButton {...props} />

export default Button

const StyledButton = styled.button`
  display: block;
  background-color: transparent;
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  margin: 1rem auto;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
  }
`
