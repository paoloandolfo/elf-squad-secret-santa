import { saveAccessCode } from './storage'

const PARAM = 'code'

export const isCodeError = (error) => error?.code === 'code_required' || error?.code === 'bad_access_code'

export function captureCodeFromUrl() {
  const url = new URL(window.location.href)
  const code = url.searchParams.get(PARAM)?.trim()
  if (!code) return
  saveAccessCode(code)
  url.searchParams.delete(PARAM)
  window.history.replaceState(null, '', url.pathname + url.search + url.hash)
}

export function inviteLink(code) {
  const url = new URL(window.location.pathname, window.location.origin)
  url.searchParams.set(PARAM, code)
  return url.toString()
}
