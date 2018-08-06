import React from "react"
import unifiedActions from "actions/unified"
import readabilityActions from "actions/unified/analysis/readability"

let key = 0

/**
 *  TODO: Still need to figure out type of elements
 *        Right now it only create spans because
 *        we stripped markdown to plain text
 */

class Readability extends React.Component {
  state = { type: "SentenceNode" }

  renderAll(node, parentIds) {
    const children = node.children
    const length = children.length
    let index = -1
    let results = []

    while (++index < length) {
      results = results.concat(
        this.renderNode(children[index], parentIds.concat(index)),
      )
    }

    return results
  }

  renderNode(node, parentIds) {
    let result = "value" in node ? node.value : this.renderAll(node, parentIds)
    const id = parentIds.join("-") + "-" + key
    const attrs =
      node.type === this.state.type ? readabilityActions.highlight(node) : null

    if (attrs) {
      result = React.createElement("span", { key: id, id, ...attrs }, result)
      key++
    }

    return result
  }

  render() {
    const { markdown, html, ...props } = this.props

    const text = unifiedActions.convertMarkdownToText(markdown)
    const textTree = unifiedActions.buildTextTree(text)

    const all = this.renderAll(textTree, [])

    const { htmlTree, analysis } = readabilityActions.runAnalysis(html)
    console.log({ htmlTree, analysis })
    console.log(analysis.messages[0].message)

    return (
      <div {...props} style={{ color: "#fff" }}>
        {all.map((one, i) => {
          if (React.isValidElement(one)) {
            return one
          } else if (one.includes("\n")) {
            return <br key={i} />
          } else {
            return one
          }
        })}
      </div>
    )
  }
}

export default Readability
