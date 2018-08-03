import { injectGlobal } from "react-emotion"

export default function resetStyle() {
  injectGlobal`
    *,
    *::after,
    *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
      z-index: 1;
      font-size: inherit;
    }
    html,
    body {
      height: 100%;
      width: 100%;
    }
    html {
      font-size: 62.5%; /* defines 1rem = 10px */
    }
    body {
      box-sizing: border-box;
      font-family: sans-serif;
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 1.7;
      color: #000;
    }
    #root {
      width: 100%;
      height: 100%;
    }
  `
}
