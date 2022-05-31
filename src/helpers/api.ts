import {
  FPJS_SECRET_TOKEN,
  FPJS_VISITORS_ENDPOINT,
  FPJS_MGMT_API_HOST,
  BOTD_TOKEN_ENDPOINT,
  GREENHOUSE_COMPANY_ID,
} from '../constants/env'

export async function loadFpjsHistory(visitorId: string) {
  const response = await fetch(`${FPJS_VISITORS_ENDPOINT}${visitorId}?token=${FPJS_SECRET_TOKEN}&limit=20`)
  return await response.json()
}

export async function createNewLead(
  formName: string,
  email: string,
  url: string,
  phone: string,
  jobTitle: string,
  description: string,
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
      description,
      phone,
      jobTitle,
      utm_info: utmParams,
      landingPage,
      previousPage,
      sessionId,
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
