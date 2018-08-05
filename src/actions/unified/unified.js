/**
 * TODO: CLEAN UP!!!!!
 */

import unified from "unified"
// import vfile from "vfile"
import remark from "remark"
import remark2rehype from "remark-rehype"
import remark2retext from "remark-retext"
import markdown from "remark-parse"
import stripMarkdown from "strip-markdown"
import rehypeStringify from "rehype-stringify"
import retextStringify from "retext-stringify"
import english from "retext-english"
// import indefiniteArticle from "retext-indefinite-article"

// Analysis
// import readability from "./analysis/readability"

const unifiedActions = {}

const englishProcessor = unified().use(english)

// const toTextProcessor = unified()
//   .use(markdown)
//   .use(remark2retext, unified().use(english))
//   .use(retextStringify)

const toHtmlProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehypeStringify)

unifiedActions.convertMarkdownToHTML = function(md) {
  return String(toHtmlProcessor.processSync(md))
}

unifiedActions.analyze = function(type, value) {
  switch (type) {
    case "text":
      return 1
    case "readability":
      return analyzeReadability(value)
    default:
      return ""
  }
}

unifiedActions.convertMarkdownToText = function convertMarkdownToText(md) {
  return String(
    remark()
      .use(stripMarkdown)
      .processSync(md),
  )
}

unifiedActions.buildTextTree = function(text) {
  return englishProcessor.runSync(englishProcessor.parse(text))
}

function analyzeReadability(md) {
  // const text = readability(md)
  return 1
}

export default unifiedActions
