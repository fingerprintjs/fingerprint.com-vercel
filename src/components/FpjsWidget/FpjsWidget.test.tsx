import React from 'react'
import { renderWithProviders, screen, act } from '../../test/test-utils'
import FpjsWidget from '.'
import * as FPJS from '@fingerprintjs/fingerprintjs-pro'

const fpjsLoadMock = FPJS.load as jest.Mock

beforeEach(() => {
  fetchMock.resetMocks()
})
describe('Fingerprint Demo Widget', () => {
  const visitorId = `somethingRandom${Math.random()}`
  const ip1 = '111.222'
  const ip2 = '222.333'

  const visitsHistory = {
    visitorId,
    visits: [
      {
        requestId: '1644277612582.tnARCM',
        browserDetails: {
          browserName: 'Chrome',
          browserMajorVersion: '97',
          browserFullVersion: '97.0.4692',
          os: 'Mac OS X',
          osVersion: '10.15.7',
          device: 'Other',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
          botProbability: 0,
        },
        incognito: false,
        ip: ip1,
        ipLocation: {
          accuracyRadius: 20,
          latitude: -34.6922,
          longitude: -58.3163,
          postalCode: '1874',
          timezone: 'America/Argentina/Buenos_Aires',
          city: { name: 'Wilde' },
          country: { code: 'AR', name: 'Argentina' },
          continent: { code: 'SA', name: 'South America' },
          subdivisions: [{ isoCode: 'B', name: 'Buenos Aires' }],
        },
        timestamp: 1644277612593,
        time: '2022-02-07T23:46:52Z',
        url: 'https://fingerprint.com/',
        tag: {},
        confidence: { score: 1 },
        visitorFound: true,
        firstSeenAt: { global: 1643901550000, subscription: 1643901550000 },
        lastSeenAt: { global: 1644277606071, subscription: 1644277606071 },
      },
      {
        requestId: '1644277606067.73RTv8',
        browserDetails: {
          browserName: 'Chrome',
          browserMajorVersion: '97',
          browserFullVersion: '97.0.4692',
          os: 'Mac OS X',
          osVersion: '10.15.7',
          device: 'Other',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
          botProbability: 0,
        },
        incognito: true,
        ip: ip2,
        ipLocation: {
          accuracyRadius: 20,
          latitude: -34.6922,
          longitude: -58.3163,
          postalCode: '1874',
          timezone: 'America/Argentina/Buenos_Aires',
          city: { name: 'Wilde' },
          country: { code: 'AR', name: 'Argentina' },
          continent: { code: 'SA', name: 'South America' },
          subdivisions: [{ isoCode: 'B', name: 'Buenos Aires' }],
        },
        timestamp: 1644277606071,
        time: '2022-02-07T23:46:46Z',
        url: 'https://fingerprint.com/',
        tag: {},
        confidence: { score: 1 },
        visitorFound: true,
        firstSeenAt: { global: 1643901550000, subscription: 1643901550000 },
        lastSeenAt: { global: 1644255963456, subscription: 1644255963456 },
      },
    ],
    lastTimestamp: 1643979886556,
  }

  const fpResponse: FPJS.GetResult = {
    visitorId,
    visitorFound: true,
    requestId: visitorId,
    confidence: { score: 0.995 },
  }
  const errorMessage = 'Please refresh the page or try in incognito mode.'

  it('Should display the correct visitor information', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(visitsHistory), {
      status: 200,
    })

    fpjsLoadMock.mockResolvedValue({
      get: jest.fn().mockResolvedValue(fpResponse),
    })

    renderWithProviders(<FpjsWidget />)
    await act(() => Promise.resolve())

    // Demo widget loads current visit for desktop and all mobile cards

    const visitorIds = await screen.findAllByText(visitorId, { exact: false })
    const incognitoVisits = await screen.findAllByText('Yes')
    const ip1Visits = await screen.findAllByText(ip1)
    const ip2Visits = await screen.findAllByText(ip2)
    const browserVisits = await screen.findAllByText('Chrome on Mac OS X (10.15.7)')

    expect(visitorIds).toHaveLength(3)
    expect(incognitoVisits).toHaveLength(1)
    expect(ip1Visits).toHaveLength(2)
    expect(ip2Visits).toHaveLength(1)
    expect(browserVisits).toHaveLength(3)

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('Should display an error message if the visits endpoint fails or is blocked', async () => {
    fetchMock.mockReject(new Error('server error'))

    fpjsLoadMock.mockResolvedValue({
      get: jest.fn().mockResolvedValue(fpResponse),
    })

    renderWithProviders(<FpjsWidget />)
    await act(() => Promise.resolve())

    await screen.findByText(errorMessage, { exact: false })

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
  it('Should display an error message if the core API or TLS endpoints fail or are blocked', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(visitsHistory), {
      status: 200,
    })
    fpjsLoadMock.mockRejectedValue(new Error())

    renderWithProviders(<FpjsWidget />)
    await act(() => Promise.resolve())

    await screen.findByText(errorMessage, { exact: false })

    expect(fetchMock).toHaveBeenCalledTimes(0)
  })
})
