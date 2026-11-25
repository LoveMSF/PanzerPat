import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, ArrowDownToLine, ArrowUpFromLine, AudioLines, BatteryCharging, Check, ChevronRight, CircleHelp, Coins, Gauge, LockKeyhole, MousePointer2, PawPrint, Radio, RotateCcw, Settings2, Shield, Sparkles, Volume2, VolumeX, Wrench, Zap } from 'lucide-react'
import { format, tanks, upgrades, type Tank } from './data'

type Save = { ap: number; owned: number[]; active: number; levels: Record<string, number>; pets: number; quacks: number; fever: number; maxAp: number }
const fresh: Save = { ap: 0, owned: [0], active: 0, levels: {}, pets: 0, quacks: 0, fever: 0, maxAp: 0 }
const KEY = 'panzerpat-save-v1'

function TankArt({ tank, compact = false }: { tank: Tank; compact?: boolean }) {
  const shape = tank.shape
  const hulls = [
    'M139 210 L174 172 L438 172 L486 208 L475 250 L149 250Z',
    'M151 210 L179 181 L435 181 L478 209 L468 246 L155 246Z',
    'M156 205 L171 177 L445 177 L481 206 L470 244 L147 244Z',
    'M126 211 L171 170 L445 170 L494 210 L481 249 L137 249Z',
    'M126 207 L166 164 L453 164 L505 207 L492 254 L128 254Z',
    'M117 214 L152 179 L469 179 L511 214 L496 251 L123 251Z',
  ]
  const turrets = [
    'M229 175 Q240 137 277 132 L367 132 Q390 142 400 175Z',
    'M237 178 Q247 142 281 137 L361 137 Q389 147 394 178Z',
    'M247 174 Q254 141 293 139 L363 139 Q381 146 389 174Z',
    'M222 176 Q235 136 278 130 L371 130 Q399 143 409 176Z',
    'M217 177 Q229 132 278 126 L377 126 Q405 141 416 177Z',
    'M224 174 Q235 142 270 136 L369 136 Q393 146 402 174Z',
  ]
  const hullPath = hulls[shape === 2 ? 2 : shape % hulls.length]
  const turretPath = turrets[shape === 2 ? 2 : shape % turrets.length]
  const barrelStart = shape === 2 ? 374 : 381
  const barrelLength = shape === 2 ? 119 : [102, 116, 119, 131, 138, 124][shape % 6]
  return <svg className={`tank-art ${compact ? 'compact-art' : ''}`} viewBox="0 0 620 350" role="img" aria-label={`${tank.name} tank`}>
    <defs>
      <linearGradient id={`hull-${shape}`} x1="0" x2="0.85" y1="0" y2="1"><stop stopColor={tank.color} /><stop offset="1" stopColor={tank.dark} /></linearGradient>
      <linearGradient id={`steel-${shape}`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#343835" /><stop offset="1" stopColor="#171a19" /></linearGradient>
      <pattern id={`camo-${shape}`} width="62" height="35" patternUnits="userSpaceOnUse"><path d="M2 10 Q16 -2 28 8 T57 7 L62 20 Q47 31 31 21 T4 29Z" fill={tank.dark} opacity=".33"/><circle cx="49" cy="5" r="3" fill={tank.accent} opacity=".18"/></pattern>
      <filter id="shadow"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>
    {!compact && <ellipse cx="309" cy="303" rx="217" ry="20" fill="#000" opacity=".45" filter="url(#shadow)"/>}
    <g className="track-runner">
      <path d="M112 248 Q112 215 151 208 L465 208 Q510 214 518 249 L517 284 Q504 311 469 314 L157 314 Q116 307 110 280Z" fill={`url(#steel-${shape})`} stroke="#59605a" strokeWidth="5"/>
      <path d="M139 259 Q142 229 169 228 H462 Q487 233 491 260 V279 Q484 294 463 296 H168 Q144 291 139 276Z" fill="#0d100f" stroke="#7a806e" strokeWidth="2" strokeDasharray="8 4"/>
      {[177,229,282,335,388,441].map(x => <g key={x}><circle cx={x} cy="262" r={shape === 2 ? 18 : 24} fill="#252a27" stroke={tank.color} strokeWidth="5"/><circle cx={x} cy="262" r="7" fill={tank.accent}/><path d={`M${x-2} 242L${x+3} 254`} stroke="#c4bb91" opacity=".35" strokeWidth="3"/></g>)}
    </g>
    <g className="suspension"><path d="M132 218L157 242M498 218L478 242" stroke={tank.accent} strokeWidth="5"/><path d="M147 207v-12m329 12v-12" stroke="#a39a72" strokeWidth="4"/></g>
    <g className="tank-body">
      <path d={hullPath} fill={`url(#hull-${shape})`} stroke="#afb18a" strokeOpacity=".55" strokeWidth="3"/>
      <path d="M148 211 L174 177 L438 177 L479 211 L472 246 L150 246Z" fill={`url(#camo-${shape})`} opacity=".9"/>
      <path d="M161 219H468" stroke={tank.accent} strokeWidth="3" opacity=".52"/>
      <path d="M172 186L198 178 198 209 158 209Z" fill={tank.dark} opacity=".55"/>
      <path d="M422 180l25 3 19 21h-41Z" fill={tank.dark} opacity=".65"/>
      <path d="M202 236h62m125 0h45" stroke="#d3ca9b" opacity=".25" strokeWidth="2"/>
      {shape % 3 === 0 && <><rect x="315" y="184" width="12" height="43" rx="2" fill={tank.accent}/><path d="M321 184v-13" stroke={tank.accent} strokeWidth="3"/></>}
    </g>
    <g className="turret">
      <path d={turretPath} fill={`url(#hull-${shape})`} stroke="#c2bd91" strokeOpacity=".62" strokeWidth="3"/>
      <path d="M240 166 Q250 142 281 139 H365" fill="none" stroke={`url(#camo-${shape})`} strokeWidth="14" opacity=".65"/>
      <rect x={barrelStart} y="145" width={barrelLength} height="13" rx="6" fill="#61665b" stroke="#adb096" strokeWidth="2"/>
      <rect x={barrelStart + barrelLength - 14} y="147" width="12" height="9" rx="2" fill="#181b19"/>
      <path d="M302 133v-18" stroke="#aaa78d" strokeWidth="3"/><circle cx="302" cy="115" r="3" fill={tank.accent}/>
      <rect x="284" y="153" width="62" height="23" rx="10" fill="#222724" stroke="#a3a788" strokeWidth="2"/>
      <path d="M294 164h43" stroke={tank.accent} strokeWidth="7" strokeLinecap="round" className="visor-glow"/>
      <circle cx="300" cy="163" r="3" fill="#f3d899"/><circle cx="332" cy="163" r="3" fill="#f3d899"/>
      <path d="M313 173q5 5 10 0" fill="none" stroke="#df9185" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="284" cy="172" rx="7" ry="4" fill="#e48c7c" opacity=".72"/><ellipse cx="347" cy="172" rx="7" ry="4" fill="#e48c7c" opacity=".72"/>
      <path d="M368 128q18-22 31-4" fill="none" stroke="#b3a878" strokeWidth="3"/>
    </g>
    <g fill={tank.accent} opacity=".9"><rect x="183" y="191" width="7" height="7" rx="1"/><rect x="436" y="226" width="11" height="6" rx="1"/><circle cx="208" cy="225" r="4"/></g>
  </svg>
}

function makeSound(tank: Tank, mode: 'quack' | 'engine', muted: boolean) {
  if (muted) return
  try {
    const Ctx = window.AudioContext
    const ctx = new Ctx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain()
    osc.type = mode === 'quack' ? 'sawtooth' : 'triangle'
    const scale = Math.max(.42, tank.pitch / 900)
    osc.frequency.setValueAtTime((mode === 'quack' ? 900 : 120) * scale, now)
    osc.frequency.exponentialRampToValueAtTime((mode === 'quack' ? 350 : 72) * scale, now + (mode === 'quack' ? .16 : .34))
    filter.type = mode === 'quack' ? 'bandpass' : 'lowpass'
    filter.frequency.setValueAtTime((mode === 'quack' ? 920 : 260) * scale, now)
    filter.frequency.exponentialRampToValueAtTime((mode === 'quack' ? 350 : 100) * scale, now + .24)
    filter.Q.value = mode === 'quack' ? 5 : 1.2
    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.17, now + .012)
    gain.gain.exponentialRampToValueAtTime(.0001, now + (mode === 'quack' ? .27 : .42))
    osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + .44)
    osc.onended = () => { void ctx.close() }
  } catch { /* Audio may be unavailable until the first gesture. */ }
}

