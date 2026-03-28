import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon, UsersIcon, ContentIcon, ShieldIcon, ChartIcon, SettingsIcon, HelpIcon, PowerIcon } from './Icons'

// ─── Brand ────────────────────────────────────────────────────────────────────
const RED    = '#e8391e'
const GREEN  = '#3ecf6e'
const ORANGE = '#f57c2b'
const BLUE   = '#4a9eff'
const MUTED  = 'rgba(255,255,255,0.4)'

// ─── Static data ──────────────────────────────────────────────────────────────
const ALL_USERS = [
	{ id: 1,  name: 'EstElle',     role: 'Owner',     status: 'active',  joined: '2022-01-04', posts: 138, events: 34, rating: 9.8, verified: true  },
	{ id: 2,  name: 'Broly',       role: 'Jr. Helper', status: 'active', joined: '2023-03-17', posts: 89,  events: 21, rating: 8.4, verified: true  },
	{ id: 3,  name: 'Reyna',       role: 'Jr. Member', status: 'active', joined: '2023-07-22', posts: 54,  events: 14, rating: 7.1, verified: true  },
	{ id: 4,  name: 'NetherIngot', role: 'Member',    status: 'active',  joined: '2024-01-09', posts: 31,  events: 9,  rating: 6.5, verified: true  },
	{ id: 5,  name: 'Ulra3tL',     role: 'Member',    status: 'warned',  joined: '2024-02-28', posts: 22,  events: 5,  rating: 5.0, verified: true  },
	{ id: 6,  name: 'ClanEsoo',    role: 'Jr. Helper', status: 'active', joined: '2024-04-11', posts: 67,  events: 18, rating: 7.9, verified: true  },
	{ id: 7,  name: 'Menjusee',    role: 'Member',    status: 'active',  joined: '2024-06-03', posts: 19,  events: 7,  rating: 6.2, verified: false },
	{ id: 8,  name: 'G1aneee',     role: 'Member',    status: 'banned',  joined: '2024-08-15', posts: 8,   events: 2,  rating: 2.1, verified: false },
	{ id: 9,  name: 'Vortex',      role: 'Member',    status: 'active',  joined: '2024-09-29', posts: 41,  events: 11, rating: 7.3, verified: true  },
	{ id: 10, name: 'ICEBOX',      role: 'Member',    status: 'pending', joined: '2025-01-14', posts: 3,   events: 1,  rating: null, verified: false },
	{ id: 11, name: 'BREZZE',      role: 'Member',    status: 'active',  joined: '2025-03-05', posts: 12,  events: 3,  rating: 6.8, verified: true  },
	{ id: 12, name: 'ASCENT',      role: 'Member',    status: 'active',  joined: '2025-05-20', posts: 7,   events: 2,  rating: 5.5, verified: false },
]

const ROLE_COLORS = {
	Owner:      { bg: 'rgba(232,57,30,0.18)',  border: 'rgba(232,57,30,0.4)',  text: RED    },
	'Jr. Helper':{ bg: 'rgba(245,124,43,0.18)', border: 'rgba(245,124,43,0.4)', text: ORANGE },
	'Jr. Member':{ bg: 'rgba(74,158,255,0.15)', border: 'rgba(74,158,255,0.3)', text: BLUE   },
	Member:     { bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.15)',text: 'rgba(255,255,255,0.6)' },
}

