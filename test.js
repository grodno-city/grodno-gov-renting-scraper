import { readFileSync } from 'fs'
import test from 'ava'
import { parse, extract } from './'
import { getAreasArrayFromNode } from './utils'

const fixtureBody = readFileSync('./fixture.html').toString()
const parsedData = parse(fixtureBody) // premisesByOrganization

// Test constants
// Depends on fixture
const ORGANIZATIONS_COUNT = 13
const FIRST_ORGANIZATION_NAME = 'Унитарное жилищное ремонтно-эксплуатационное предприятие Ленинского района'
const FIRST_ORGANIZATION_PREMISES_COUNT = 65

const premiseFixture = {
  address: 'ул. Академическая, 14',
  description: 'Нежилое изолированное помещение, на 1,2 этаже здания.',
  areas: [ 50.82, 39, 34.86, 30.1, 14.4 ],
  appointment: 'офис, оказание услуг',
  contact: '43-04-47'
}

const specificAppartmentFormatNodeFixture = {
  text: () => `
          кв.№24-44,4;
          кв.№37-44,3
  `
}

const specificAppartmentFormatResultFixture = [{
  apartmentNumber: '24',
  area: '44.4'
}, {
  apartmentNumber: '37',
  area: '44.3'
}]

test('should do request without error (iternet connection required)', async t => {
  await extract()
  t.pass()
})

test('should return correct organizations count', t => {
  t.is(parsedData.length, ORGANIZATIONS_COUNT, `Organizations count is not equal ${ORGANIZATIONS_COUNT}`)
})

test('first organization name should be correct', t => {
  t.is(parsedData[0].name, FIRST_ORGANIZATION_NAME, `First organization should has next name: "${FIRST_ORGANIZATION_NAME}"`)
})

test('should return correct premises count', t => {
  t.is(
    parsedData[0].premises.length,
    FIRST_ORGANIZATION_PREMISES_COUNT,
    `First organization premises count is not equal ${FIRST_ORGANIZATION_PREMISES_COUNT}`
  )
})

test('should return correct premise', t => {
  const premise = parsedData[0].premises[2]
  t.deepEqual(premise, premiseFixture, 'Premise is not equal fixture')
})

test('should parse specific appartment format (getAreasArrayFromNode)', t => {
  const result = getAreasArrayFromNode(specificAppartmentFormatNodeFixture)
  t.deepEqual(result, specificAppartmentFormatResultFixture, 'specific appartment number format is not parsed correct')
})
