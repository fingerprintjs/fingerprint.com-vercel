import { BRANCH, HOST, CONTACT_SALES_CALENDAR } from './env'

export const BASE_URL = HOST

export const PATH = {
  demoUrl: '/demo/',
  pricingUrl: '/pricing/',
  accountTakeover: '/account-takeover/',
  ecommerce: '/ecommerce/',
  gaming: '/gaming/',
  cryptocurrency: '/cryptocurrency/',
  paymentFraud: '/payment-fraud/',
  blog: '/blog/',
  paywall: '/paywall/',
  caseStudies: '/case-studies/',
  contactSales: '/contact-sales/',
  whyFpjs: '/products/device-identification/',
  accountSharing: '/products/account-sharing-prevention/',
  botD: '/products/bot-detection/',
  bnpl: '/buy-now-pay-later/',
  careers: '/careers/',
  jobs: '/careers/jobs/',
  support: '/support/',
  security: '/security/',
  useCases: '/use-cases/',
  faq: '/resources/frequently-asked-questions-faqs/',
  integrations: '/integrations/',
} as const

export const URL = {
  githubRepoUrl: 'https://github.com/fingerprintjs/fingerprintjs/',
  githubApiUrl: 'https://api.github.com/repos/fingerprintjs',
  githubCommunityRepoUrl: 'https://github.com/fingerprintjs/home',
  botDRepoUrl: 'https://github.com/fingerprintjs/BotD',
  botDIntegrationsRepoUrl: 'https://github.com/fingerprintjs/botd-integrations',
  dashboardLoginUrl: 'https://dashboard.fingerprint.com/login',
  careersUrl: 'https://boards.greenhouse.io/fingerprintjs/',
  careersConsoleLogUrl: 'https://grnh.se/bb9c55804us',
  linkedinUrl: 'https://www.linkedin.com/company/fingerprintjs/',
  twitterUrl: 'https://twitter.com/FingerprintJs/',
  signupUrl: 'https://dashboard.fingerprint.com/signup',
  statusUrl: 'https://status.fingerprint.com',
  supportMail: 'support@fingerprint.com',
  salesMail: 'sales@fingerprint.com',
  worKMail: 'work@fingerprint.com',
  discordServerURL: 'https://discord.gg/ad6R2ttHVX',
  contactSalesCalendar: CONTACT_SALES_CALENDAR,
  docsUrl: 'https://dev.fingerprint.com',
  promotionalVideo: 'https://www.youtube.com/embed/UEYBysyPTBs',
} as const

export const MAILTO = { mailToUrl: `mailto:${URL.supportMail}` } as const
export const MAILTO_WORK = { mailToUrl: `mailto:${URL.worKMail}` } as const
export const MAILTO_SALES = { mailToUrl: `mailto:${URL.salesMail}` } as const

// links to readme should not have trailing slash to prevent forwarding
export const DOC_URL = {
  documentationUrl: `${URL.docsUrl}/docs`,
  getStartedUrl: `${URL.docsUrl}/docs/quick-start-guide`,
  proVsOpenUrl: `${URL.docsUrl}/docs/pro-vs-open-source`,
  browserFingerprintUrl: `${URL.docsUrl}/docs/browser-fingerprinting`,
  incognitoUrl: `${URL.docsUrl}/docs/incognito-private-mode-detection`,
  serverApiUrl: `${URL.docsUrl}/docs/server-api`,
  legalUrl: `${URL.docsUrl}/docs/dpa-gdpr`,
  termOfUseUrl: `${URL.docsUrl}/docs/terms-of-service`,
  privacyPolicyUrl: `${URL.docsUrl}/docs/privacy-policy`,
  browserSupportUrl: `${URL.docsUrl}/docs/browser-support`,
  webhooksUrl: `${URL.docsUrl}/docs/webhooks`,
  botDUrl: 'https://github.com/fingerprintjs/BotD#botd-currently-in-beta',
  zeroTrustUrl: `${URL.docsUrl}/docs/zero-trust-mode`,
  bestPracticesUrl: `${URL.docsUrl}/docs/best-practices`,
} as const

export const useCaseLinks = [
  { title: 'Account Takeover', url: PATH.accountTakeover, isLocal: true },
  { title: 'Payment Fraud', url: PATH.paymentFraud, isLocal: true },
  { title: 'Paywall', url: PATH.paywall, isLocal: true },
  { title: 'Ecommerce', url: PATH.ecommerce, isLocal: true },
  { title: 'Gaming', url: PATH.gaming, isLocal: true },
  { title: 'Cryptocurrency', url: PATH.cryptocurrency, isLocal: true },
  { title: 'Buy Now Pay Later', url: PATH.bnpl, isLocal: true },
]

export const products = [
  { title: 'Device Identification', url: PATH.whyFpjs, isLocal: true },
  { title: 'Account Sharing Prevention', url: PATH.accountSharing, isLocal: true },
  { title: 'Bot Detection', url: PATH.botD, isLocal: true },
]

export const company = [
  { title: 'Blog', url: PATH.blog, isLocal: true },
  { title: 'Careers', url: PATH.careers, isLocal: true },
]

export const defaultDataLayer = [{ branch: BRANCH }]

// When changing this, some markdown files need to be changed as well.
export const DEFAULT_TRIAL_DAYS = 10

export const THOUSAND_IDENTIFICATIONS_PRICE = 0.002

export const solutionsDropdown = {
  identify: [
    {
      title: 'Device Identification',
      url: PATH.whyFpjs,
      description: 'Identify web and mobile users with our high accuracy fingerprints.',
    },
    {
      title: 'Bot Detection',
      url: PATH.botD,
      description: 'Detect automated threats and better understand your traffic.',
    },
  ],
  protect: [
    {
      title: 'Payment Fraud',
      url: PATH.paymentFraud,
      description: 'Protect your revenue while keeping approval rates high.',
    },
    {
      title: 'Account Takeover',
      url: PATH.accountTakeover,
      description: 'Prevent more attacks without hindering user experience. ',
    },
  ],
  grow: [
    {
      title: 'Account Sharing Prevention',
      url: PATH.accountSharing,
      description: 'Increase revenue by converting users into paying customers.',
    },
    {
      title: 'Paywall Enforcement',
      url: PATH.paywall,
      description: 'Monetize your content effectively by eliminating bypass techniques.',
    },
  ],
}

export const industryDropdown = [
  { title: 'eCommerce', url: PATH.ecommerce },
  { title: 'Buy Now Pay Later (BNPL)', url: PATH.bnpl },
  { title: 'Online Gaming & Gambling', url: PATH.gaming },
  { title: 'Cryptocurrency', url: PATH.cryptocurrency },
]

// We need to reset the chatbot widget on the following pages
export const PAGES_RELOAD_CHATBOT = [
  `${PATH.useCases}personalization/`,
  `${PATH.useCases}account-sharing-prevention/`,
  `${PATH.useCases}payment-fraud/`,
  `${PATH.useCases}credential-stuffing/`,
  PATH.contactSales,
  PATH.whyFpjs,
  PATH.paymentFraud,
  PATH.accountTakeover,
  PATH.accountSharing,
  PATH.paywall,
  PATH.botD,
]
