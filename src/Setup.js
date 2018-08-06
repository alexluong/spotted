import React from "react"
import MainCom from "./MainCom"
import App from "./App"

class Setup extends React.Component {
  state = { hasError: false }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return (
      <MainCom>
        <App />
      </MainCom>
    )
  }
}

export default Setup
