import React from "react"
import styled from "react-emotion"

const Greeting = () => (
  <Container>
    <h1>Press Cmd + O to open directory</h1>
  </Container>
)

export default Greeting

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};
  h1 {
    font-size: 2.4rem;
  }
`
