import React from "react"
import { ThemeProvider } from "emotion-theming"
import MainCom from "./MainCom"

import createTheme from "styles/theme"
import resetStyle from "styles/reset"
import setSplitPaneStyle from "styles/setSplitPaneStyle"

const settings = window.require("electron-settings")

resetStyle()
setSplitPaneStyle()

class Setup extends React.Component {
  state = {
    hasError: false,
    theme: settings.get("colorTheme"),
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
  }

  switchColorTheme = theme => {
    settings.set("colorTheme", theme)
    this.setState({ theme })
  }

  render() {
    const { hasError, theme } = this.state

    if (hasError) {
      return <h1>Something went wrong.</h1>
    }

    return (
      <ThemeProvider theme={createTheme(theme)}>
        <MainCom switchColorTheme={this.switchColorTheme} />
      </ThemeProvider>
    )
  }
}

export default Setup
