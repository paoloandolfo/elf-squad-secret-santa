import { EVENT_SLUG } from '../config'

const sessionKey = `secret-santa:${EVENT_SLUG}:session`
const codeKey = `secret-santa:${EVENT_SLUG}:code`
const musicKey = 'secret-santa:music'
const revealKey = (memberId, drawnAt) => `secret-santa:${EVENT_SLUG}:revealed:${memberId}:${drawnAt}`

export const loadToken = () => localStorage.getItem(sessionKey)
export const saveToken = (token) => localStorage.setItem(sessionKey, token)
export const clearToken = () => localStorage.removeItem(sessionKey)

export const loadAccessCode = () => localStorage.getItem(codeKey)
export const saveAccessCode = (code) => localStorage.setItem(codeKey, code)
export const clearAccessCode = () => localStorage.removeItem(codeKey)

export const loadMusicOn = () => sessionStorage.getItem(musicKey) !== 'off'
export const saveMusicOn = (on) => sessionStorage.setItem(musicKey, on ? 'on' : 'off')

export const hasRevealed = (memberId, drawnAt) => localStorage.getItem(revealKey(memberId, drawnAt)) === '1'
export const markRevealed = (memberId, drawnAt) => localStorage.setItem(revealKey(memberId, drawnAt), '1')
export const forgetRevealed = (memberId, drawnAt) => localStorage.removeItem(revealKey(memberId, drawnAt))
