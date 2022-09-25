import React from 'react'
import { renderWithProviders, screen, act } from '../../../test/test-utils'
import userEvent from '@testing-library/user-event'
import GenerateKeySection from './GenerateKeySection'
import * as FPJS from '@fingerprintjs/fingerprintjs-pro'
import * as fpjsReact from '@fingerprintjs/fingerprintjs-pro-react'
import * as Turing from '@fpjs-incubator/turing'

beforeAll(() => {
  jest.spyOn(Turing, 'ready').mockImplementation(async (fn) => fn())
  jest.spyOn(Turing, 'execute').mockResolvedValue('test-session-id')
})

beforeEach(() => {
  fetchMock.resetMocks()
})
describe('BotD - Generate Key Section', () => {
  const generatedKeys1set = { publicKey: 'cXRZjtIcM9fnMzpjrijZvJL1', secretKey: 'eIf88tZOlTyXHum9DdJqzTEP' }
  const generatedKeys2set = { publicKey: '3xVQBdCrc52Q05b2ZVIVCiXi', secretKey: '732yQlFeorXJ6KPx2pa5wmiJ' }

  const visitorId = `somethingRandom${Math.random()}`

  const fpResponse: FPJS.GetResult = {
    visitorId,
    visitorFound: true,
    requestId: visitorId,
    confidence: { score: 0.995 },
  }

  it('should show the generated keys if the form is submitted correctly', async () => {
    const user = userEvent.setup()

    fetchMock.mockResponse(JSON.stringify(generatedKeys1set), {
      status: 200,
    })

    jest.spyOn(fpjsReact, 'useVisitorData').mockImplementation(() => ({
      getData: async () => fpResponse,
      data: fpResponse,
    }))

    renderWithProviders(<GenerateKeySection />)
    await act(() => Promise.resolve())

    expect(screen.getByLabelText('Work email')).not.toBeDisabled()
    await user.type(screen.getByLabelText('Work email'), 'john@gmail.com')
    await user.click(screen.getByRole('button'))

    await screen.findByText('We will be in touch soon!')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
  it('should not send the request again if the email is the same', async () => {
    const user = userEvent.setup()
    fetchMock.mockResponseOnce(JSON.stringify(generatedKeys2set), {
      status: 200,
    })

    jest.spyOn(fpjsReact, 'useVisitorData').mockImplementation(() => ({
      getData: async () => fpResponse,
      data: fpResponse,
    }))

    renderWithProviders(<GenerateKeySection />)
    await act(() => Promise.resolve())

    expect(screen.getByLabelText('Work email')).not.toBeDisabled()
    await user.type(screen.getByLabelText('Work email'), 'john@gmail.com')
    await user.click(screen.getByRole('button'))

    await screen.findByText('We will be in touch soon!')

    expect(fetchMock).toHaveBeenCalledTimes(0)
  })

  it('should show the same keys during the session', async () => {
    const user = userEvent.setup()

    fetchMock.mockResponseOnce(JSON.stringify(generatedKeys1set), {
      status: 200,
    })

    jest.spyOn(fpjsReact, 'useVisitorData').mockImplementation(() => ({
      getData: async () => fpResponse,
      data: fpResponse,
    }))

    const { rerender } = renderWithProviders(<GenerateKeySection />)
    await act(() => Promise.resolve())

    expect(screen.getByLabelText('Work email')).not.toBeDisabled()
    await user.type(screen.getByLabelText('Work email'), 'john3@gmail.com')
    await user.click(screen.getByRole('button'))

    await screen.findByText('We will be in touch soon!')

    expect(fetchMock).toHaveBeenCalledTimes(1)

    rerender(<></>)
    rerender(<GenerateKeySection />)

    await screen.findByText('We will be in touch soon!')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('should have the button disabled if the visitorId is missing', async () => {
    jest.spyOn(fpjsReact, 'useVisitorData').mockImplementation(() => ({
      getData: async () => undefined,
      data: undefined,
    }))

    renderWithProviders(<GenerateKeySection />)
    await act(() => Promise.resolve())

    expect(screen.getByLabelText('Work email')).toBeDisabled()
  })

  it('should show an error message if the endpoint fails', async () => {
    const user = userEvent.setup()

    fetchMock.mockReject(new Error('server error'))

    jest.spyOn(fpjsReact, 'useVisitorData').mockImplementation(() => ({
      getData: async () => fpResponse,
      data: fpResponse,
    }))

    renderWithProviders(<GenerateKeySection />)
    await act(() => Promise.resolve())

    expect(screen.getByLabelText('Work email')).not.toBeDisabled()
    await user.type(screen.getByLabelText('Work email'), 'john2@gmail.com')
    await user.click(screen.getByRole('button'))

    await screen.findByText('Something went wrong')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('should show an error message if the answer to the challenge question was incorrect', async () => {
    const user = userEvent.setup()

    fetchMock.mockResponseOnce(
      JSON.stringify({
        error: { param: 'Turing', message: 'turing challenge is not verified' },
      }),
      { status: 400 }
    )

    jest.spyOn(fpjsReact, 'useVisitorData').mockImplementation(() => ({
      getData: async () => fpResponse,
      data: fpResponse,
    }))

    renderWithProviders(<GenerateKeySection />)
    await act(() => Promise.resolve())

    expect(screen.getByLabelText('Work email')).not.toBeDisabled()
    await user.type(screen.getByLabelText('Work email'), 'john2@gmail.com')
    await user.click(screen.getByRole('button'))

    await screen.findByText('The answer to the challenge question was incorrect.', { exact: false })

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
