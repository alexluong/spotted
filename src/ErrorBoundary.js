import React from "react"

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h1>Something went wrong.</h1>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
