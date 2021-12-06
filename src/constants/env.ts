type EnvironmentVariable = string | number | boolean | undefined
enum NetlifyContext {
  Production,
  DeployPreview,
  BranchDeploy,
}
const context: NetlifyContext = getNetlifyContext()
export const FPJS_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_TOKEN,
  }) ?? 'DupfLoCdUm3gP2Gglg8G'
export const GTM_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_GTM_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_GTM_TOKEN,
  }) ?? 'test_gtm_token'
export const FPJS_API_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_API_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_API_TOKEN,
  }) ?? 'i6KfZR5nvPeSR6xH7yX0'
export const FPJS_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_ENDPOINT,
  }) ?? 'https://apiv2.fpjs.sh/'
export const FPJS_VISITORS_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_VISITORS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_VISITORS_ENDPOINT,
  }) ?? 'https://apiv2.fpjs.sh/visitors/'
export const FPJS_LEAD_URL =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_FPJS_LEAD_URL,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_FPJS_LEAD_URL,
  }) ?? ''
export const TLS_ENDPOINT =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_TLS_ENDPOINT,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_TLS_ENDPOINT,
  }) ?? 'https://staging.cache.fpjs.sh'
export const BOTD_TOKEN =
  getContextEnv<string>({
    [NetlifyContext.Production]: process.env.GATSBY_BOTD_TOKEN,
    [NetlifyContext.DeployPreview]: process.env.GATSBY_PREVIEW_BOTD_TOKEN,
  }) ?? 'bpRbA5pMCG5c0dWneq2'
export const FPJS_REGION = process.env.GATSBY_FPJS_REGION
export const FPJS_DASHBOARD_ENDPOINT = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT
export const FPJS_MONITORING_CLIENT_ID = process.env.GATSBY_FPJS_MONITORING_CLIENT_ID
export const FPJS_MONITORING_TOKEN = process.env.GATSBY_FPJS_MONITORING_TOKEN
export const GITHUB_API_TOKEN = process.env.GATSBY_GITHUB_API_TOKEN
export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidmFsdmUxIiwiYSI6ImNqeXUwdHlnejA5YzMzaHBnN3R4OXF1czEifQ.4-Wne3WDiafdfFGLSTkFiQ'
export const ROLLBAR_ACCESS_TOKEN = process.env.GATSBY_ROLLBAR_ACCESS_TOKEN
export const BRANCH = process.env.BRANCH
export const HOST =
  getContextEnv<string>({
    [NetlifyContext.Production]: 'https://fingerprintjs.com',
    [NetlifyContext.DeployPreview]: process.env.DEPLOY_PRIME_URL,
  }) ?? 'https://fingerprintjs.com'
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
