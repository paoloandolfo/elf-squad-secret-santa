import DoodleSvg from '../doodles/DoodleSvg'

const BODY = 'M9 13 C16 11.5 24 11.5 31 13 L33.5 29 C25 32.5 15 32.5 6.5 29 Z'

export default function BaubleCap({ className = '' }) {
  return (
    <DoodleSvg viewBox="0 0 40 34" className={className} boil={false}>
      <path className="ink-thin" d="M20 11 C14.5 11 14.5 2.5 20 2.5 C25.5 2.5 25.5 11 20 11" />
      <path className="bauble-cap__metal" d={BODY} />
      <path className="ink-thin bauble-cap__ridges" d="M14 14.5 L13 30 M20 13.5 L20 31 M26 14.5 L27 30" />
      <path className="ink-thin" d={BODY} />
    </DoodleSvg>
  )
}
