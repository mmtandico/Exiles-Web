import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    HomeIcon, UsersIcon, ContentIcon, ShieldIcon,
    ChartIcon, SettingsIcon, HelpIcon, PowerIcon
} from './Icons'

// ─── Exiles brand colours ─────────────────────────────────────────────────────
const RED = '#e8391e'
const ORANGE = '#f57c2b'
const GREEN = '#3ecf6e'
const MUTED = 'rgba(255,255,255,0.4)'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function NavTab({ label, active, onClick }) {
    return (
        <button onClick={onClick} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0 20px', height: '100%', fontFamily: 'inherit',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            color: active ? '#fff' : MUTED,
            borderBottom: active ? `2px solid ${RED}` : '2px solid transparent',
            transition: 'color 0.15s, border-color 0.15s',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
            {label}
        </button>
    )
}

function SidebarBtn({ icon, title, active, onClick }) {
    return (
        <button title={title} onClick={onClick} style={{
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: active ? 'rgba(232,57,30,0.15)' : 'transparent',
            border: active ? '1px solid rgba(232,57,30,0.4)' : '1px solid transparent',
            borderRadius: 4, cursor: 'pointer',
            color: active ? RED : MUTED,
            transition: 'all 0.15s',
        }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = MUTED }}
        >
            {icon}
        </button>
    )
}

function DonutChart({ pct, label, size = 110, stroke = 9, color = GREEN }) {
    const r = (size - stroke) / 2
    const circ = 2 * Math.PI * r
    const dash = (pct / 100) * circ
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.6s ease' }} />
            </svg>
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 10, color, fontWeight: 700, letterSpacing: '0.05em', marginTop: 3 }}>{label}</div>
            </div>
        </div>
    )
}

function StatPill({ label, value }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4, padding: '10px 14px',
        }}>
            <div style={{ fontSize: 11, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{value}</div>
        </div>
    )
}

function CountPill({ label, value, color }) {
    const isGreen = color === GREEN
    return (
        <div style={{
            background: isGreen ? 'rgba(62,207,110,0.1)' : 'rgba(232,57,30,0.1)',
            border: `1px solid ${isGreen ? 'rgba(62,207,110,0.25)' : 'rgba(232,57,30,0.25)'}`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 4, padding: '10px 16px',
        }}>
            <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
        </div>
    )
}

