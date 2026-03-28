import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    HomeIcon, UsersIcon, ContentIcon, ShieldIcon,
    ChartIcon, SettingsIcon, HelpIcon, PowerIcon
} from './Icons'

// ─── Tiny helpers ────────────────────────────────────────────────────────────

function NavTab({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 20px',
                height: '100%',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                borderBottom: active ? '2px solid #ff4655' : '2px solid transparent',
                transition: 'color 0.15s, border-color 0.15s',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
            }}
        >
            {label}
        </button>
    )
}

function SidebarBtn({ icon, title, active, onClick }) {
    return (
        <button
            title={title}
            onClick={onClick}
            style={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? 'rgba(255,70,85,0.15)' : 'transparent',
                border: active ? '1px solid rgba(255,70,85,0.4)' : '1px solid transparent',
                borderRadius: 4,
                cursor: 'pointer',
                color: active ? '#ff4655' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >
            {icon}
        </button>
    )
}

// ─── Donut chart (SVG) ────────────────────────────────────────────────────────

function DonutChart({ pct, label, size = 110, stroke = 9, color = '#00c48c' }) {
    const r = (size - stroke) / 2
    const circ = 2 * Math.PI * r
    const dash = (pct / 100) * circ
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
                <circle
                    cx={size / 2} cy={size / 2} r={r} fill="none"
                    stroke={color} strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.6s ease' }}
                />
            </svg>
            <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 10, color: color, fontWeight: 700, letterSpacing: '0.05em', marginTop: 3 }}>{label}</div>
            </div>
        </div>
    )
}

// ─── Stat mini-pill ───────────────────────────────────────────────────────────

function StatPill({ label, value }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4,
            padding: '10px 14px',
        }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{value}</div>
        </div>
    )
}

// ─── Match row ────────────────────────────────────────────────────────────────

