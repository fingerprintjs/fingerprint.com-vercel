import {
  FPJS_SECRET_TOKEN,
  FPJS_VISITORS_ENDPOINT,
  FPJS_MGMT_API_HOST,
  BOTD_TOKEN_ENDPOINT,
  GREENHOUSE_COMPANY_ID,
} from '../constants/env'

export async function loadFpjsHistory(visitorId: string) {
  // 21 to show >20 on homepage
  const response = await fetch(`${FPJS_VISITORS_ENDPOINT}${visitorId}?token=${FPJS_SECRET_TOKEN}&limit=21`)
  return await response.json()
}

export async function createNewLead(
  formName: string,
  email: string,
  url: string,
  jobTitle: string,
  landingPage: string,
  previousPage: string,
  utmParams: Record<string, string>,
  sessionId: string
) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formName,
      email,
      url,
      jobTitle,
      utm_info: utmParams,
      landingPage,
      previousPage,
      sessionId,
    }),
  })
}

export async function subscribeToNewsletter(email: string, utmParams: Record<string, string>) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      utm_info: utmParams,
    }),
  })
}

export async function generateBotDToken(customerEmail: string, tag: string, sessionId: string) {
  return fetch(BOTD_TOKEN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      customer: customerEmail,
      tag,
      sessionId,
    }),
  })
}

export async function requestBotdKeys(customerEmail: string, sessionId: string, utmParams: Record<string, string>) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/request_botd_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: customerEmail,
      sessionId,
      utm_info: utmParams,
    }),
  })
}

export async function getListingsFromGreenhouse() {
  const response = await fetch(`https://api.greenhouse.io/v1/boards/${GREENHOUSE_COMPANY_ID}/jobs?content=true`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }
  const jobsJson = await response.json()

  if (!jobsJson.jobs) {
    throw new Error(`couldn't retrieve jobs from Greenhouse`)
  }

  return jobsJson
}

export async function getJobInfoFromGreenhouse(jobId: string) {
  const response = await fetch(`https://api.greenhouse.io/v1/boards/${GREENHOUSE_COMPANY_ID}/jobs/${jobId}`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }
  const jobJson = await response.json()

  if (!jobJson.id) {
    throw new Error(`couldn't retrieve job information from Greenhouse`)
  }

  return jobJson
}

export async function contactSupport(
  email: string,
  description: string,
  utmParams: Record<string, string>,
  sessionId: string
) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/support`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      description,
      utm_info: utmParams,
      sessionId,
    }),
  })
}
