const light = {
  primary: "#82d8d8",
  secondary: "#e54b4b",
  background: "#fff",
  backgroundDark: "#dedede",
  backgroundLight: "#dedede",
  text: "#121212",
  headerText: "#bbb",
}

const dark = {
  primary: "#82d8d8",
  secondary: "#e54b4b",
  background: "#191324",
  backgroundDark: "#140f1d",
  backgroundLight: "#373142",
  text: "#fff",
  headerText: "#75717c",
}

const color = { light, dark }

function createTheme(theme) {
  return color[theme]
}

export default createTheme