const STATUS_COLORS = {
	active:  { dot: GREEN,  label: 'Active'  },
	warned:  { dot: ORANGE, label: 'Warned'  },
	banned:  { dot: RED,    label: 'Banned'  },
	pending: { dot: BLUE,   label: 'Pending' },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SidebarBtn({ icon, title, active, onClick }) {
	return (
		<button title={title} onClick={onClick} style={{
			width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
			background: active ? 'rgba(232,57,30,0.15)' : 'transparent',
			border: active ? `1px solid rgba(232,57,30,0.4)` : '1px solid transparent',
			borderRadius: 4, cursor: 'pointer', color: active ? RED : MUTED, transition: 'all 0.15s',
		}}
			onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
			onMouseLeave={e => { if (!active) e.currentTarget.style.color = MUTED }}
		>
			{icon}
		</button>
	)
}

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

function RoleBadge({ role }) {
	const c = ROLE_COLORS[role] || ROLE_COLORS.Member
	return (
		<span style={{
			display: 'inline-block',
			background: c.bg, border: `1px solid ${c.border}`,
			borderRadius: 3, padding: '2px 7px',
			fontSize: 10, fontWeight: 800, letterSpacing: '0.07em',
			textTransform: 'uppercase', color: c.text, whiteSpace: 'nowrap',
		}}>
			{role}
		</span>
	)
}

function StatusDot({ status }) {
	const s = STATUS_COLORS[status] || STATUS_COLORS.active
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
			<span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, display: 'inline-block', boxShadow: `0 0 6px ${s.dot}` }} />
			<span style={{ fontSize: 11, fontWeight: 700, color: s.dot, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
		</div>
	)
}

function DonutChart({ pct, label, size = 100, stroke = 9, color = GREEN }) {
	const r = (size - stroke) / 2
	const circ = 2 * Math.PI * r
	const dash = (pct / 100) * circ
	return (
		<div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
			<svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
				<circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
				<circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
					strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
			</svg>
			<div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
				<div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{pct}%</div>
				<div style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: '0.05em', marginTop: 2 }}>{label}</div>
			</div>
		</div>
	)
}

function MiniStat({ label, value, color }) {
	return (
		<div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '9px 12px' }}>
			<div style={{ fontSize: 10, color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
			<div style={{ fontSize: 18, fontWeight: 900, color: color || '#fff' }}>{value}</div>
		</div>
	)
}

// Thin bar chart for role distribution
function RoleBar({ role, count, total, color }) {
	const pct = Math.round((count / total) * 100)
	return (
		<div style={{ marginBottom: 10 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
				<span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{role}</span>
				<span style={{ fontSize: 11, fontWeight: 800, color }}>{count} <span style={{ color: MUTED, fontWeight: 500 }}>({pct}%)</span></span>
			</div>
			<div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
				<div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: color, transition: 'width 0.5s ease' }} />
			</div>
		</div>
	)
}

// Spark timeline (fake activity bars)
function ActivitySpark({ color = GREEN }) {
	const bars = [30, 55, 40, 70, 60, 85, 50, 90, 65, 75, 55, 80, 45, 95, 70]
	return (
		<div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
			{bars.map((h, i) => (
				<div key={i} style={{
					flex: 1, height: `${h}%`, borderRadius: 2,
					background: i === bars.length - 1 ? color : `${color}55`,
				}} />
			))}
		</div>
	)
}

// Recent signup row
function SignupRow({ name, role, joined, verified }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
			<div style={{
				width: 32, height: 32, borderRadius: 4, flexShrink: 0,
				background: 'linear-gradient(135deg, rgba(232,57,30,0.25), rgba(232,57,30,0.08))',
				border: '1px solid rgba(232,57,30,0.25)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				fontSize: 12, fontWeight: 900, color: RED, textTransform: 'uppercase',
			}}>
				{name[0]}
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff' }}>{name}</div>
				<div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{joined}</div>
			</div>
			<RoleBadge role={role} />
			{verified && (
				<svg width="14" height="14" viewBox="0 0 24 24" fill={GREEN} title="Verified">
					<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
				</svg>
			)}
		</div>
	)
}

// ─── Main page ────────────────────────────────────────────────────────────────

const TABS = ['Overview', 'Members', 'Teams', 'Moderation', 'Analytics']
const FILTER_OPTIONS = ['All', 'Active', 'Warned', 'Banned', 'Pending']
const ROLE_OPTIONS   = ['All Roles', 'Owner', 'Jr. Helper', 'Jr. Member', 'Member']

