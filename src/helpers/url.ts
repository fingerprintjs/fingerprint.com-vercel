export function withTrailingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`
}

export function withoutTrailingSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export function getRelativeUrl(url: string) {
  const relativeUrl = url.match(/fingerprint.com(\/.*)$/)
  return relativeUrl ? withTrailingSlash(relativeUrl[1]) : '/'
}

export const isLocalLink = (link: string) => /^\/(?!\/)/.test(link)

export const getHostname = (url: string) => {
  // use URL constructor and return hostname
  return new URL(url).hostname
}

export function normalizeWord(word: string) {
  return word.toLowerCase().replace(/\s+/g, '-')
}
