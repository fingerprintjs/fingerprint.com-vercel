type EnvironmentVariable = string | number | boolean | undefined

enum NetlifyContext {
  Production,
  DeployPreview,
  BranchDeploy,
}
const context: NetlifyContext = getNetlifyContext()

export const FPJS_PUBLIC_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_PUBLIC_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_PUBLIC_TOKEN,
  }) ?? 'test_public_token'

export const FPJS_SCRIPT_URL_PATTERN = getContextEnv<string | undefined>({
  [NetlifyContext.Production]: process.env.GATSBY_FPJS_SCRIPT_URL_PATTERN,
  [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_SCRIPT_URL_PATTERN,
})

export const GTM_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_GTM_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_GTM_TOKEN,
  }) ?? 'test_gtm_token'

export const FPJS_SECRET_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_SECRET_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_SECRET_TOKEN,
  }) ?? 'test_fpjs_secret_token'

export const BOTD_TOKEN_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_BOTD_TOKEN_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_BOTD_TOKEN_ENDPOINT,
  }) ?? 'test_botd_token_endpoint'

export const FPJS_VISITORS_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_VISITORS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_VISITORS_ENDPOINT,
  }) ?? 'https://h1.fingerprintjs.com/pamplemousse/'

export const FPJS_MGMT_API_HOST =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_MGMT_API_HOST,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_MGMT_API_HOST,
  }) ?? ''

export const BOTD_PUBLIC_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_BOTD_PUBLIC_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_BOTD_PUBLIC_TOKEN,
  }) ?? ''

export const BOTD_SECRET_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_BOTD_SECRET_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_BOTD_SECRET_TOKEN,
  }) ?? ''

export const BOTD_PUBLIC_KEY_TURING =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_BOTD_PUBLIC_KEY_TURING,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_BOTD_PUBLIC_KEY_TURING,
  }) ?? ''

export const BOTD_VERIFY_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_BOTD_VERIFY_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_BOTD_VERIFY_ENDPOINT,
  }) ?? 'https://botd.fpapi.io/api/v1/verify'

export const FPJS_TLS_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_TLS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_TLS_ENDPOINT,
  }) ?? 'https://demo.fpxau.net/'

export const FPJS_INGRESS_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_ENDPOINT,
  }) ?? 'https://g.fingerprintjs.com/'

export const GREENHOUSE_COMPANY_ID =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_GREENHOUSE_COMPANY_ID,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_GREENHOUSE_COMPANY_ID,
  }) ?? 'fingerprinttest'

export const FPJS_REGION = process.env.GATSBY_FPJS_REGION
export const FPJS_DASHBOARD_ENDPOINT = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT
export const GITHUB_API_TOKEN = process.env.GATSBY_GITHUB_API_TOKEN
export const MAPBOX_ACCESS_TOKEN = process.env.GATSBY_MAPBOX_ACCESS_TOKEN
export const ROLLBAR_ACCESS_TOKEN = process.env.GATSBY_ROLLBAR_ACCESS_TOKEN
export const BRANCH = process.env.BRANCH

export const HOST =
  getContextEnv<string>({
    [NetlifyContext.Production]: 'https://fingerprint.com',
    [NetlifyContext.DeployPreview]: process.env.DEPLOY_PRIME_URL,
  }) ?? 'https://fingerprint.com'

function getNetlifyContext(): NetlifyContext {
  switch (process.env.CONTEXT) {
    case 'production':
      return NetlifyContext.Production
    case 'deploy-preview':
      return NetlifyContext.DeployPreview
    case 'branch-deploy':
      return NetlifyContext.BranchDeploy
    default:
      return NetlifyContext.Production
  }
}

function getContextEnv<T extends EnvironmentVariable>(entries: { [key in NetlifyContext]?: EnvironmentVariable }) {
  return (entries[context] ?? entries[NetlifyContext.Production]) as T
}
