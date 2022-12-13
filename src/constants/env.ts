export const FPJS_PUBLIC_TOKEN = process.env.GATSBY_FPJS_PUBLIC_TOKEN

export const FPJS_SCRIPT_URL_PATTERN = process.env.GATSBY_FPJS_SCRIPT_URL_PATTERN
export const GTM_TOKEN = process.env.GATSBY_GTM_TOKEN ?? 'test_gtm_token'

export const FPJS_SECRET_TOKEN = process.env.GATSBY_FPJS_SECRET_TOKEN ?? 'test_fpjs_secret_token'

export const BOTD_TOKEN_ENDPOINT = process.env.GATSBY_BOTD_TOKEN_ENDPOINT ?? 'test_botd_token_endpoint'

export const FPJS_VISITORS_ENDPOINT =
  process.env.GATSBY_FPJS_VISITORS_ENDPOINT ?? 'https://h1.fingerprintjs.com/pamplemousse/'

export const FPJS_MGMT_API_HOST = process.env.GATSBY_FPJS_MGMT_API_HOST ?? ''

export const BOTD_PUBLIC_TOKEN = process.env.GATSBY_BOTD_PUBLIC_TOKEN ?? ''

export const BOTD_SECRET_TOKEN = process.env.GATSBY_BOTD_SECRET_TOKEN ?? ''

export const BOTD_PUBLIC_KEY_TURING = process.env.GATSBY_BOTD_PUBLIC_KEY_TURING ?? ''

export const BOTD_VERIFY_ENDPOINT = process.env.GATSBY_BOTD_VERIFY_ENDPOINT ?? 'https://botd.fpapi.io/api/v1/verify'

export const BOTD_VERIFY_AGENT_ENDPOINT = process.env.GATSBY_BOTD_VERIFY_AGENT_ENDPOINT ?? 'https://api.fpjs.io'

export const FPJS_TLS_ENDPOINT = process.env.GATSBY_FPJS_TLS_ENDPOINT ?? 'https://demo.fpxau.net/'

export const FPJS_INGRESS_ENDPOINT = process.env.GATSBY_FPJS_ENDPOINT ?? 'https://g.fingerprintjs.com/'

export const AMPLITUDE_API_KEY = process.env.GATSBY_AMPLITUDE_API_KEY ?? ''

export const AMPLITUDE_API_ENDPOINT = process.env.GATSBY_AMPLITUDE_API_ENDPOINT ?? ''

export const GREENHOUSE_COMPANY_ID = process.env.GATSBY_GREENHOUSE_COMPANY_ID ?? 'fingerprinttest'

export const TURING_DEFAULT_SESSION_ID = process.env.GATSBY_FPJS_TURING_DEFAULT_SESSION_ID

export const APP_STORE_DEMO_URL = process.env.GATSBY_APP_STORE_DEMO_URL
export const GOOGLE_PLAY_DEMO_URL = process.env.GATSBY_GOOGLE_PLAY_DEMO_URL

export const CONTACT_SALES_CALENDAR_AMER =
  process.env.GATSBY_CONTACT_SALES_CALENDAR_AMER ?? 'https://calendly.com/fp-aurelijus'
export const CONTACT_SALES_CALENDAR_LATAM =
  process.env.GATSBY_CONTACT_SALES_CALENDAR_LATAM ?? 'https://calendly.com/fp-aurelijus'
export const CONTACT_SALES_CALENDAR_EMEA =
  process.env.GATSBY_CONTACT_SALES_CALENDAR_EMEA ?? 'https://calendly.com/fp-aurelijus'
export const CONTACT_SALES_CALENDAR_APAC =
  process.env.GATSBY_CONTACT_SALES_CALENDAR_APAC ?? 'https://calendly.com/fp-aurelijus'

export const FPJS_REGION = process.env.GATSBY_FPJS_REGION
export const FPJS_DASHBOARD_ENDPOINT = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT
export const GITHUB_API_TOKEN = process.env.GATSBY_GITHUB_API_TOKEN
export const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN
export const ROLLBAR_ACCESS_TOKEN = process.env.GATSBY_ROLLBAR_ACCESS_TOKEN ?? ''
export const BRANCH = process.env.BRANCH

export const HOST = process.env.VERCEL_ENV === 'preview' ? process.env.VERCEL_URL : 'https://fingerprint.com'
