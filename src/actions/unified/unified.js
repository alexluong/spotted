import React from "react"
import unified from "unified"
import rehype from "rehype"
import remark2rehype from "remark-rehype"
import markdown from "remark-parse"
import htmlStringify from "rehype-stringify"
import rehype2react from "rehype-react"

const toHtmlProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(htmlStringify)

export const convertMarkdownToHtml = function(md) {
  return String(toHtmlProcessor.processSync(md))
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
