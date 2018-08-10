import unified from "unified"
import htmlParser from "rehype-parse"
import rehype2retext from "rehype-retext"
import english from "retext-english"
import readability from "retext-readability"
import htmlStringify from "rehype-stringify"

import * as actions from "../unified"

const processor = unified()
  .use(htmlParser)
  .use(
    rehype2retext,
    unified()
      .use(english)
      .use(readability),
  )
  .use(htmlStringify)

const analyzeReadability = function(text) {
  let html = text

  if (!html) {
    return null
  }

  const readabilityAnalysis = processor.processSync(html)

  const warnings = readabilityAnalysis.messages.map(
    ({ location, confidence }) => ({
      text: html.substring(location.start.offset, location.end.offset),
      score: parseInt(confidence[0], 10),
    }),
  )

  warnings.forEach(warning => {
    html = html.replace(
      warning.text,
      text =>
        `<span style="box-shadow: 0px 2px 0px 0px ${getColor(
          warning.score,
        )}">${text}</span>`,
    )
  })

  function getColor(score) {
    switch (score) {
      case 4:
        return "peachpuff"
      case 5:
        return "hotpink"
      case 6:
        return "crimson"
      case 7:
      default:
        return "red"
    }
  }

  const ReactComponent = actions.convertHtmlToReact(html).contents
  return ReactComponent
}

export default analyzeReadability
