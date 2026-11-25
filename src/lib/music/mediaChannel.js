import { silentWavUrl } from './silentWav'

// iPhones send web audio through the ringer channel, so the silent switch mutes it.
// Declaring the page as media playback moves it to the media channel, like a video.
// iOS before 16.4 has no Audio Session API; a silent looping media element does the same job there.
const hasAudioSession = typeof navigator !== 'undefined' && 'audioSession' in navigator
const isIOS = typeof navigator !== 'undefined'
  && (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

let keepAlive = null

function silentLoop() {
  if (!keepAlive) {
    keepAlive = new Audio(silentWavUrl())
    keepAlive.loop = true
    keepAlive.setAttribute('playsinline', '')
  }
  return keepAlive
}

export function claimMediaChannel() {
  if (hasAudioSession) navigator.audioSession.type = 'playback'
  else if (isIOS) silentLoop().play().catch(() => {})
}

export function releaseMediaChannel() {
  keepAlive?.pause()
}
