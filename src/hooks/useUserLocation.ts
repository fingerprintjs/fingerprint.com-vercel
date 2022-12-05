import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../helpers/fpjs'
import { getCountryRegion, Region } from '../helpers/region'

export const useUserLocation = () => {
  const { data } = useVisitorData(getConfig)
  const userRegion = data?.ipLocation?.continent?.code?.toUpperCase()
  const userCountry = data?.ipLocation?.country?.code?.toUpperCase()
  const visitorId = data?.visitorId
  const countryRegion = userCountry ? getCountryRegion(userCountry) : Region.AMER

  const isEuUser = userRegion === 'EU'
  return { isEuUser, userRegion, userCountry, visitorId, countryRegion }
}
