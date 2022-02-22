import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const config: FingerprintJS.GetOptions<true> = {
  extendedResult: true,
  timeout: 30_000,
}

export const useUserLocation = () => {
  const { data } = useVisitorData(config)
  const userRegion = data && data.ipLocation?.continent?.code?.toUpperCase()
  const isEuUser = userRegion === 'EU'

  return { isEuUser, userRegion }
}