function MatchRow({ map, result, score, kda, outcome }) {
    const win = outcome === 'win'
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
            {/* Map icon placeholder */}
            <div style={{
                width: 36, height: 36, borderRadius: 3,
                background: win ? 'rgba(0,196,140,0.15)' : 'rgba(255,70,85,0.15)',
                border: `1px solid ${win ? 'rgba(0,196,140,0.3)' : 'rgba(255,70,85,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={win ? '#00c48c' : '#ff4655'}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>{map}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>K / D / A</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{
                    fontSize: 13, fontWeight: 800,
                    color: win ? '#00c48c' : '#ff4655',
                    letterSpacing: '0.04em',
                }}>{score}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{kda}</div>
            </div>
        </div>
    )
}

// ─── Agent card (secondary) ───────────────────────────────────────────────────

function AgentCard({ name, sub, value, accent = '#00c48c' }) {
    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            flex: 1,
        }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sub}</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase' }}>{name}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: accent }}>{value}</div>
        </div>
    )
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

const TABS = ['Overview', 'Users', 'Content', 'Moderation', 'Analytics']

function AdminDashboard() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('Overview')
    const [activeSide, setActiveSide] = useState('Dashboard')

    // ─── Centralized route maps ────────────────────────────────────────────────
    const SIDE_ROUTES = {
        Dashboard: '/admin/dashboard',
        Users: '/admin/users',
        Content: '/admin/content',
        Moderation: '/admin/moderation',
        Analytics: '/admin/analytics',
        Settings: '/admin/settings',
    }
    const TAB_ROUTES = {
        Overview: '/admin/dashboard',
        Users: '/admin/users',
        Content: '/admin/content',
        Moderation: '/admin/moderation',
        Analytics: '/admin/analytics',
    }

    // ─── Navigation handlers ───────────────────────────────────────────────────
    function handleSideChange(next) {
        setActiveSide(next)
        const path = SIDE_ROUTES[next] || '/admin'
        navigate(path)
    }

    function handleTabChange(next) {
        setActiveTab(next)
        const path = TAB_ROUTES[next]
        if (path) navigate(path)
    }

    function handleSupport() {
        navigate('/support')
    }

    function handleLogout() {
        navigate('/admin/login')
    }

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 250)
        return () => clearTimeout(t)
    }, [])

    // Keep state local; route changes handled by handlers above

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh', background: '#0f1116',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)', fontFamily: 'system-ui, sans-serif',
            }}>
                Loading dashboard…
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0d0f14',
            fontFamily: "'Rajdhani', 'Barlow Condensed', 'Arial Narrow', system-ui, sans-serif",
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: '64px 1fr',
        }}>

            {/* ── Sidebar ── */}
            <aside style={{
                borderRight: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 0',
                gap: 6,
                position: 'sticky',
                top: 0,
                height: '100vh',
            }}>
                {/* Logo mark */}
                <div style={{
                    width: 36, height: 36,
                    background: '#ff4655',
                    borderRadius: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12,
                    flexShrink: 0,
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <SidebarBtn icon={<HomeIcon width={18} height={18} />} title="Dashboard" active={activeSide === 'Dashboard'} onClick={() => handleSideChange('Dashboard')} />
                <SidebarBtn icon={<UsersIcon width={18} height={18} />} title="Users" active={activeSide === 'Users'} onClick={() => handleSideChange('Users')} />
                <SidebarBtn icon={<ContentIcon width={18} height={18} />} title="Content" active={activeSide === 'Content'} onClick={() => handleSideChange('Content')} />
                <SidebarBtn icon={<ShieldIcon width={18} height={18} />} title="Moderation" active={activeSide === 'Moderation'} onClick={() => handleSideChange('Moderation')} />
                <SidebarBtn icon={<ChartIcon width={18} height={18} />} title="Analytics" active={activeSide === 'Analytics'} onClick={() => handleSideChange('Analytics')} />
                <SidebarBtn icon={<SettingsIcon width={18} height={18} />} title="Settings" active={activeSide === 'Settings'} onClick={() => handleSideChange('Settings')} />

                <div style={{ flex: 1 }} />

                <SidebarBtn icon={<HelpIcon width={18} height={18} />} title="Support" active={false} onClick={handleSupport} />
                <SidebarBtn icon={<PowerIcon width={18} height={18} />} title="Logout" active={false} onClick={handleLogout} />
            </aside>

            {/* ── Main ── */}
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>

                {/* Top nav bar */}
                <header style={{
                    height: 52,
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(0,0,0,0.25)',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    paddingRight: 24,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}>
                    <nav style={{ display: 'flex', alignItems: 'stretch' }}>
                        {TABS.map(t => (
                            <NavTab key={t} label={t} active={activeTab === t} onClick={() => handleTabChange(t)} />
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Notification bell */}
                        <button style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'rgba(255,255,255,0.45)', padding: 4,
                            position: 'relative',
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                            </svg>
                            <span style={{
                                position: 'absolute', top: 2, right: 2,
                                width: 7, height: 7, borderRadius: '50%',
                                background: '#ff4655',
                                border: '1.5px solid #0d0f14',
                            }} />
                        </button>
                        {/* Avatar + name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)">
                                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 9v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1z" />
                            </svg>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                                admin <span style={{ color: 'rgba(255,255,255,0.35)' }}>#0001</span>
                            </span>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ff4655, #8b0000)',
                                border: '2px solid rgba(255,70,85,0.4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 800,
                            }}>A</div>
                        </div>
                    </div>
                </header>

                {/* Content area (switch by activeTab) */}
                <div style={{ padding: '20px 24px', flex: 1 }}>
                    {activeTab === 'Overview' && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 220px 280px',
                            gridTemplateRows: 'auto auto',
                            gap: 14,
                        }}>
                            {/* ── TOP LEFT: Featured User / Highlight ── */}
                            <div style={{
                                gridColumn: '1',
                                gridRow: '1',
                                background: 'linear-gradient(135deg, #0f1923 0%, #0a1520 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 24,
                                position: 'relative',
                                overflow: 'hidden',
                                minHeight: 220,
                            }}>
                                <div style={{
                                    position: 'absolute', right: 80, top: -40,
                                    width: 240, height: 320,
                                    background: 'radial-gradient(ellipse, rgba(255,70,85,0.12) 0%, transparent 70%)',
                                    pointerEvents: 'none',
                                }} />
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: 8 }}>
                                    Top Active User
                                </div>
                                <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.02em', color: '#ff4655', textTransform: 'uppercase', lineHeight: 1, marginBottom: 4 }}>
                                    STRIKER
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
                                    MEMBER SINCE 847 DAYS AGO
                                </div>
                                <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
                                    {[
                                        { label: 'Win Ratio', val: '62.11%' },
                                        { label: 'K/D Ratio', val: '1.14' },
                                        { label: 'Dmg/Round', val: '138.2' },
                                    ].map(({ label, val }) => (
                                        <div key={label}>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
                                            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{val}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                                    Content Breakdown
                                </div>
                                <div style={{ display: 'flex', gap: 24 }}>
                                    {[
                                        { icon: '📝', val: '0.33', label: 'Posts/Day' },
                                        { icon: '💬', val: '0.78', label: 'Comments' },
                                        { icon: '❤️', val: '4.82', label: 'Avg Likes' },
                                    ].map(({ icon, val, label }) => (
                                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: 14 }}>{icon}</span>
                                            <div>
                                                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{val}</div>
                                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── TOP MIDDLE: two secondary cards ── */}
                            <div style={{
                                gridColumn: '2',
                                gridRow: '1',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                            }}>
                                <AgentCard name="TITAN" sub="Top Contributor" value="Win Ratio 60.23%" accent="#00c48c" />
                                <AgentCard name="NOVA" sub="Rising Star" value="Win Ratio 54.32%" accent="#c0a0ff" />
                            </div>

                            {/* ── TOP RIGHT: Recent Activity ── */}
                            <div style={{
                                gridColumn: '3',
                                gridRow: '1 / 3',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                                overflow: 'hidden',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>Last Actions</div>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>View All</button>
                                </div>
                                {[
                                    { map: 'STRIKER', result: 'Joined', score: '13:11', kda: '24 / 16 / 12', outcome: 'win' },
                                    { map: 'BREZZE', result: 'Flagged', score: '13:7', kda: '21 / 11 / 7', outcome: 'win' },
                                    { map: 'SHADOW', result: 'Post', score: '13:6', kda: '35 / 22 / 9', outcome: 'win' },
                                    { map: 'NOVA', result: 'Ticket', score: '11:13', kda: '29 / 11 / 12', outcome: 'loss' },
                                ].map((r, i) => <MatchRow key={i} {...r} />)}
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4655', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '10px 0 6px' }}>27 JUNE</div>
                                {[
                                    { map: 'TITAN', result: 'Report', score: '8:13', kda: '27 / 19 / 3', outcome: 'loss' },
                                    { map: 'VORTEX', result: 'Upload', score: '15:13', kda: '24 / 20 / 14', outcome: 'win' },
                                    { map: 'BREZZE', result: 'Joined', score: '10:13', kda: '21 / 14 / 12', outcome: 'loss' },
                                ].map((r, i) => <MatchRow key={i} {...r} />)}
                            </div>

                            {/* ── BOTTOM LEFT: Platform Overview ── */}
                            <div style={{
                                gridColumn: '1',
                                gridRow: '2',
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 20,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Platform Overview</div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 4,
                                        padding: '4px 10px',
                                        fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
                                        cursor: 'pointer',
                                    }}>
                                        JUNE 2025
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 10l5 5 5-5z" />
                                        </svg>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
                                    <DonutChart pct={62.5} label="Retention" />
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <div style={{
                                            background: 'rgba(0,196,140,0.12)',
                                            border: '1px solid rgba(0,196,140,0.25)',
                                            borderLeft: '3px solid #00c48c',
                                            borderRadius: 4,
                                            padding: '10px 16px',
                                        }}>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Active Users</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: '#00c48c' }}>1,248</div>
                                        </div>
                                        <div style={{
                                            background: 'rgba(255,70,85,0.12)',
                                            border: '1px solid rgba(255,70,85,0.25)',
                                            borderLeft: '3px solid #ff4655',
                                            borderRadius: 4,
                                            padding: '10px 16px',
                                        }}>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Churned</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: '#ff4655' }}>284</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                                    <StatPill label="Total Posts" value="12,462" />
                                    <StatPill label="Reports" value="7,124" />
                                    <StatPill label="Bans" value="231" />
                                    <StatPill label="Posts/Day" value="0.8" />
                                    <StatPill label="Mod Actions" value="24" />
                                    <StatPill label="Peak Users" value="3,840" />
                                </div>
                            </div>

                            {/* ── BOTTOM MIDDLE: two stacked cards ── */}
                            <div style={{
                                gridColumn: '2',
                                gridRow: '2',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                            }}>
                                <div style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: 6,
                                    padding: 16,
                                    textAlign: 'center',
                                    flex: 1,
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>System Status</div>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(0,196,140,0.2), rgba(0,196,140,0.05))',
                                        border: '2px solid rgba(0,196,140,0.4)',
                                        margin: '0 auto 10px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#00c48c">
                                            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" />
                                        </svg>
                                    </div>
                                    <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', color: '#00c48c', letterSpacing: '0.05em' }}>OPERATIONAL</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>99.98% uptime · 83ms p95</div>
                                </div>
                                <div style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: 6,
                                    padding: 16,
                                    flex: 1,
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Top Content</div>
                                    <div style={{
                                        height: 50,
                                        background: 'rgba(255,255,255,0.04)',
                                        borderRadius: 4,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: 8,
                                        color: 'rgba(255,255,255,0.2)',
                                        fontSize: 11,
                                    }}>
                                        📸 screenshot_finals.jpg
                                    </div>
                                    <div style={{ fontSize: 15, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fff' }}>
                                        MATCH RECAP
                                    </div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                                        Editorial · 20k impressions
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Users' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Users</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <input placeholder="Search users…" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: '6px 10px', fontSize: 12 }} />
                                        <button style={{ background: '#ff4655', border: 'none', color: '#fff', borderRadius: 4, padding: '6px 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em', cursor: 'pointer' }}>Add</button>
                                    </div>
                                </div>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    {[
                                        { name: 'striker', role: 'admin', joined: '2023-02-14' },
                                        { name: 'titan', role: 'moderator', joined: '2024-01-22' },
                                        { name: 'nova', role: 'member', joined: '2025-07-03' },
                                        { name: 'shadow', role: 'member', joined: '2025-11-18' },
                                    ].map(u => (
                                        <div key={u.name} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 140px 80px', gap: 8, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ fontWeight: 700 }}>{u.name.toUpperCase()}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{u.role}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{u.joined}</div>
                                            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 4, padding: '6px 8px', fontSize: 11, cursor: 'pointer' }}>View</button>
                                                <button style={{ background: 'rgba(255,70,85,0.15)', border: '1px solid rgba(255,70,85,0.35)', color: '#ff4655', borderRadius: 4, padding: '6px 8px', fontSize: 11, cursor: 'pointer' }}>Ban</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>User Stats</div>
                                <DonutChart pct={74} label="Verified" color="#00c48c" />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                                    <StatPill label="Total" value="8,421" />
                                    <StatPill label="Active" value="1,248" />
                                    <StatPill label="Banned" value="231" />
                                    <StatPill label="Pending" value="92" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Content' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Content Library</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <input placeholder="Search posts…" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: '6px 10px', fontSize: 12 }} />
                                        <button style={{ background: '#ff4655', border: 'none', color: '#fff', borderRadius: 4, padding: '6px 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em', cursor: 'pointer' }}>New</button>
                                    </div>
                                </div>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    {[
                                        { title: 'Match Recap', type: 'Editorial', status: 'Published' },
                                        { title: 'Screenshot Finals', type: 'Gallery', status: 'Review' },
                                        { title: 'Champions Update', type: 'News', status: 'Draft' },
                                    ].map(c => (
                                        <div key={c.title} style={{ display: 'grid', gridTemplateColumns: '1fr 140px 120px 90px', gap: 8, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ fontWeight: 800 }}>{c.title.toUpperCase()}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{c.type}</div>
                                            <div style={{ fontSize: 12, color: c.status === 'Published' ? '#00c48c' : 'rgba(255,255,255,0.6)', fontWeight: 700 }}>{c.status}</div>
                                            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 4, padding: '6px 8px', fontSize: 11, cursor: 'pointer' }}>Edit</button>
                                                <button style={{ background: 'rgba(255,70,85,0.15)', border: '1px solid rgba(255,70,85,0.35)', color: '#ff4655', borderRadius: 4, padding: '6px 8px', fontSize: 11, cursor: 'pointer' }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Content Stats</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <StatPill label="Total" value="12,462" />
                                    <StatPill label="Published" value="8,221" />
                                    <StatPill label="Drafts" value="932" />
                                    <StatPill label="In Review" value="119" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Moderation' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Moderation Queue</div>
                                    <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: 4, padding: '6px 10px', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em', cursor: 'pointer' }}>Bulk Actions</button>
                                </div>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    {[
                                        { id: '#7124', type: 'Report', target: 'Comment by NOVA', status: 'Open' },
                                        { id: '#7125', type: 'Flag', target: 'Post MATCH RECAP', status: 'Investigating' },
                                        { id: '#7126', type: 'Appeal', target: 'User SHADOW', status: 'Pending' },
                                    ].map(item => (
                                        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '90px 120px 1fr 120px 120px', gap: 8, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ fontWeight: 800, color: 'rgba(255,255,255,0.85)' }}>{item.id}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{item.type}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{item.target}</div>
                                            <div style={{ fontSize: 12, color: item.status === 'Open' ? '#ffb74d' : item.status === 'Pending' ? '#c0a0ff' : '#00c48c', fontWeight: 700 }}>{item.status}</div>
                                            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                                                <button style={{ background: 'rgba(0,196,140,0.12)', border: '1px solid rgba(0,196,140,0.25)', color: '#00c48c', borderRadius: 4, padding: '6px 8px', fontSize: 11, cursor: 'pointer' }}>Resolve</button>
                                                <button style={{ background: 'rgba(255,70,85,0.15)', border: '1px solid rgba(255,70,85,0.35)', color: '#ff4655', borderRadius: 4, padding: '6px 8px', fontSize: 11, cursor: 'pointer' }}>Escalate</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 6,
                                padding: 16,
                            }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>Moderation Stats</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <StatPill label="Open" value="142" />
                                    <StatPill label="Resolved" value="1,827" />
                                    <StatPill label="Appeals" value="73" />
                                    <StatPill label="Avg SLA" value="2.1h" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Analytics' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 16 }}>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Retention</div>
                                <DonutChart pct={62.5} label="Month" />
                                <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <StatPill label="DAU" value="1,248" />
                                    <StatPill label="MAU" value="9,410" />
                                </div>
                            </div>
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 16 }}>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Engagement</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <StatPill label="Likes" value="120k" />
                                    <StatPill label="Comments" value="34k" />
                                    <StatPill label="Shares" value="9.2k" />
                                    <StatPill label="Avg Session" value="6m 21s" />
                                </div>
                            </div>
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 16 }}>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>System</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <StatPill label="p95 latency" value="83ms" />
                                    <StatPill label="Uptime" value="99.98%" />
                                    <StatPill label="Errors/1k" value="0.7" />
                                    <StatPill label="Jobs queued" value="12" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSide === 'Settings' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 16 }}>
                                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>General</div>
                                <div style={{ display: 'grid', gap: 10 }}>
                                    <label style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Site Name</span>
                                        <input defaultValue="Exiles" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: '8px 10px', fontSize: 12 }} />
                                    </label>
                                    <label style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Support Email</span>
                                        <input defaultValue="support@example.com" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 4, padding: '8px 10px', fontSize: 12 }} />
                                    </label>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                                        <button style={{ background: '#ff4655', border: 'none', color: '#fff', borderRadius: 4, padding: '8px 12px', fontWeight: 800, fontSize: 12, letterSpacing: '0.04em', cursor: 'pointer' }}>Save</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 16 }}>
                                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Security</div>
                                <div style={{ display: 'grid', gap: 10 }}>
                                    <label style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Two-Factor Authentication</span>
                                        <input type="checkbox" defaultChecked />
                                    </label>
                                    <label style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Require Strong Passwords</span>
                                        <input type="checkbox" defaultChecked />
                                    </label>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                                        <button style={{ background: '#ff4655', border: 'none', color: '#fff', borderRadius: 4, padding: '8px 12px', fontWeight: 800, fontSize: 12, letterSpacing: '0.04em', cursor: 'pointer' }}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard