import test from 'ava'
import { areaEnhancer } from './enhancers'

const specificAppartmentFormatFixture = `
        кв.№24-44,4;
        кв.№37-44,3
`

const specificAppartmentFormatResultFixture = [{
  apartmentNumber: '24',
  area: '44.4'
}, {
  apartmentNumber: '37',
  area: '44.3'
}]

test('should parse specific appartment format (getAreasArrayFromNode)', t => {
  const result = areaEnhancer(specificAppartmentFormatFixture)
  t.deepEqual(result, specificAppartmentFormatResultFixture, 'specific appartment number format is not parsed correct')
})
