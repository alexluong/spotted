import React from "react"
import unified from "unified"
import rehype from "rehype"
import remark2rehype from "remark-rehype"
import rehype2retext from "rehype-retext"
import markdown from "remark-parse"
import htmlParser from "rehype-parse"
import htmlStringify from "rehype-stringify"
import english from "retext-english"
import readability from "retext-readability"
import rehype2react from "rehype-react"

const toHtmlProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(htmlStringify)

export const convertMarkdownToHtml = function(md) {
  return String(toHtmlProcessor.processSync(md))
}

const readabilityProcessor = unified()
  .use(htmlParser)
  .use(
    rehype2retext,
    unified()
      .use(english)
      .use(readability),
  )
  .use(htmlStringify)

export const analyzeReadability = function(html) {
  return readabilityProcessor.processSync(html)
}

const htmlToReactProcessor = rehype().use(rehype2react, {
  createElement: (component, props = {}, children = []) => {
    const notElements = ["html", "head", "body"]
    if (notElements.includes(component)) {
      return children
    }

    return React.createElement(component, props, children)
  },
})

export const convertHtmlToReact = function(html) {
  return htmlToReactProcessor.processSync(html)
}
