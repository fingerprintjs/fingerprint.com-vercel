import * as React from 'react'
import type { GatsbySSR } from 'gatsby'

import {
  FPJS_SCRIPT_URL_PATTERN,
  FPJS_VISITORS_ENDPOINT,
  FPJS_TLS_ENDPOINT,
  FPJS_INGRESS_ENDPOINT,
} from './src/constants/env'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel='preconnect' key='dns-prefetch-google-analytics' href='https://www.google-analytics.com' />,
    <link rel='preconnect' key='google-tag-manager' href='https://www.googletagmanager.com' />,
    <link rel='preconnect' key='cdn-segment' href='https://cdn.segment.com' />,
    <link rel='preconnect' key='api-mapbox' href='https://api.mapbox.com' />,

    FPJS_SCRIPT_URL_PATTERN && (
      <link rel='preconnect' key='fpjs-script' href={`https://${FPJS_SCRIPT_URL_PATTERN.split('/')[2]}`} />
    ),
    FPJS_VISITORS_ENDPOINT && (
      <link
        crossOrigin='anonymous'
        rel='preconnect'
        key='fpjs-visitors-crossOrigin'
        href={`https://${FPJS_VISITORS_ENDPOINT.split('/')[2]}`}
        as='fetch'
      />
    ),
    FPJS_TLS_ENDPOINT && <link rel='preconnect' key='fpjs-tls' href={FPJS_TLS_ENDPOINT} crossOrigin='anonymous' />,
    FPJS_INGRESS_ENDPOINT && <link rel='preconnect' key='fpjs-ingress' href={FPJS_INGRESS_ENDPOINT} />,
  ])
}
