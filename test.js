import { readFileSync } from 'fs'
import test from 'ava'
import { parse } from './'

const fixtureBody = readFileSync('./fixture.html').toString()
const parsedData = parse(fixtureBody) // premisesByOrganization

// Test constants
// Depends on fixture
const ORGANIZATIONS_COUNT = 13
const FIRST_ORGANIZATION_PREMISES_COUNT = 65

const premiseFixture = {
  address: 'ул. Академическая, 14',
  description: 'Нежилое изолированное помещение, на 1,2 этаже здания.',
  areas: [ 50.82, 39, 34.86, 30.1, 14.4 ],
  appointment: 'офис, оказание услуг',
  contact: '43-04-47'
}

test('should return correct organizations count', t => {
  t.is(parsedData.length, ORGANIZATIONS_COUNT, `Organizations count is not equal ${ORGANIZATIONS_COUNT}`)
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
