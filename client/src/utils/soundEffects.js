// Background Music Controller for Team Exiles (UI click/hover SFX disabled)

let sfxMuted = false
let bgmAudio = null
let bgmPlaying = false
const bgmListeners = new Set()

function notifyBgmListeners() {
  bgmListeners.forEach((fn) => {
    try {
      fn({ playing: bgmPlaying, muted: sfxMuted })
    } catch {
      // Ignore listener errors
    }
  })
}

export function subscribeAudioState(listener) {
  bgmListeners.add(listener)
  return () => bgmListeners.delete(listener)
}

function getBgmElement() {
  if (typeof window === 'undefined') return null
  if (!bgmAudio) {
    bgmAudio = new Audio('/audio/exiles-bgm.mp3?v=7696520265265679638')
    bgmAudio.loop = true
    bgmAudio.volume = 0.5
    bgmAudio.preload = 'auto'
    bgmAudio.addEventListener('play', () => {
      bgmPlaying = true
      notifyBgmListeners()
    })
    bgmAudio.addEventListener('pause', () => {
      bgmPlaying = false
      notifyBgmListeners()
    })
  }
  return bgmAudio
}

export function startBackgroundMusic() {
  if (sfxMuted) return
  const audio = getBgmElement()
  if (!audio) return
  audio.muted = false
  if (audio.paused) {
    audio.play().catch(() => {
      // Autoplay blocked until next user gesture
    })
  }
}

export function stopBackgroundMusic() {
  const audio = getBgmElement()
  if (!audio) return
  audio.pause()
}

export function isBgmPlaying() {
  return bgmPlaying && !sfxMuted
}

export function isSfxMuted() {
  return sfxMuted
}

export function setSfxMuted(muted) {
  sfxMuted = Boolean(muted)
  const audio = getBgmElement()
  if (audio) {
    if (sfxMuted) {
      audio.pause()
    } else {
      audio.muted = false
      audio.play().catch(() => { })
    }
  }
  notifyBgmListeners()
  return sfxMuted
}

    export function playClickSound() {
      if (!sfxMuted) {
        startBackgroundMusic()
      }
    }

    export function playHoverSound() {
      // No-op: UI hover sound effects disabled
    }

    export function playEnterSound() {
        if (!sfxMuted) {
          startBackgroundMusic()
        }
      }
