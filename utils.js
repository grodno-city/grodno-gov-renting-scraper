const isNumber = require('lodash.isnumber')

const getTextFromNode = node => {
  return (node && node.text() ? node.text().trim() : null)
}

const getAreasArrayFromNode = node => {
  if (!node || !node.text()) {
    return []
  }

  const cleanAreasText = getTextFromNode(node)
  return cleanAreasText.split(';').reduce((acc, area) => {
    const cleanAreaText = area.trim().replace(',', '.')
    const parsedArea = parseFloat(cleanAreaText)

    if (isNumber(parsedArea)) {
      acc.push(parsedArea)
    }

    return acc
  }, [])
}

module.exports = {
  getTextFromNode,
  getAreasArrayFromNode
}
