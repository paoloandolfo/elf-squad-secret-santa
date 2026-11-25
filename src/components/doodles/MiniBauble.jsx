import DoodleSvg from './DoodleSvg'

export default function MiniBauble({ className = '', color = 'var(--gold)' }) {
  return (
    <DoodleSvg viewBox="0 0 24 30" className={className} boil={false}>
      <path className="ink-thin" d="M12 6 C9 6 9 1.5 12 1.5 C15 1.5 15 6 12 6" />
      <path d="M8 7 L16 7 L16.5 11 L7.5 11 Z" fill="var(--gold-soft)" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="12" cy="19" r="9" fill={color} stroke="var(--ink)" strokeWidth="1.6" />
      <path d="M7 17 C7.5 14.5 9 13 11 12.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </DoodleSvg>
  )
}
