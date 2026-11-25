import PineTree from './PineTree'
import Cottage from './Cottage'
import Snowman from './Snowman'
import './SnowyHills.css'

const BACK_RIDGE = 'M0 150 C160 108 330 118 500 124 C650 129 760 96 930 92 C1100 88 1250 120 1440 104'
const FRONT_RIDGE = 'M0 200 C140 176 300 170 470 182 C640 194 800 168 980 172 C1160 176 1300 196 1440 184'

const BACK_TREES = [
  { x: 146, y: 127, scale: 0.9 },
  { x: 196, y: 123, scale: 0.65 },
  { x: 246, y: 121, scale: 0.8 },
  { x: 708, y: 113, scale: 0.75 },
  { x: 1005, y: 94, scale: 0.85 },
  { x: 1050, y: 94, scale: 0.6 },
  { x: 1178, y: 105, scale: 0.9 },
  { x: 1330, y: 112, scale: 0.7 },
]

const HATCHES = [
  'M536 142 l12 -9 M550 144 l12 -9 M564 145 l12 -9',
  'M1220 132 l12 -9 M1234 134 l12 -9 M1248 135 l12 -9',
  'M330 196 l12 -9 M344 198 l12 -9 M358 199 l12 -9',
  'M1080 192 l12 -9 M1094 194 l12 -9 M1108 195 l12 -9',
]

export default function SnowyHills() {
  return (
    <div className="snowy-hills" aria-hidden="true">
      <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" className="doodle">
        <path d={`${BACK_RIDGE} L1440 260 L0 260 Z`} fill="#edf4f8" />
        <path className="ink" d={BACK_RIDGE} />
        {BACK_TREES.map((tree) => <PineTree key={tree.x} {...tree} />)}
        <Cottage x={857} y={100} />

        <path d={`${FRONT_RIDGE} L1440 260 L0 260 Z`} fill="#fff" />
        <path className="ink" d={FRONT_RIDGE} />
        <path d={HATCHES.join(' ')} stroke="var(--snow-shadow)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <Snowman x={571} y={190} />
        <PineTree x={150} y={186} scale={1.1} />
        <PineTree x={1290} y={190} scale={1.05} />
      </svg>
    </div>
  )
}
