export type Tank = {
  id: number; name: string; tier: 'LIGHT' | 'MEDIUM' | 'HEAVY' | 'SUPER-HEAVY / MBT'
  cost: number; ap: number; aps: number; pitch: number; quote: string; color: string; dark: string; accent: string; shape: number
}

const raw: [string, Tank['tier'], number, number, string, string, string, string, number][] = [
  ['FT-17','LIGHT',0,1,'The original pocket-sized good boy.','7A8050','414830','C3AE70',0],
  ['MS-1 (T-18)','LIGHT',35,2,'Small chassis. Unreasonably large heart.','8A865A','4B4A36','D1B85C',1],
  ['L3/33 CC','LIGHT',110,4,'Tiny tankette. Maximum squeakage.','777B57','424537','C9BB74',2],
  ['BT-7','LIGHT',320,8,'Fast enough to chase the treat bag.','72804C','3D4930','D5A843',3],
  ['T-26','LIGHT',850,15,'A gentle tap. A very loud quack.','81815D','494837','D7B752',4],
  ['Panzer III Ausf. J','MEDIUM',2100,30,'Efficient pats, impeccable posture.','777C55','44483B','D5A849',5],
  ['M4 Sherman','MEDIUM',5200,55,'Reliable, friendly, loves a head rub.','747B4F','404830','D7B848',6],
  ['T-34-85','MEDIUM',12500,100,'Sloped armor. Surprisingly soft vibes.','6D784B','3E4931','D9B34D',7],
  ['Cromwell V','MEDIUM',29000,175,'Dashing across the garage for cuddles.','82845A','4C4B3A','D8C06B',8],
  ['Panzer IV Ausf. H','MEDIUM',68000,300,'A well-rounded loaf with a long snout.','817452','4B4336','D6AE4E',9],
  ['KV-1','HEAVY',155000,500,'One pat? Make that a full-body pat.','737C50','414937','C3A553',10],
  ['IS-2','HEAVY',360000,850,'Big nose. Bigger need for forehead scritches.','747D54','424937','D9B850',11],
  ['Panther Ausf. G','HEAVY',820000,1400,'Sleek, shy, secretly a total cuddle bug.','747B4E','424831','D7AE45',12],
  ['Tiger I','HEAVY',1850000,2300,'Intimidating roar. Tiny happy blush.','87805C','514A39','DBB850',13],
  ['Tiger II (King Tiger)','HEAVY',4200000,3800,'Royal treatment for a royal chonk.','77795A','414536','D9B74C',14],
  ['T29 Heavy','HEAVY',9500000,6200,'A turret this big needs extra pats.','727950','3F4534','CFAD49',15],
  ['Centurion Mk. 7/1','HEAVY',21000000,10500,'A distinguished gentle giant.','747D55','424A35','D1BB65',16],
  ['T-54 / T-55','HEAVY',48000000,18000,'Compact profile. Industrial-grade purring.','68754A','39442F','D5B34C',17],
  ['IS-3','SUPER-HEAVY / MBT',110000000,31000,'Duck-shaped nose. This was inevitable.','707855','404538','E0BC4E',18],
  ['Leopard 2A7','SUPER-HEAVY / MBT',250000000,53000,'Precision-engineered for premium pets.','777D55','414832','D6B64F',19],
  ['M1A2 Abrams','SUPER-HEAVY / MBT',570000000,90000,'Turbine whine, then one enormous quack.','747C52','3F4935','D9B74E',20],
  ['T-90M','SUPER-HEAVY / MBT',1300000000,155000,'Reactive armor polish? Very spa-coded.','63754C','384632','D4AD45',21],
  ['FV4005 Stage II','SUPER-HEAVY / MBT',3000000000,270000,'The Doom Barn has arrived for belly rubs.','77785B','414537','E4B647',22],
  ['Panzer VIII Maus','SUPER-HEAVY / MBT',7000000000,500000,'188 tons of pure, concentrated quack.','747B52','3E4733','E0B848',23],
]

export const tanks: Tank[] = raw.map(([name, tier, cost, aps, quote, color, dark, accent, shape], id) => ({
  id, name, tier, cost, aps, quote, color: `#${color}`, dark: `#${dark}`, accent: `#${accent}`,
  ap: Math.max(1, Math.round(Math.pow(id + 1, 1.22))), pitch: Math.round(1040 - id * 31), shape,
}))

export type Upgrade = { id: string; name: string; description: string; baseCost: number; kind: 'pet' | 'fever' | 'auto' | 'crit'; icon: string }
export const upgrades: Upgrade[] = [
  { id: 'glove', name: 'Soft Microfiber Glove', description: '+1 AP per pet, permanently', baseCost: 80, kind: 'pet', icon: '✳' },
  { id: 'caller', name: 'Turbo Duck Caller', description: '+2s fever duration & a little extra kick', baseCost: 240, kind: 'fever', icon: '◖' },
  { id: 'arm', name: 'Robotic Petting Arm', description: '+1 automatic pet every second', baseCost: 600, kind: 'auto', icon: '⌁' },
  { id: 'polish', name: 'Reactive Armor Polish', description: '+2% chance to land a 5× critical quack', baseCost: 1200, kind: 'crit', icon: '✧' },
]

export const format = (n: number) => {
  if (!Number.isFinite(n)) return '∞'
  if (n < 1000) return Math.floor(n).toLocaleString('en-US')
  const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi']
  const tier = Math.min(Math.floor(Math.log10(n) / 3), units.length - 1)
  return `${(n / Math.pow(1000, tier)).toFixed(n >= 100000 ? 0 : 1)}${units[tier]}`
}
