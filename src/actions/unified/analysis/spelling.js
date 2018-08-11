import React from "react"
import rehype from "rehype"
import rehype2react from "rehype-react"
import writeGood from "write-good"

/**
 * @param {text}: html string
 * @param {modal}: the analysis modal, use for housing the popup
 */
const checkSpellingAndGrammar = function(text, modal) {
  let html = text

  if (!html) {
    return null
  }

  const suggestions = writeGood(html)

  // Split html string into arrays of strings (cut at indexes)
  let lastIndex = 0
  const splittedString = suggestions.reduce(
    (a, { index, offset, reason }, i) => {
      a.push({
        text: html.substring(lastIndex, index),
        reason: undefined,
        index: undefined,
      })
      a.push({ text: html.substr(index, offset), reason, index: i })
      lastIndex = index + offset
      return a
    },
    [],
  )

  // Didn't get from the last word till the end, so we gotta do this
  splittedString.push({
    text: html.substring(lastIndex),
    reason: undefined,
    index: undefined,
  })

  const style = 'style="text-decoration: underline wavy red"'
  const mergedHtml = splittedString.reduce((a, v) => {
    if (!v.reason) {
      return `${a}${v.text}`
    } else {
      return `${a}<span ${style} index="${v.index}">${v.text}</span>`
    }
  }, "")

  // Create customized processor to add onHover functionality
  const htmlToReactProcessor = rehype().use(rehype2react, {
    createElement: (component, props = {}, children = []) => {
      const notElements = ["html", "head", "body"]
      if (notElements.includes(component)) {
        return children
      }

      const onMouseEnter = e => {
        const target = e.currentTarget
        const index = parseInt(target.getAttribute("index"), 10)
        const reason = suggestions[index].reason
        modal.createModal(target, reason)
      }

      const onMouseLeave = e => modal.removeModal()

      let propsObj = props
      // Components with style props are words that needs to be corrected
      if (props.style) {
        propsObj = { ...props, onMouseEnter, onMouseLeave }
      }

      return React.createElement(component, propsObj, children)
    },
  })

  const ReactComponent = htmlToReactProcessor.processSync(mergedHtml).contents
  return ReactComponent
}

export default checkSpellingAndGrammar
