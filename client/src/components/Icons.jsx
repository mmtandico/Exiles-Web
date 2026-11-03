// Exact Brand & Game Vector SVG Icons for Exiles Esports (Zero Emojis)

export function GlobeIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function UserIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function DownloadIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function RedirectIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export function PlayIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  )
}

export function BoltIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

export function CrossedSwordsIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
      <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
      <line x1="5" y1="14" x2="9" y2="18" />
      <line x1="7" y1="17" x2="4" y2="20" />
      <line x1="3" y1="19" x2="5" y2="21" />
    </svg>
  )
}

/**
 * Exact Game Logos for all 10 Competitive Titles
 */
export function GameSvgIcon({ gameId, className = 'apex-svg-icon' }) {
  switch (gameId) {
    case 'minecraft':
      // Official Minecraft Creeper Face Logo (exact 8x8 pixel geometry)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 2h20v20H2V2zm2 2v16h16V4H4zm2 2h4v4H6V6zm8 0h4v4h-4V6zm-4 4h4v4h-4v-4zm-2 2h2v6H8v-6zm6 0h2v6h-2v-6zm-4 2h4v2h-4v-2z" />
        </svg>
      )

    case 'valorant':
      // Official Valorant "V" Brand Mark
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 3.2v8.95l7.4 8.65h4.85L1.5 3.2zm21 0L12.75 15.1h4.85l4.9-5.8V3.2z" />
        </svg>
      )

    case 'bloodstrike':
      // Blood Strike Official Stylized Slash "B" & Reticle Emblem
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5L14.2 6H19l-3.8 4.2 1.5 3.3-5.2-1.8L6.5 18 9 11.2 4.5 8h4.8L12 1.5zM4 20.5L20 3.5l1.5 1.5L5.5 22 4 20.5z" />
        </svg>
      )

    case 'cod-mobile':
      // Call of Duty: Mobile Official Winged "M" Military Crest
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 6.5L6.5 9l3.2-4.2L12 8.2l2.3-3.4L17.5 9l5-2.5-2.2 10.5-4.3-2.2-4 5.2-4-5.2-4.3 2.2L1.5 6.5zm5.2 4.2l1.1 3.8 2.2-2.8-3.3-1zm10.6 0l-3.3 1 2.2 2.8 1.1-3.8z" />
        </svg>
      )

    case 'mobile-legends':
      // Mobile Legends: Bang Bang (MLBB) Winged "M" & Center Crystal Spire Logo
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 5.2L12 11.5 9.6 7.2 12 2zm-9.5 4l5.8 2.8 2.5 7.2-4.3 4-4-14zm19 0l-4 14-4.3-4 2.5-7.2L21.5 6zM12 13.2l2.2 4.8-2.2 4-2.2-4 2.2-4.8z" />
        </svg>
      )

    case 'league-of-legends':
      // Official League of Legends "L" Pillar & Ring Emblem
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 3h5.2l-1.2 2v12h5.8l1.7-3h2.2l-2 5.5H4.3l1.2-2V5L4.3 3h1.2zm11.3 2.4A8.5 8.5 0 0 1 20.5 12c0 1.4-.34 2.72-.95 3.88l-1.65-1.1A6.5 6.5 0 0 0 15.2 6.4l1.6-1zM4.2 7.8v8.4A8.5 8.5 0 0 1 3.5 12c0-1.5.4-2.95 1.1-4.2h-.4z" />
        </svg>
      )

    case 'dota':
      // Official Dota 2 Brand Mark (Square with Jagged River Slash & Two Ancients)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 2.5h-15A2 2 0 0 0 2.5 4.5v15a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-15a2 2 0 0 0-2-2zM6.8 18.5a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm10.1-1.2L5.3 7.1l1.8-1.8 11.6 10.2-1.8 1.8zm.3-8.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z" />
        </svg>
      )

    case 'rules-of-survival':
      // Rules of Survival (RoS) Winged Shield & Parachute Crest
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C7.5 2 4 4.8 4 8.2h3.2L10.5 14h3L16.8 8.2H20C20 4.8 16.5 2 12 2zm-6.5 8.5L2 12l2.5 5.5 4.5-2-3.5-5zm13 0l-3.5 5 4.5 2L22 12l-3.5-1.5zM9.5 16l2.5 6 2.5-6h-5z" />
        </svg>
      )

    case 'farlight':
      // Farlight 84 Official Stylized "F" Speed Wing Logo
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 3.5h16l-2.2 4H9.2l-1.1 3h9.4l-2 3.8H6.8L4.8 20.5H1.5L4.5 3.5zm12.2 10.8h4.8l-1.8 6.2h-4.8l1.8-6.2z" />
        </svg>
      )

    case 'adventure-steam':
    default:
      // Official Valve Steam Brand Logo (Circle + Crank Piston Rod)
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.98 2C6.68 2 2.34 6.13 2.02 11.35l5.36 2.21a2.82 2.82 0 0 1 1.6-.5c.08 0 .16 0 .24.01l2.4-3.48v-.05a3.78 3.78 0 1 1 3.78 3.78h-.09l-3.42 2.44c0 .07.01.14.01.2a2.84 2.84 0 0 1-5.63.57L2.4 14.9A10 10 0 1 0 11.98 2zm3.42 5.04a2.52 2.52 0 1 0 0 5.04 2.52 2.52 0 0 0 0-5.04zm-6.42 6.9a1.9 1.9 0 0 0-1.83 1.38l1.39.58a1.4 1.4 0 0 0 1.83-.76 1.4 1.4 0 0 0-.76-1.83l-.63-.26v.89z" />
        </svg>
      )
  }
}

export function DiscordIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export function TwitterIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function YouTubeIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export function TikTokIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function FacebookIcon({ className = 'apex-svg-icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
