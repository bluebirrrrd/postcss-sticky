"use strict"
const postcss = require("postcss")
const {name} = require("./package")

const offsets = [
  "top",
  "right",
  "bottom",
  "left",
]

const isOffset = node => {
  return node.type == "decl" && offsets.includes(node.prop)
}

const plugin = root => root.walkDecls(decl => {
  if (decl != "position: sticky") return

  decl.cloneBefore({
    value: "relative",
  })

  let rule = decl.parent

  rule.before({
    name: "supports",
    params: `(${decl})`,
    nodes: {
      selector: rule.selector,
      nodes: rule.nodes.filter(isOffset),
    },
    source: decl.source,
  })
})

module.exports = postcss.plugin(name, () => plugin)
