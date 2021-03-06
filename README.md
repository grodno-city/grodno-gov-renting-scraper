# Scrap premises rented by Grodno government

[![Build Status](https://travis-ci.org/grodno-city/grodno-gov-renting-scraper.svg?branch=master)](https://travis-ci.org/grodno-city/grodno-gov-renting-scraper)

Scraper make requests to [http://grodno.gov.by/ru/main.aspx?guid=7101](http://grodno.gov.by/ru/main.aspx?guid=7101)

## Install
```bash
yarn add @grodno-city/grodno-gov-renting-scraper
```
or
```bash
npm install --save @grodno-city/grodno-gov-renting-scraper
```
## Usage

```js
const { extract } = require('@grodno-city/grodno-gov-renting-scraper')

const run = async () => {
  const result = await extract()
  console.log(result)
}

run()
```

Provided result has "premises by organization" format, so it will something like:
```js
[
  {
    name: 'Унитарное жилищное ремонтно-эксплуатационное предприятие Ленинского района',
    premises: [
      ...
      {
        address: 'ул. Академическая, 14',
        description: 'Нежилое изолированное помещение, на 1,2 этаже здания.',
        areas: '50,82; 39.0; 34.86;30.1; 14.4',
        appointment: 'офис, оказание услуг',
        contact: '43-04-47'
      }
      ...
    ]
  }
]
```

## Enhancers

Enhancers can transform specific fields to machine-readable format

### areaEnhancer

Transfrom `areas` field to array of numbers or objects

```js
const { extract, enhancers } = require('@grodno-city/grodno-gov-renting-scraper')
const { areaEnhancer } = enhancers

const run = async () => {
  const result = await extract()
  result.forEach(organization => {
    organization.premises.forEach(premise => {
      const enhancedAddress = areaEnhancer(premise.areas)
      console.log(enhancedAddress)
    })
  })
}

run()
```

Areas array can contains a numbers or an objects:
```js
  areas: [12, 50, {
    apartmentNumber: '24',
    area: '44.4'
  }]
```

## Api
  - extract()<Promise> - request and parse data
  - parse(rawText: String)<Object> - parse passed string
  - requestRawData()<String> - request and return string

## License
Under MIT license
