import writeGood from "write-good"
import { convertHtmlToReact } from "../unified"

const checkSpellingAndGrammar = function(text) {
  let html = text

  if (!html) {
    return null
  }

  const suggestions = writeGood(html)

  const startSpan = '<span style="text-decoration: underline wavy red">'
  const endSpan = "</span>"

  let lastIndex = 0
  const splittedString = suggestions.reduce((a, { index, offset, reason }) => {
    a.push({ text: html.substring(lastIndex, index), reason: null })
    a.push({ text: html.substr(index, offset), reason })
    lastIndex = index + offset
    return a
  }, [])

  // Didn't get from the last word till the end, so we gotta do this
  splittedString.push({ text: html.substring(lastIndex), reason: null })

  const mergedHtml = splittedString.reduce((a, v) => {
    if (!v.reason) {
      return `${a}${v.text}`
    } else {
      return `${a}${startSpan}${v.text}${endSpan}`
    }
  }, "")

  console.log(mergedHtml)

  const ReactComponent = convertHtmlToReact(mergedHtml).contents
  return ReactComponent
}

export default checkSpellingAndGrammar
