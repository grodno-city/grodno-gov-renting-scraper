const isNumber = require('lodash.isnumber')

const apartmentNumberRegExp = /кв.\s?№([0-9]+)-?\s?([0-9.,]+)/i

const areaEnhancer = areasString => {
  return areasString.split(';').reduce((acc, area) => {
    const cleanAreaText = area.trim().replace(',', '.')
    const hasApartmentNumber = apartmentNumberRegExp.test(cleanAreaText)
    if (hasApartmentNumber) {
      const parsed = cleanAreaText.match(apartmentNumberRegExp)
      acc.push({
        apartmentNumber: parsed[1],
        area: parsed[2]
      })
    } else {
      const parsedArea = parseFloat(cleanAreaText)
      if (isNumber(parsedArea)) {
        acc.push(parsedArea)
      }
    }

    return acc
  }, [])
}

module.exports = {
  areaEnhancer
}
