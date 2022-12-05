import countriesRegionJson from '../constants/countriesRegion.json'

export enum Region {
  APAC = 'APAC',
  EMEA = 'EMEA',
  LATAM = 'LATAM',
  AMER = 'AMER',
}
export function getCountryRegion(countryCode: string) {
  const region = Object.keys(countriesRegionJson).find((key) =>
    countriesRegionJson[key].countries.includes(countryCode)
  ) as Region

  return region || Region.AMER
}