function ActivityRow({ user, action, detail, outcome }) {
    const isGood = outcome === 'good'
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
            <div style={{
                width: 36, height: 36, borderRadius: 3, flexShrink: 0,
                background: isGood ? 'rgba(62,207,110,0.12)' : 'rgba(232,57,30,0.12)',
                border: `1px solid ${isGood ? 'rgba(62,207,110,0.3)' : 'rgba(232,57,30,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, color: isGood ? GREEN : RED, textTransform: 'uppercase',
            }}>
                {user[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user}
                </div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{action}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: isGood ? GREEN : RED }}>{detail}</div>
            </div>
        </div>
    )
}

function TeamCard({ name, role, stat }) {
    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6, padding: '14px 16px',
            display: 'flex', flexDirection: 'column', gap: 6, flex: 1,
        }}>
            <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{role}</div>
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.01em', color: '#fff', textTransform: 'uppercase' }}>{name}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: ORANGE }}>{stat}</div>
        </div>
    )
}

function RoleBadge({ label }) {
    const map = {
        Owner: { bg: 'rgba(232,57,30,0.2)', border: 'rgba(232,57,30,0.4)', text: RED },
        Admin: { bg: 'rgba(245,124,43,0.2)', border: 'rgba(245,124,43,0.4)', text: ORANGE },
        Helper: { bg: 'rgba(62,207,110,0.15)', border: 'rgba(62,207,110,0.3)', text: GREEN },
        Member: { bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.15)', text: 'rgba(255,255,255,0.6)' },
    }
    const c = map[label] || map.Member
    return (
        <span style={{
            display: 'inline-block',
            background: c.bg, border: `1px solid ${c.border}`,
            borderRadius: 3, padding: '2px 7px',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: c.text,
        }}>
            {label}
        </span>
    )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS = ['Overview', 'Members', 'Teams', 'Moderation', 'Analytics']

const TODAY_ACTIVITY = [
    { user: 'EstElle', action: 'Joined — welcome post submitted', detail: 'New Member', outcome: 'good' },
    { user: 'Broly', action: 'Post flagged by 3 community members', detail: 'Under Review', outcome: 'bad' },
    { user: 'NetherIngot', action: 'Uploaded team screenshot', detail: 'Content', outcome: 'good' },
    { user: 'Ulra3tL', action: 'Support ticket #041 opened', detail: 'Ticket', outcome: 'bad' },
]

const JUNE_ACTIVITY = [
    { user: 'ClanEsoo', action: 'Role promoted → Jr. Helper', detail: 'Promoted', outcome: 'good' },
    { user: 'Menjusee', action: 'Tournament bracket submitted', detail: 'Event', outcome: 'good' },
    { user: 'G1aneee', action: 'Account report received', detail: 'Report', outcome: 'bad' },
]

// ─── Dashboard ────────────────────────────────────────────────────────────────

function AdminDashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('Overview')
    const [activeSide, setActiveSide] = useState('Dashboard')

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 250)
        return () => clearTimeout(t)
    }, [])

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh', background: '#0d0f14',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: MUTED, fontFamily: 'system-ui, sans-serif',
            }}>
                Loading Exiles dashboard…
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0d0f14',
            fontFamily: "'Rajdhani','Barlow Condensed','Arial Narrow',system-ui,sans-serif",
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: '64px 1fr',
        }}>

            {/* ── Sidebar ── */}
            <aside style={{
                borderRight: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(0,0,0,0.35)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '16px 0', gap: 6,
                position: 'sticky', top: 0, height: '100vh',
            }}>
                {/* Exiles shield logo */}
                <div style={{
                    width: 38, height: 38, borderRadius: 6, marginBottom: 12, flexShrink: 0,
                    background: `linear-gradient(135deg, ${RED}, #8b1a0a)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(232,57,30,0.4)',
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" fill="white" opacity="0.9" />
                        <path d="M9 12l2 2 4-4" stroke="#0d0f14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <SidebarBtn icon={<HomeIcon width={18} height={18} />} title="Dashboard" active={activeSide === 'Dashboard'} onClick={() => setActiveSide('Dashboard')} />
                <SidebarBtn icon={<UsersIcon width={18} height={18} />} title="Members" active={activeSide === 'Members'} onClick={() => setActiveSide('Members')} />
                <SidebarBtn icon={<ContentIcon width={18} height={18} />} title="Content" active={activeSide === 'Content'} onClick={() => setActiveSide('Content')} />
                <SidebarBtn icon={<ShieldIcon width={18} height={18} />} title="Moderation" active={activeSide === 'Moderation'} onClick={() => setActiveSide('Moderation')} />
                <SidebarBtn icon={<ChartIcon width={18} height={18} />} title="Analytics" active={activeSide === 'Analytics'} onClick={() => setActiveSide('Analytics')} />
                <SidebarBtn icon={<SettingsIcon width={18} height={18} />} title="Settings" active={activeSide === 'Settings'} onClick={() => setActiveSide('Settings')} />

                <div style={{ flex: 1 }} />

                <SidebarBtn icon={<HelpIcon width={18} height={18} />} title="Support" active={false} onClick={() => { }} />
                <SidebarBtn icon={<PowerIcon width={18} height={18} />} title="Logout" active={false} onClick={() => navigate('/admin/login')} />
            </aside>

            {/* ── Main ── */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* Top nav */}
                <header style={{
                    height: 52,
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
                    paddingRight: 24,
                    position: 'sticky', top: 0, zIndex: 10,
                }}>
                    <nav style={{ display: 'flex', alignItems: 'stretch' }}>
                        {TABS.map(t => (
                            <NavTab key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
                        ))}
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, padding: 4, position: 'relative' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                            </svg>
                            <span style={{
                                position: 'absolute', top: 2, right: 2,
                                width: 7, height: 7, borderRadius: '50%',
                                background: RED, border: '1.5px solid #0d0f14',
                            }} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
                                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 9v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1z" />
                            </svg>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.65)' }}>
                                admin <span style={{ color: 'rgba(255,255,255,0.3)' }}>#0001</span>
                            </span>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${RED}, #8b1a0a)`,
                                border: `2px solid rgba(232,57,30,0.4)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 800,
                            }}>E</div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div style={{ padding: '20px 24px', flex: 1 }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 220px 280px',
                        gap: 14,
                    }}>

                        {/* ── HERO: Top Member (Estelle) ── */}
                        <div style={{
                            gridColumn: '1', gridRow: '1',
                            background: 'linear-gradient(135deg, #110b0a 0%, #0d0f14 100%)',
                            border: '1px solid rgba(232,57,30,0.2)',
                            borderRadius: 6, padding: 24,
                            position: 'relative', overflow: 'hidden', minHeight: 220,
                        }}>
                            {/* Glow blob */}
                            <div style={{
                                position: 'absolute', right: 60, top: -30,
                                width: 260, height: 300,
                                background: 'radial-gradient(ellipse, rgba(232,57,30,0.1) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }} />

                            {/* Badges */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <span style={{
                                    background: RED, borderRadius: 3,
                                    padding: '3px 10px', fontSize: 10, fontWeight: 800,
                                    letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                                }}>
                                    Minecraft Community Team
                                </span>
                                <RoleBadge label="Owner" />
                            </div>

                            <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.02em', color: RED, textTransform: 'uppercase', lineHeight: 1, marginBottom: 4 }}>
                                ESTELLE
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: MUTED, marginBottom: 20 }}>
                                CO-FOUNDER · ACTIVE 847 DAYS
                            </div>

                            <div style={{ display: 'flex', gap: 32, marginBottom: 14 }}>
                                {[
                                    { label: 'Events Joined', val: '34' },
                                    { label: 'Team Wins', val: '21' },
                                    { label: 'Posts', val: '138' },
                                ].map(({ label, val }) => (
                                    <div key={label}>
                                        <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
                                        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{val}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                                Contributions
                            </div>
                            <div style={{ display: 'flex', gap: 24 }}>
                                {[
                                    { icon: '⚔️', val: '0.92', label: 'K/D Avg' },
                                    { icon: '🏆', val: '18', label: 'Trophies' },
                                    { icon: '🌐', val: '4.9', label: 'Rating' },
                                ].map(({ icon, val, label }) => (
                                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ fontSize: 14 }}>{icon}</span>
                                        <div>
                                            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{val}</div>
                                            <div style={{ fontSize: 10, color: MUTED }}>{label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── MIDDLE COLUMN: two featured members ── */}
                        <div style={{ gridColumn: '2', gridRow: '1', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <TeamCard name="BROLY" role="Jr. Helper" stat="Win Rate 60.23%" />
                            <TeamCard name="REYNA" role="Jr. Member" stat="Events 54.32%" />
                        </div>

                        {/* ── RIGHT COLUMN: Recent Activity (spans both rows) ── */}
                        <div style={{
                            gridColumn: '3', gridRow: '1 / 3',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 6, padding: 16, overflow: 'hidden',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>
                                    Recent Activity
                                </div>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: MUTED, letterSpacing: '0.04em' }}>
                                    View All
                                </button>
                            </div>

                            <div style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Today</div>
                            {TODAY_ACTIVITY.map((r, i) => <ActivityRow key={i} {...r} />)}

                            <div style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '10px 0 6px' }}>27 June</div>
                            {JUNE_ACTIVITY.map((r, i) => <ActivityRow key={i} {...r} />)}

                            {/* Mod queue mini */}
                            <div style={{
                                marginTop: 16, padding: 12,
                                background: 'rgba(232,57,30,0.06)',
                                border: '1px solid rgba(232,57,30,0.18)',
                                borderRadius: 5,
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: RED, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                                    🛡 Mod Queue
                                </div>
                                {[
                                    'Post flagged — 3 reports pending',
                                    'Screenshot awaiting approval',
                                    'Handle change request · Broly',
                                ].map((item, i, arr) => (
                                    <div key={i} style={{
                                        fontSize: 12, color: 'rgba(255,255,255,0.6)',
                                        padding: '5px 0',
                                        borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                    }}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── BOTTOM LEFT: Community Overview ── */}
                        <div style={{
                            gridColumn: '1', gridRow: '2',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 6, padding: 20,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
                                    Community Overview
                                </div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 4, padding: '4px 10px',
                                    fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                                }}>
                                    ACT2:E3
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
                                <DonutChart pct={62.5} label="Retention" />
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <CountPill label="Active Members" value="1,248" color={GREEN} />
                                    <CountPill label="Inactive" value="284" color={RED} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                                <StatPill label="Total Posts" value="12,462" />
                                <StatPill label="Reports Filed" value="7,124" />
                                <StatPill label="Bans Issued" value="231" />
                                <StatPill label="Events Held" value="48" />
                                <StatPill label="Tournament Wins" value="24" />
                                <StatPill label="Peak Online" value="3,840" />
                            </div>
                        </div>

                        {/* ── BOTTOM MIDDLE: Rating + System Health ── */}
                        <div style={{ gridColumn: '2', gridRow: '2', display: 'flex', flexDirection: 'column', gap: 12 }}>

                            {/* Average User Rating — matches screenshot */}
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6, padding: 16, textAlign: 'center', flex: 1,
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>
                                    Average User Rating
                                </div>
                                <div style={{
                                    width: 64, height: 64, borderRadius: 8,
                                    background: `linear-gradient(135deg, ${RED}, #8b1a0a)`,
                                    margin: '0 auto 10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 30, fontWeight: 900, color: '#fff',
                                    boxShadow: '0 4px 20px rgba(232,57,30,0.35)',
                                }}>
                                    9
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', color: RED, letterSpacing: '0.05em' }}>
                                    EXCELLENT
                                </div>
                                <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>
                                    Based on 1,248 reviews
                                </div>
                            </div>

                            {/* System Health */}
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6, padding: 16, flex: 1,
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>
                                    System Health
                                </div>
                                {[
                                    { label: 'API Latency', value: '83ms (p95)', ok: true },
                                    { label: 'DB Status', value: 'Healthy', ok: true },
                                    { label: 'Uptime 30d', value: '99.98%', ok: true },
                                ].map(({ label, value, ok }) => (
                                    <div key={label} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    }}>
                                        <span style={{ fontSize: 12, color: MUTED }}>{label}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: ok ? GREEN : RED }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard