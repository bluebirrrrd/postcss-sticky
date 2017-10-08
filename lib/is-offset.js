"use strict"
const offsets = [
  "top",
  "right",
  "bottom",
  "left",
]

module.exports = node => {
  return node.type == "decl"
    && offsets.includes(node.prop)
}
