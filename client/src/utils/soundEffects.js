// Web Audio API Synthesizer for Tactical Esports UI Sound Effects + Gaming BGM Controller

let audioCtx = null
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

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => { })
  }
  return audioCtx
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

/**
 * Crisp tactical UI click sound (high-tech mechanical snap + subtle low punch)
 */
export function playClickSound(variant = 'default') {
  if (sfxMuted) return
  startBackgroundMusic()
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // High-tech transient click
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(variant === 'primary' ? 1850 : 1450, now)
    filter.Q.setValueAtTime(2.5, now)

    osc.type = 'triangle'
    const startFreq = variant === 'primary' ? 1100 : 880
    const endFreq = variant === 'primary' ? 280 : 210
    osc.frequency.setValueAtTime(startFreq, now)
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.055)

    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.065)

    // Subtle secondary harmonic chirp for primary actions
    if (variant === 'primary') {
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1600, now + 0.015)
      osc2.frequency.exponentialRampToValueAtTime(2400, now + 0.07)

      gain2.gain.setValueAtTime(0.08, now + 0.015)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.075)

      osc2.connect(gain2)
      gain2.connect(ctx.destination)

      osc2.start(now + 0.015)
      osc2.stop(now + 0.08)
    }
  } catch {
    // Ignore audio context errors on restricted autoplay
  }
}

/**
 * Subtle high-frequency tactical tick on hover
 */
export function playHoverSound() {
  if (sfxMuted) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(2200, now)
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.022)

    gain.gain.setValueAtTime(0.035, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.028)
  } catch {
    // Ignore
  }
}

/**
 * Futuristic esports sweep when entering site or opening player dossier modal
 */
export function playEnterSound() {
  if (sfxMuted) return
  startBackgroundMusic()
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // Rising power chord / sweep
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc1.type = 'sawtooth'
    osc1.frequency.setValueAtTime(110, now)
    osc1.frequency.exponentialRampToValueAtTime(440, now + 0.22)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(220, now)
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.25)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(400, now)
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.22)

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + 0.34)
    osc2.stop(now + 0.34)
  } catch {
    // Ignore
  }
}
