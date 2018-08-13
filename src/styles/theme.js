const light = {
  primary: "#82d8d8",
  secondary: "#e54b4b",
  background: "#fff",
  backgroundDark: "#dedede",
  backgroundLight: "#dedede",
  text: "#121212",
  headerText: "#bbb",
  popup: "#f1f1f1",
}

const dark = {
  primary: "#82d8d8",
  secondary: "#e54b4b",
  background: "#191324",
  backgroundDark: "#140f1d",
  backgroundLight: "#373142",
  text: "#fff",
  headerText: "#75717c",
  popup: "#2c243d",
}

const color = { light, dark }

function createTheme(theme) {
  return color[theme]
}

export default createTheme
