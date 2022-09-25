import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FormProvider } from '../hooks/useForm'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

const AllTheProviders: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: 'public-key',
      }}
    >
      <FormProvider>{children}</FormProvider>
    </FpjsProvider>
  )
}

export const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
