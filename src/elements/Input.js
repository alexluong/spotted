import React from "react"
import styled from "react-emotion"

const Input = props => <StyledInput {...props} />

export default Input

const StyledInput = styled.input`
  display: block;
  max-width: 100%;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: transparent;
  color: ${props => props.theme.text};
`
