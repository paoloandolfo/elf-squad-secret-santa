import DoodleSvg from './DoodleSvg'

const SPARKLE = 'M10 1 C11 7 13 9 19 10 C13 11 11 13 10 19 C9 13 7 11 1 10 C7 9 9 7 10 1 Z'

export default function Sparkle({ className = '', color = 'var(--gold)', style }) {
  return (
    <DoodleSvg viewBox="0 0 20 20" className={className} boil={false} style={style}>
      <path className="twinkle" fill={color} stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round" d={SPARKLE} />
    </DoodleSvg>
  )
}
