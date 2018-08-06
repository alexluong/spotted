const defaultTheme = {
  primary: "#82d8d8",
  secondary: "#e54b4b",
  background: "#191324",
  backgroundDark: "#140f1d",
  backgroundLight: "#373142",
  text: "#fff",
  headerText: "#75717c",
}

class Color {
  static get(type) {
    return defaultTheme[type]
  }
}

export default Color