const tierClass = (tier: Tank['tier']) => tier === 'SUPER-HEAVY / MBT' ? 'tier-super' : `tier-${tier.toLowerCase()}`

export default function App() {
  const [save, setSave] = useState<Save>(() => {
    try { const raw = localStorage.getItem(KEY); return raw ? { ...fresh, ...JSON.parse(raw) } as Save : fresh } catch { return fresh }
  })
  const [tab, setTab] = useState<'hangar' | 'upgrades'>('hangar')
  const [soundMode, setSoundMode] = useState<'quack' | 'engine'>('quack')
  const [muted, setMuted] = useState(false)
  const [hit, setHit] = useState(0)
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string; kind: string; glyph: string }[]>([])
  const [toast, setToast] = useState('')
  const [strokeOn, setStrokeOn] = useState(false)
  const [sortBy, setSortBy] = useState<'order' | 'cost'>('order')
  const strokeAt = useRef(0)
  const active = tanks[save.active] ?? tanks[0]
  const feverLevel = save.fever >= 90 ? 3 : save.fever >= 45 ? 2 : 1
  const multiplier = feverLevel
  const autoLevel = save.levels.arm ?? 0
  const autoRate = autoLevel
  const petBonus = save.levels.glove ?? 0
  const critChance = Math.min(.4, (save.levels.polish ?? 0) * .02)
  const buyCost = (id: string, base: number) => Math.floor(base * Math.pow(1.72, save.levels[id] ?? 0))

  useEffect(() => { const timer = window.setInterval(() => { try { localStorage.setItem(KEY, JSON.stringify(save)) } catch { /* storage can be disabled */ } }, 3000); return () => window.clearInterval(timer) }, [save])
  useEffect(() => { const timer = window.setInterval(() => {
    setSave(s => {
      const passive = s.owned.reduce((sum, id) => sum + (tanks[id]?.aps ?? 0), 0)
      const income = passive + autoRate * Math.max(1, tanks[s.active]?.ap ?? 1)
      const feverDrain = 1.3 / (1 + (s.levels.caller ?? 0) * .4)
      return { ...s, ap: s.ap + income, maxAp: Math.max(s.maxAp, s.ap + income), fever: Math.max(0, s.fever - feverDrain) }
    })
  }, 1000); return () => window.clearInterval(timer) }, [autoRate])

  const earn = useCallback((x = 50, y = 28) => {
    const isCrit = Math.random() < critChance
    const amount = Math.max(1, Math.round((active.ap + petBonus) * multiplier * (isCrit ? 5 : 1)))
    setSave(s => ({ ...s, ap: s.ap + amount, maxAp: Math.max(s.maxAp, s.ap + amount), pets: s.pets + 1, quacks: s.quacks + 1, fever: Math.min(100, s.fever + 5 + (s.levels.caller ?? 0)) }))
    setHit(v => v + 1)
    const id = Date.now() + Math.random()
    const glyphs = ['♥', '🦆', '✦', '✧']
    setFloats(f => [...f.slice(-12), { id, x: x + (Math.random() * 24 - 12), y, text: `+${format(amount)} AP`, kind: isCrit ? 'critical' : 'gain', glyph: glyphs[Math.floor(Math.random() * glyphs.length)] }])
    window.setTimeout(() => setFloats(f => f.filter(item => item.id !== id)), 1050)
    makeSound(active, soundMode, muted)
  }, [active, petBonus, multiplier, critChance, soundMode, muted])

  const petAt = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    earn(((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 72 + 6)
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!strokeOn || event.buttons !== 1) return
    const now = performance.now()
    if (now - strokeAt.current > 95) { strokeAt.current = now; petAt(event) }
  }
  const buyTank = (tank: Tank) => {
    if (save.owned.includes(tank.id)) { setSave(s => ({ ...s, active: tank.id })); return }
    if (save.ap < tank.cost) return
    setSave(s => ({ ...s, ap: s.ap - tank.cost, owned: [...s.owned, tank.id], active: tank.id }))
    setToast(`${tank.name} joined the squad!`); window.setTimeout(() => setToast(''), 2200)
  }
  const buyUpgrade = (item: typeof upgrades[number]) => {
    const cost = buyCost(item.id, item.baseCost)
    if (save.ap < cost) return
    setSave(s => ({ ...s, ap: s.ap - cost, levels: { ...s.levels, [item.id]: (s.levels[item.id] ?? 0) + 1 } }))
  }
  const exportSave = () => {
    const blob = new Blob([JSON.stringify(save)], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'panzerpat-save.json'; a.click(); URL.revokeObjectURL(url)
    setToast('Save file exported'); window.setTimeout(() => setToast(''), 2000)
  }
  const importSave = () => {
    const input = document.createElement('input'); input.type = 'file'; input.accept = '.json,application/json'
    input.onchange = () => { const file = input.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const s = JSON.parse(String(reader.result)) as Save; if (typeof s.ap !== 'number' || !Array.isArray(s.owned)) throw Error(); setSave({ ...fresh, ...s }); setToast('Save imported successfully') } catch { setToast('That save file looks invalid') } window.setTimeout(() => setToast(''), 2400) }; reader.readAsText(file) }
    input.click()
  }
  const reset = () => { if (window.confirm('Reset all PanzerPat progress? This cannot be undone.')) { setSave(fresh); localStorage.removeItem(KEY) } }

  const orderedTanks = useMemo(() => [...tanks].sort((a, b) => sortBy === 'cost' ? a.cost - b.cost : a.id - b.id), [sortBy])
  const totalAps = save.owned.reduce((sum, id) => sum + (tanks[id]?.aps ?? 0), 0)

  return <main className="app-shell antialiased">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><span>PP</span><i /></div><div><div className="brand-title">PANZER<span>PAT</span></div><div className="brand-sub">TACTICAL PETTING DIVISION <b>•</b> EST. 1943½</div></div></div>
      <div className="top-center"><span className="live-dot"/> GARAGE NETWORK <span className="top-divider"/> SECTOR 07 <span className="top-divider"/> <span className="green-text">● SYSTEMS NOMINAL</span></div>
      <div className="top-actions"><button className="sound-mode" onClick={() => setSoundMode(s => s === 'quack' ? 'engine' : 'quack')} title="Switch sound profile"><AudioLines size={14}/>{soundMode === 'quack' ? 'QUACK SFX' : 'ENGINE PURR'}</button><button className="icon-button" onClick={() => setMuted(m => !m)} title={muted ? 'Unmute' : 'Mute'}>{muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}</button><div className="avatar">PP</div></div>
    </header>

    <section className="hud-strip">
      <div className="hud-label"><span className="eyebrow">CURRENT OPERATION</span><strong>OPERATION: GOOD BOY</strong></div>
      <div className="hud-stat"><span><Coins size={13}/> ARMOR POINTS</span><strong className="gold-value">{format(save.ap)} <small>AP</small></strong></div>
      <div className="hud-stat"><span><PawPrint size={13}/> TOTAL PETS</span><strong>{format(save.pets)}</strong></div>
      <div className="hud-stat"><span><Radio size={13}/> QUACKS DEPLOYED</span><strong>{format(save.quacks)}</strong></div>
      <div className="hud-stat income-stat"><span><Activity size={13}/> PASSIVE INCOME</span><strong>+{format(totalAps + autoRate * active.ap)} <small>AP / SEC</small></strong></div>
      <div className="topbar-buttons"><button title="Export save" onClick={exportSave}><ArrowDownToLine size={14}/></button><button title="Import save" onClick={importSave}><ArrowUpFromLine size={14}/></button><button title="Reset progress" onClick={reset}><RotateCcw size={14}/></button></div>
    </section>

    <div className="content-grid">
      <section className="stage-column">
        <div className="section-heading"><div><div className="eyebrow"><span className="live-dot"/> LIVE FEED // HANGAR 01</div><h1>THE PETTING BAY</h1></div><div className="heading-right"><span className="telemetry"><span>CAM 01</span><b>REC</b></span><button className="round-help" title="Pet the tank! Click or drag over it to earn armor points." onClick={() => setToast('Click or rub the tank to earn AP. Build fever for a 2× or 3× boost!')}><CircleHelp size={16}/></button></div></div>
        <div className={`stage-card ${strokeOn ? 'is-petting' : ''}`}>
          <div className="stage-topline"><span><span className="rec-dot"/> LIVE VISUAL // {active.name.toUpperCase()}</span><span>LAT 42°17'08" N&nbsp;&nbsp; LONG 23°19'41" E</span></div>
          <div className="stage-grid"/>
          <div className="scanline"/>
          <div className="corner-label top-left"><span>ARMOR PLATING</span><b>100%</b></div><div className="corner-label top-right"><span>MOOD INDEX</span><b className="happy">HAPPY ●</b></div>
          <div className="pet-target" onPointerDown={e => { setStrokeOn(true); strokeAt.current = performance.now(); petAt(e) }} onPointerMove={onPointerMove} onPointerUp={() => setStrokeOn(false)} onPointerLeave={() => setStrokeOn(false)} onContextMenu={e => e.preventDefault()}>
            <motion.div className="tank-wrap" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}>
              <AnimatePresence mode="popLayout"><motion.div key={hit} className="hit-bounce" initial={{ scaleX: 1, scaleY: 1, rotate: 0, skewX: 0 }} animate={hit ? { scaleX: [1, 1.25, .94, 1.04, 1], scaleY: [1, .70, 1.1, .97, 1], rotate: hit % 2 ? [0, -7, 4, -2, 0] : [0, 7, -4, 2, 0], skewX: hit % 2 ? [0, -5, 3, -1, 0] : [0, 5, -3, 1, 0] } : {}} transition={{ duration: .55, times: [0, .2, .45, .72, 1], ease: 'easeOut' }}><TankArt tank={active}/></motion.div></AnimatePresence>
            </motion.div>
            {floats.map(f => <motion.div key={f.id} className={`float-label ${f.kind}`} style={{ left: `${f.x}%`, top: `${f.y}%` }} initial={{ opacity: 0, y: 8, scale: .75 }} animate={{ opacity: 1, y: -34, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .85 }}><span className="particle-glyph">{f.glyph}</span><span>{f.kind === 'critical' ? '✦ ' : '+ '}</span>{f.text}</motion.div>)}
            <div className="pet-cue"><MousePointer2 size={14}/> CLICK / RUB TO PET</div>
          </div>
          <div className="stage-bottomline"><span><span className="green-dot"/> HULL INTEGRITY <b>100.0</b></span><span>CREW STATUS <b className="happy">OVERJOYED</b></span><span>CLICK RATE <b>{Math.min(99, (save.pets % 99) + 1).toString().padStart(2, '0')} / MIN</b></span></div>
          <div className="stage-id">PP–{String(active.id + 1).padStart(3, '0')}</div>
        </div>
        <div className="fever-panel"><div className="fever-left"><div className="fever-icon"><Zap size={17} fill="currentColor"/></div><div><div className="eyebrow">PURR / QUACK FEVER <span className="fever-state">{save.fever > 45 ? '• OVERDRIVE' : '• CHARGING'}</span></div><div className="fever-copy">{save.fever > 90 ? 'MAXIMUM OVERDRIVE — let it rip!' : save.fever > 45 ? 'The squad is feeling it. Keep going!' : 'Keep petting to charge your multiplier.'}</div></div></div><div className="fever-meter"><div className="fever-ticks">{Array.from({ length: 20 }, (_, i) => <i key={i} className={i * 5 < save.fever ? 'filled' : ''}/>)}</div><div className="fever-level"><span>0</span><span className={feverLevel >= 2 ? 'active' : ''}>2× <small>45</small></span><span className={feverLevel >= 3 ? 'active' : ''}>3× <small>90</small></span></div></div><div className={`multiplier-pill mult-${feverLevel}`}><span>{multiplier}×</span><small>MULTI</small></div></div>
        <div className="quick-stats"><div><Shield/><span>ACTIVE ARMOR</span><b>{active.name}</b></div><div><Gauge/><span>AP PER PET</span><b>{format((active.ap + petBonus) * multiplier)} <small>AP</small></b></div><div><BatteryCharging/><span>HANGAR YIELD</span><b>+{format(totalAps + autoRate * active.ap)} <small>AP/S</small></b></div><div><Sparkles/><span>CRITICAL QUACK</span><b>{Math.round(critChance * 100)}<small>%</small></b></div></div>
      </section>

      <aside className="side-column">
        <div className="side-tabs"><button className={tab === 'hangar' ? 'selected' : ''} onClick={() => setTab('hangar')}><Wrench size={15}/> HANGAR <span className="tab-count">{save.owned.length}/24</span></button><button className={tab === 'upgrades' ? 'selected' : ''} onClick={() => setTab('upgrades')}><Settings2 size={15}/> UPGRADES <span className="tab-count">{Object.values(save.levels).reduce((a,b) => a+b, 0)}</span></button></div>
        {tab === 'hangar' ? <>
          <div className="side-title"><div><div className="eyebrow">MOTOR POOL</div><h2>THE HANGAR <span>/{String(tanks.length).padStart(2,'0')}</span></h2></div><button className="sort-button" onClick={() => setSortBy(s => s === 'order' ? 'cost' : 'order')}>SORT: {sortBy === 'order' ? 'TIER' : 'COST'} <ChevronRight size={12}/></button></div>
          <div className="roster-summary"><span><i className="green-dot"/> {save.owned.length} VEHICLES OPERATIONAL</span><span>+{format(totalAps)} AP/S</span></div>
          <div className="tank-list">{orderedTanks.map(tank => {
            const owned = save.owned.includes(tank.id), chosen = active.id === tank.id, afford = save.ap >= tank.cost
            return <button key={tank.id} className={`tank-card ${chosen ? 'chosen' : ''} ${owned ? 'owned' : 'locked'}`} onClick={() => buyTank(tank)}>
              <div className="tank-thumb">{owned ? <TankArt tank={tank} compact/> : <div className="silhouette"><TankArt tank={tank} compact/></div>}{chosen && <span className="selected-stamp"><Check size={10}/> ACTIVE</span>}</div>
              <div className="tank-info"><div className="tank-card-top"><h3>{tank.name}</h3><span className={`tier-badge ${tierClass(tank.tier)}`}>{tank.tier}</span></div><p>{tank.quote}</p><div className="tank-yield"><span>⚡ {tank.ap} AP / PET</span><span>↗ {format(tank.aps)} AP/S</span></div></div>
              <div className={`tank-cost ${owned ? 'owned-cost' : afford ? 'can-afford' : ''}`}>{owned ? chosen ? 'ACTIVE' : 'SELECT' : <><span>{format(tank.cost)}</span><small>AP</small></>}</div>
              {!owned && !afford && <LockKeyhole className="lock-icon" size={12}/>}
            </button>
          })}</div>
        </> : <>
          <div className="side-title"><div><div className="eyebrow">FIELD MODIFICATIONS</div><h2>THE WORKSHOP <span>/{String(upgrades.length).padStart(2,'0')}</span></h2></div><Wrench size={17} className="muted-icon"/></div>
          <div className="upgrade-note"><span className="upgrade-note-icon"><Wrench size={16}/></span><div><b>UNIVERSAL MODS</b><p>All upgrades apply across your entire fleet.</p></div></div>
          <div className="upgrade-list">{upgrades.map(item => { const cost = buyCost(item.id, item.baseCost), level = save.levels[item.id] ?? 0, affordable = save.ap >= cost
            return <div className="upgrade-card" key={item.id}><div className="upgrade-symbol">{item.icon}</div><div className="upgrade-details"><div className="upgrade-head"><h3>{item.name}</h3><span>LVL {String(level).padStart(2,'0')}</span></div><p>{item.description}</p><div className="upgrade-progress">{Array.from({length: 8}, (_, i) => <i key={i} className={i < Math.min(8, level) ? 'filled' : ''}/>)}</div></div><button className={`upgrade-buy ${affordable ? 'affordable' : ''}`} onClick={() => buyUpgrade(item)} disabled={!affordable}><b>+ {format(cost)}</b><small>AP</small></button></div>
          })}</div>
          <div className="modifiers"><div className="eyebrow">ACTIVE MODIFIERS</div><div><span>Pet power</span><b>+{petBonus} AP</b></div><div><span>Auto-petter rate</span><b>{autoRate} / sec</b></div><div><span>Critical quack chance</span><b>{Math.round(critChance*100)}%</b></div><div><span>Fever duration</span><b>{2 + (save.levels.caller ?? 0)} sec+</b></div></div>
          <div className="save-tools"><div className="eyebrow">FIELD DATA</div><div className="save-buttons"><button onClick={exportSave}><ArrowDownToLine size={14}/> EXPORT SAVE</button><button onClick={importSave}><ArrowUpFromLine size={14}/> IMPORT SAVE</button></div><button className="reset-button" onClick={reset}><RotateCcw size={13}/> RESET CAMPAIGN</button></div>
        </>}
        <div className="side-footer"><span><span className="green-dot"/> AUTOSAVE ACTIVE</span><span>V.1.0.43½</span></div>
      </aside>
    </div>
    <footer className="footer"><div><span className="footer-mark">PP</span> PANZERPAT <span className="footer-sep">/</span> BUILT FOR THE LOVE OF TANKS</div><div><span>ALL QUIET ON THE CUTENESS FRONT</span><span className="footer-dots">•••</span></div></footer>
    <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Check size={15}/>{toast}</motion.div>}</AnimatePresence>
  </main>
}
