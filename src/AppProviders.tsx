import React from 'react'
import { FormProvider } from './hooks/useForm'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { GithubProvider } from './context/GithubContext'
import { HistoryListener } from './context/HistoryListener'
import { FPJS_PUBLIC_TOKEN, FPJS_REGION, FPJS_CDN_URL } from './constants/env'

export type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  const publicToken = FPJS_PUBLIC_TOKEN
  const region = FPJS_REGION as FingerprintJS.Region
  const cdnUrl = FPJS_CDN_URL
  return (
    <FpjsProvider
      loadOptions={{
        token: publicToken,
        region,
        cdnUrl,
      }}
    >
      <FormProvider>
        <GithubProvider>
          <HistoryListener>
            <React.StrictMode>{children}</React.StrictMode>
          </HistoryListener>
        </GithubProvider>
      </FormProvider>
    </FpjsProvider>
  )
}
