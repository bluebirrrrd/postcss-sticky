"use strict"
const postcss = require("postcss")
const {name} = require("./package")

const plugin = root => root.walkDecls(decl => {
  if (decl != "position: sticky") return

  decl.cloneBefore({
    value: "relative",
  })
})

module.exports = postcss.plugin(name, () => plugin)
