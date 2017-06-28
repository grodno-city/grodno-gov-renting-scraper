const rp = require('request-promise')
const { load } = require('cheerio')
const { getTextFromNode, getAreasArrayFromNode } = require('./utils')

const URL = 'http://grodno.gov.by/ru/main.aspx?guid=7101'

const requestRawData = async () => {
  const requestOptions = {
    uri: URL
  }

  const body = await rp(requestOptions)
  return body.toString()
}

const parse = (rawText) => {
  const $ = load(rawText)
  const rawPremisisList = $('table tbody tr')
  // Remove unneded headers
  rawPremisisList.splice(0, 3)

  let currentOrganization = null
  const premisesByOrganization = rawPremisisList.toArray().reduce((acc, row) => {
    const cells = $(row).find('td')
    if (!cells.length) {
      return acc
    }

    const isOrganizationName = (cells.length === 1)

    if (isOrganizationName) {
      currentOrganization = {
        name: getTextFromNode(cells),
        premises: []
      }
      acc.push(currentOrganization)
      return acc
    }

    // Mapping
    const address = getTextFromNode($(cells[0]))
    const description = getTextFromNode($(cells[1]))
    const areas = getAreasArrayFromNode($(cells[2]))
    const appointment = getTextFromNode($(cells[3]))
    const contact = getTextFromNode($(cells[4]))

    const premise = {
      address,
      description,
      areas,
      appointment,
      contact
    }

    // currentOrganization variable checking missed specially.
    // We will quickly have an alert if something goes wrong.
    currentOrganization.premises.push(premise)
    return acc
  }, [])

  return premisesByOrganization
}

const extract = async () => {
  const $ = await requestRawData()
  const parsed = parse($)

  return parsed
}

module.exports = {
  extract,
  parse,
  requestRawData
}