export default function AdminUsers() {
	const navigate = useNavigate()
	const [activeTab, setActiveTab]       = useState('Members')
	const [activeSide, setActiveSide]     = useState('Users')
	const [search, setSearch]             = useState('')
	const [filterStatus, setFilterStatus] = useState('All')
	const [filterRole, setFilterRole]     = useState('All Roles')
	const [selected, setSelected]         = useState(null)   // selected user id
	const [sortKey, setSortKey]           = useState('name')
	const [sortAsc, setSortAsc]           = useState(true)

	function goto(path) { navigate(path) }

	function toggleSort(key) {
		if (sortKey === key) setSortAsc(a => !a)
		else { setSortKey(key); setSortAsc(true) }
	}

	const filtered = ALL_USERS
		.filter(u => {
			const matchSearch = u.name.toLowerCase().includes(search.toLowerCase())
			const matchStatus = filterStatus === 'All' || u.status === filterStatus.toLowerCase()
			const matchRole   = filterRole === 'All Roles' || u.role === filterRole
			return matchSearch && matchStatus && matchRole
		})
		.sort((a, b) => {
			let va = a[sortKey], vb = b[sortKey]
			if (typeof va === 'string') va = va.toLowerCase()
			if (typeof vb === 'string') vb = vb.toLowerCase()
			if (va === null) return 1; if (vb === null) return -1
			if (va < vb) return sortAsc ? -1 : 1
			if (va > vb) return sortAsc ? 1 : -1
			return 0
		})

	const selectedUser = ALL_USERS.find(u => u.id === selected)

	const totalUsers  = ALL_USERS.length
	const activeCount = ALL_USERS.filter(u => u.status === 'active').length
	const bannedCount = ALL_USERS.filter(u => u.status === 'banned').length
	const pendingCount = ALL_USERS.filter(u => u.status === 'pending').length
	const verifiedPct = Math.round((ALL_USERS.filter(u => u.verified).length / totalUsers) * 100)

	const roleCounts = ALL_USERS.reduce((acc, u) => { acc[u.role] = (acc[u.role] || 0) + 1; return acc }, {})

	return (
		<div style={{
			minHeight: '100vh', background: '#0d0f14',
			fontFamily: "'Rajdhani','Barlow Condensed','Arial Narrow',system-ui,sans-serif",
			color: '#fff', display: 'grid', gridTemplateColumns: '64px 1fr',
		}}>

			{/* ── Sidebar ── */}
			<aside style={{
				borderRight: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.35)',
				display: 'flex', flexDirection: 'column', alignItems: 'center',
				padding: '16px 0', gap: 6, position: 'sticky', top: 0, height: '100vh',
			}}>
				{/* Exiles logo */}
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
				<SidebarBtn icon={<HomeIcon width={18} height={18} />}     title="Dashboard"  active={false}                     onClick={() => goto('/admin/dashboard')} />
				<SidebarBtn icon={<UsersIcon width={18} height={18} />}    title="Members"    active={activeSide === 'Users'}     onClick={() => setActiveSide('Users')} />
				<SidebarBtn icon={<ContentIcon width={18} height={18} />}  title="Content"    active={activeSide === 'Content'}   onClick={() => goto('/admin/content')} />
				<SidebarBtn icon={<ShieldIcon width={18} height={18} />}   title="Moderation" active={activeSide === 'Moderation'}onClick={() => goto('/admin/moderation')} />
				<SidebarBtn icon={<ChartIcon width={18} height={18} />}    title="Analytics"  active={activeSide === 'Analytics'} onClick={() => goto('/admin/analytics')} />
				<SidebarBtn icon={<SettingsIcon width={18} height={18} />} title="Settings"   active={activeSide === 'Settings'}  onClick={() => goto('/admin/settings')} />
				<div style={{ flex: 1 }} />
				<SidebarBtn icon={<HelpIcon width={18} height={18} />}  title="Support" active={false} onClick={() => {}} />
				<SidebarBtn icon={<PowerIcon width={18} height={18} />} title="Logout"  active={false} onClick={() => goto('/admin/login')} />
			</aside>

			{/* ── Main ── */}
			<div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>

				{/* Top nav */}
				<header style={{
					height: 52, borderBottom: '1px solid rgba(255,255,255,0.07)',
					background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'stretch',
					justifyContent: 'space-between', paddingRight: 24,
					position: 'sticky', top: 0, zIndex: 10,
				}}>
					<nav style={{ display: 'flex', alignItems: 'stretch' }}>
						{TABS.map(t => (
							<NavTab key={t} label={t} active={activeTab === t} onClick={() => {
								setActiveTab(t)
								if (t === 'Overview') goto('/admin/dashboard')
								if (t === 'Members')  goto('/admin/users')
								if (t === 'Teams')    goto('/admin/teams')
								if (t === 'Moderation') goto('/admin/moderation')
								if (t === 'Analytics')  goto('/admin/analytics')
							}} />
						))}
					</nav>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<button style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, padding: 4, position: 'relative' }}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
							</svg>
							<span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: RED, border: '1.5px solid #0d0f14' }} />
						</button>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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

				{/* ── Content ── */}
				<div style={{ padding: '20px 24px', flex: 1 }}>

					{/* ── Stat bar ── */}
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 16 }}>
						{[
							{ label: 'Total Members', value: totalUsers,  color: '#fff'   },
							{ label: 'Active',        value: activeCount, color: GREEN   },
							{ label: 'Warned',        value: ALL_USERS.filter(u=>u.status==='warned').length, color: ORANGE },
							{ label: 'Banned',        value: bannedCount, color: RED     },
							{ label: 'Pending',       value: pendingCount,color: BLUE    },
						].map(s => <MiniStat key={s.label} {...s} />)}
					</div>

					{/* ── Main two-column layout ── */}
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 14 }}>

						{/* ── LEFT: User table ── */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

							{/* Toolbar */}
							<div style={{
								background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
								border: '1px solid rgba(255,255,255,0.08)',
								borderRadius: 6, padding: '12px 16px',
								display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
							}}>
								{/* Search */}
								<div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
									<svg width="14" height="14" viewBox="0 0 24 24" fill={MUTED} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }}>
										<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
									</svg>
									<input
										value={search}
										onChange={e => setSearch(e.target.value)}
										placeholder="Search members…"
										style={{
											width: '100%', boxSizing: 'border-box',
											background: 'rgba(255,255,255,0.05)',
											border: '1px solid rgba(255,255,255,0.1)',
											color: '#fff', borderRadius: 4,
											padding: '7px 10px 7px 30px', fontSize: 12,
											fontFamily: 'inherit',
										}}
									/>
								</div>

								{/* Status filter pills */}
								<div style={{ display: 'flex', gap: 4 }}>
									{FILTER_OPTIONS.map(f => (
										<button key={f} onClick={() => setFilterStatus(f)} style={{
											background: filterStatus === f ? RED : 'rgba(255,255,255,0.06)',
											border: filterStatus === f ? `1px solid ${RED}` : '1px solid rgba(255,255,255,0.12)',
											color: filterStatus === f ? '#fff' : MUTED,
											borderRadius: 4, padding: '5px 10px',
											fontSize: 11, fontWeight: 700, cursor: 'pointer',
											letterSpacing: '0.05em', textTransform: 'uppercase',
											transition: 'all 0.15s',
										}}>
											{f}
										</button>
									))}
								</div>

								{/* Role filter */}
								<select
									value={filterRole}
									onChange={e => setFilterRole(e.target.value)}
									style={{
										background: 'rgba(255,255,255,0.06)',
										border: '1px solid rgba(255,255,255,0.12)',
										color: '#fff', borderRadius: 4,
										padding: '5px 10px', fontSize: 11, fontWeight: 700,
										cursor: 'pointer', fontFamily: 'inherit',
									}}
								>
									{ROLE_OPTIONS.map(r => <option key={r} value={r} style={{ background: '#1a1d24' }}>{r}</option>)}
								</select>

								<div style={{ flex: 1 }} />

								{/* Add button */}
								<button style={{
									background: RED, border: 'none',
									color: '#fff', borderRadius: 4,
									padding: '7px 16px', fontWeight: 800, fontSize: 12,
									letterSpacing: '0.06em', cursor: 'pointer',
									fontFamily: 'inherit', textTransform: 'uppercase',
								}}>
									+ Add Member
								</button>
							</div>

							{/* Table */}
							<div style={{
								background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
								border: '1px solid rgba(255,255,255,0.08)',
								borderRadius: 6, overflow: 'hidden',
							}}>
								{/* Table header */}
								<div style={{
									display: 'grid',
									gridTemplateColumns: '32px 1fr 130px 110px 80px 80px 80px 120px',
									gap: 8, padding: '8px 16px',
									borderBottom: '1px solid rgba(255,255,255,0.08)',
									background: 'rgba(0,0,0,0.2)',
								}}>
									{/* checkbox col */}
									<div />
									{[
										{ key: 'name',   label: 'Member'  },
										{ key: 'role',   label: 'Role'    },
										{ key: 'status', label: 'Status'  },
										{ key: 'posts',  label: 'Posts'   },
										{ key: 'events', label: 'Events'  },
										{ key: 'rating', label: 'Rating'  },
										{ key: 'joined', label: 'Joined'  },
									].map(col => (
										<button key={col.key} onClick={() => toggleSort(col.key)} style={{
											background: 'none', border: 'none', cursor: 'pointer', padding: 0,
											textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4,
											fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
											textTransform: 'uppercase', color: sortKey === col.key ? RED : MUTED,
											fontFamily: 'inherit',
										}}>
											{col.label}
											{sortKey === col.key && (
												<span style={{ fontSize: 10 }}>{sortAsc ? '▲' : '▼'}</span>
											)}
										</button>
									))}
								</div>

								{/* Rows */}
								{filtered.length === 0 ? (
									<div style={{ padding: 32, textAlign: 'center', color: MUTED, fontSize: 13 }}>
										No members match your filters
									</div>
								) : filtered.map(u => (
									<div
										key={u.id}
										onClick={() => setSelected(selected === u.id ? null : u.id)}
										style={{
											display: 'grid',
											gridTemplateColumns: '32px 1fr 130px 110px 80px 80px 80px 120px',
											gap: 8, padding: '10px 16px', alignItems: 'center',
											borderBottom: '1px solid rgba(255,255,255,0.05)',
											background: selected === u.id
												? 'rgba(232,57,30,0.07)'
												: 'transparent',
											cursor: 'pointer',
											transition: 'background 0.15s',
										}}
										onMouseEnter={e => { if (selected !== u.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
										onMouseLeave={e => { if (selected !== u.id) e.currentTarget.style.background = 'transparent' }}
									>
										{/* selection indicator */}
										<div style={{
											width: 16, height: 16, borderRadius: 3,
											border: `2px solid ${selected === u.id ? RED : 'rgba(255,255,255,0.2)'}`,
											background: selected === u.id ? RED : 'transparent',
											display: 'flex', alignItems: 'center', justifyContent: 'center',
											transition: 'all 0.15s',
										}}>
											{selected === u.id && (
												<svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
													<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
												</svg>
											)}
										</div>

										{/* Avatar + name */}
										<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
											<div style={{
												width: 30, height: 30, borderRadius: 4, flexShrink: 0,
												background: `linear-gradient(135deg, rgba(232,57,30,0.3), rgba(232,57,30,0.08))`,
												border: `1px solid rgba(232,57,30,0.3)`,
												display: 'flex', alignItems: 'center', justifyContent: 'center',
												fontSize: 12, fontWeight: 900, color: RED, textTransform: 'uppercase',
											}}>
												{u.name[0]}
											</div>
											<div>
												<div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff' }}>
													{u.name}
													{u.verified && (
														<svg width="11" height="11" viewBox="0 0 24 24" fill={GREEN} style={{ marginLeft: 5, verticalAlign: 'middle' }}>
															<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
														</svg>
													)}
												</div>
												<div style={{ fontSize: 10, color: MUTED }}>#{String(u.id).padStart(4, '0')}</div>
											</div>
										</div>

										<RoleBadge role={u.role} />
										<StatusDot status={u.status} />

										<div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{u.posts}</div>
										<div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{u.events}</div>
										<div style={{ fontSize: 13, fontWeight: 800, color: u.rating >= 8 ? GREEN : u.rating >= 5 ? ORANGE : RED }}>
											{u.rating ?? '—'}
										</div>
										<div style={{ fontSize: 11, color: MUTED }}>{u.joined}</div>
									</div>
								))}
							</div>

							{/* Pagination footer */}
							<div style={{
								display: 'flex', alignItems: 'center', justifyContent: 'space-between',
								padding: '6px 4px',
							}}>
								<div style={{ fontSize: 11, color: MUTED }}>
									Showing <span style={{ color: '#fff', fontWeight: 700 }}>{filtered.length}</span> of <span style={{ color: '#fff', fontWeight: 700 }}>{totalUsers}</span> members
								</div>
								<div style={{ display: 'flex', gap: 6 }}>
									{['←', '1', '2', '→'].map((p, i) => (
										<button key={i} style={{
											width: 28, height: 28,
											background: p === '1' ? RED : 'rgba(255,255,255,0.06)',
											border: p === '1' ? `1px solid ${RED}` : '1px solid rgba(255,255,255,0.12)',
											color: '#fff', borderRadius: 4,
											fontSize: 12, fontWeight: 700, cursor: 'pointer',
										}}>
											{p}
										</button>
									))}
								</div>
							</div>

							{/* ── Selected user detail panel ── */}
							{selectedUser && (
								<div style={{
									background: 'linear-gradient(135deg, #110b0a 0%, #0d0f14 100%)',
									border: `1px solid rgba(232,57,30,0.25)`,
									borderRadius: 6, padding: 20,
								}}>
									<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
											<div style={{
												width: 52, height: 52, borderRadius: 6,
												background: `linear-gradient(135deg, rgba(232,57,30,0.35), rgba(232,57,30,0.08))`,
												border: `2px solid rgba(232,57,30,0.4)`,
												display: 'flex', alignItems: 'center', justifyContent: 'center',
												fontSize: 22, fontWeight: 900, color: RED, textTransform: 'uppercase',
											}}>
												{selectedUser.name[0]}
											</div>
											<div>
												<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
													<span style={{ fontSize: 22, fontWeight: 900, textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.01em' }}>
														{selectedUser.name}
													</span>
													<RoleBadge role={selectedUser.role} />
													<StatusDot status={selectedUser.status} />
												</div>
												<div style={{ fontSize: 12, color: MUTED }}>
													Member since {selectedUser.joined} · ID #{String(selectedUser.id).padStart(4, '0')}
												</div>
											</div>
										</div>
										<div style={{ display: 'flex', gap: 8 }}>
											<button style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
												Edit Role
											</button>
											<button style={{ background: 'rgba(74,158,255,0.1)', border: '1px solid rgba(74,158,255,0.3)', color: BLUE, borderRadius: 4, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
												Message
											</button>
											<button style={{ background: 'rgba(232,57,30,0.1)', border: '1px solid rgba(232,57,30,0.3)', color: RED, borderRadius: 4, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
												{selectedUser.status === 'banned' ? 'Unban' : 'Ban'}
											</button>
										</div>
									</div>

									{/* Stats row */}
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
										<MiniStat label="Posts"    value={selectedUser.posts}  />
										<MiniStat label="Events"   value={selectedUser.events} />
										<MiniStat label="Rating"   value={selectedUser.rating ?? '—'} color={selectedUser.rating >= 8 ? GREEN : selectedUser.rating >= 5 ? ORANGE : RED} />
										<MiniStat label="Verified" value={selectedUser.verified ? '✓ Yes' : '✗ No'} color={selectedUser.verified ? GREEN : MUTED} />
									</div>

									{/* Activity spark */}
									<div style={{ marginBottom: 8 }}>
										<div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
											Activity — Last 15 Days
										</div>
										<ActivitySpark color={RED} />
									</div>

									{/* Warn / notes */}
									<div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
										<textarea
											placeholder="Add admin note for this member…"
											rows={2}
											style={{
												flex: 1, background: 'rgba(255,255,255,0.04)',
												border: '1px solid rgba(255,255,255,0.1)',
												color: '#fff', borderRadius: 4,
												padding: '8px 10px', fontSize: 12,
												resize: 'none', fontFamily: 'inherit',
											}}
										/>
										<button style={{
											background: ORANGE, border: 'none', color: '#fff',
											borderRadius: 4, padding: '0 14px',
											fontSize: 11, fontWeight: 800, cursor: 'pointer',
											textTransform: 'uppercase', letterSpacing: '0.06em',
										}}>
											Warn
										</button>
									</div>
								</div>
							)}
						</div>

						{/* ── RIGHT SIDEBAR ── */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

							{/* Member stats donut */}
							<div style={{
								background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
								border: '1px solid rgba(255,255,255,0.08)',
								borderRadius: 6, padding: 16,
							}}>
								<div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 14 }}>
									Verification Rate
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
									<DonutChart pct={verifiedPct} label="Verified" color={GREEN} />
									<div style={{ flex: 1 }}>
										<div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Verified</div>
										<div style={{ fontSize: 20, fontWeight: 900, color: GREEN, marginBottom: 10 }}>
											{ALL_USERS.filter(u => u.verified).length}
										</div>
										<div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Unverified</div>
										<div style={{ fontSize: 20, fontWeight: 900, color: RED }}>
											{ALL_USERS.filter(u => !u.verified).length}
										</div>
									</div>
								</div>

								{/* Role distribution bars */}
								<div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
									<div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>
										Role Breakdown
									</div>
									<RoleBar role="Owner"      count={roleCounts['Owner'] || 0}       total={totalUsers} color={RED}    />
									<RoleBar role="Jr. Helper" count={roleCounts['Jr. Helper'] || 0}  total={totalUsers} color={ORANGE} />
									<RoleBar role="Jr. Member" count={roleCounts['Jr. Member'] || 0}  total={totalUsers} color={BLUE}   />
									<RoleBar role="Member"     count={roleCounts['Member'] || 0}      total={totalUsers} color={MUTED}  />
								</div>
							</div>

							{/* New Signup Activity */}
							<div style={{
								background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
								border: '1px solid rgba(255,255,255,0.08)',
								borderRadius: 6, padding: 16,
							}}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
									<div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>
										New Signups
									</div>
									<span style={{ fontSize: 10, color: GREEN, fontWeight: 700 }}>↑ 12% this week</span>
								</div>
								<ActivitySpark color={GREEN} />
								<div style={{ marginTop: 12 }}>
									{ALL_USERS
										.sort((a, b) => b.joined.localeCompare(a.joined))
										.slice(0, 4)
										.map(u => <SignupRow key={u.id} name={u.name} role={u.role} joined={u.joined} verified={u.verified} />)
									}
								</div>
							</div>

							{/* Pending approvals */}
							<div style={{
								background: 'rgba(232,57,30,0.05)',
								border: '1px solid rgba(232,57,30,0.2)',
								borderRadius: 6, padding: 16,
							}}>
								<div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: RED, marginBottom: 12 }}>
									🕐 Pending Approvals
								</div>
								{ALL_USERS.filter(u => u.status === 'pending').map(u => (
									<div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
										<div>
											<div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#fff' }}>{u.name}</div>
											<div style={{ fontSize: 10, color: MUTED }}>{u.joined}</div>
										</div>
										<div style={{ display: 'flex', gap: 6 }}>
											<button style={{ background: 'rgba(62,207,110,0.1)', border: '1px solid rgba(62,207,110,0.3)', color: GREEN, borderRadius: 4, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
												Approve
											</button>
											<button style={{ background: 'rgba(232,57,30,0.1)', border: '1px solid rgba(232,57,30,0.3)', color: RED, borderRadius: 4, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
												Deny
											</button>
										</div>
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