"use strict"
const {plugin} = require("postcss")
const {name} = require("../package")
const isOffset = require("./is-offset")

const sticky = root => root.walkDecls(decl => {
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

module.exports = plugin(name, () => sticky)
