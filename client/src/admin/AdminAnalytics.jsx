import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon, UsersIcon, ContentIcon, ShieldIcon, ChartIcon, SettingsIcon, HelpIcon, PowerIcon } from './Icons'

function DonutChart({ pct, label, size = 110, stroke = 9, color = '#00c48c' }) {
    const r = (size - stroke) / 2
    const circ = 2 * Math.PI * r
    const dash = (pct / 100) * circ
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 10, color: color, fontWeight: 700, letterSpacing: '0.05em', marginTop: 3 }}>{label}</div>
            </div>
        </div>
    )
}

function StatPill({ label, value }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{value}</div>
        </div>
    )
}

function SidebarBtn({ icon, title, active, onClick }) {
    return (
        <button title={title} onClick={onClick} style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? 'rgba(255,70,85,0.15)' : 'transparent', border: active ? '1px solid rgba(255,70,85,0.4)' : '1px solid transparent', borderRadius: 4, cursor: 'pointer', color: active ? '#ff4655' : 'rgba(255,255,255,0.4)', transition: 'all 0.15s' }}>
            {icon}
        </button>
    )
}

function NavTab({ label, active, onClick }) {
    return (
        <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 20px', height: '100%', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: active ? '#fff' : 'rgba(255,255,255,0.45)', borderBottom: active ? '2px solid #ff4655' : '2px solid transparent', transition: 'color 0.15s, border-color 0.15s', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {label}
        </button>
    )
}

const TABS = ['Overview', 'Users', 'Content', 'Moderation', 'Analytics']

export default function AdminAnalytics() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Analytics')
    const [activeSide, setActiveSide] = useState('Analytics')

    function goto(path) { navigate(path) }

    return (
        <div style={{ minHeight: '100vh', background: '#0d0f14', fontFamily: "'Rajdhani', 'Barlow Condensed', 'Arial Narrow', system-ui, sans-serif", color: '#fff', display: 'grid', gridTemplateColumns: '64px 1fr' }}>
            <aside style={{ borderRight: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: 6, position: 'sticky', top: 0, height: '100vh' }}>
                <div style={{ width: 36, height: 36, background: '#ff4655', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <SidebarBtn icon={<HomeIcon width={18} height={18} />} title="Dashboard" active={activeSide === 'Dashboard'} onClick={() => goto('/admin/dashboard')} />
                <SidebarBtn icon={<UsersIcon width={18} height={18} />} title="Users" active={activeSide === 'Users'} onClick={() => goto('/admin/users')} />
                <SidebarBtn icon={<ContentIcon width={18} height={18} />} title="Content" active={activeSide === 'Content'} onClick={() => goto('/admin/content')} />
                <SidebarBtn icon={<ShieldIcon width={18} height={18} />} title="Moderation" active={activeSide === 'Moderation'} onClick={() => goto('/admin/moderation')} />
                <SidebarBtn icon={<ChartIcon width={18} height={18} />} title="Analytics" active={activeSide === 'Analytics'} onClick={() => setActiveSide('Analytics')} />
                <SidebarBtn icon={<SettingsIcon width={18} height={18} />} title="Settings" active={activeSide === 'Settings'} onClick={() => goto('/admin/settings')} />
                <div style={{ flex: 1 }} />
                <SidebarBtn icon={<HelpIcon width={18} height={18} />} title="Support" active={false} onClick={() => goto('/support')} />
                <SidebarBtn icon={<PowerIcon width={18} height={18} />} title="Logout" active={false} onClick={() => goto('/admin/login')} />
            </aside>

            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <header style={{ height: 52, borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', paddingRight: 24, position: 'sticky', top: 0, zIndex: 10 }}>
                    <nav style={{ display: 'flex', alignItems: 'stretch' }}>
                        {TABS.map(t => (
                            <NavTab key={t} label={t} active={activeTab === t} onClick={() => {
                                setActiveTab(t)
                                if (t === 'Overview') goto('/admin/dashboard')
                                if (t === 'Users') goto('/admin/users')
                                if (t === 'Content') goto('/admin/content')
                                if (t === 'Moderation') goto('/admin/moderation')
                                if (t === 'Analytics') goto('/admin/analytics')
                            }} />
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', padding: 4, position: 'relative' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
                            <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: '#ff4655', border: '1.5px solid #0d0f14' }} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm6 9v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1z" /></svg>
                            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>admin <span style={{ color: 'rgba(255,255,255,0.35)' }}>#0001</span></span>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #ff4655, #8b0000)', border: '2px solid rgba(255,70,85,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>A</div>
                        </div>
                    </div>
                </header>

                <div style={{ padding: '20px 24px', flex: 1 }}>
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
                </div>
            </div>
        </div>
    )
}

