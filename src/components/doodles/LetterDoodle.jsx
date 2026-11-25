import DoodleSvg from './DoodleSvg'
import './LetterDoodle.css'

const SPARKLE = 'M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9 Z'

export default function LetterDoodle({ className = '' }) {
  return (
    <DoodleSvg viewBox="0 0 220 175" className={`letter-doodle ${className}`}>
      <ellipse cx="112" cy="162" rx="90" ry="7" className="letter-doodle__shadow" />

      <g transform="translate(4 3)">
        <path className="wash" fill="var(--berry-deep)" d="M30 76 L110 40 L190 72 L192 150 L28 152 Z" />
      </g>
      <g className="ink-layer">
        <path className="ink" d="M30 76 C58 62 84 50 110 40 C138 50 164 61 190 72 C191 98 191.6 124 192 150 C138 151 84 151.6 28 152 C28.6 126 29.3 101 30 76 Z" />
      </g>

      <g className="letter-doodle__paper">
        <path className="letter-doodle__sheet" d="M58 22 C92 20.5 130 19 166 18 C167.5 52 168.8 86 170 120 C131 121 93 121.6 54 122 C55.5 88 56.8 55 58 22 Z" />
        <text x="72" y="38" className="letter-doodle__dear">Dear Santa,</text>
        <path className="ink-thin" d="M72 52 C98 51.2 124 50.6 150 50" />
        <path className="ink-thin" d="M72 65 C96 64.4 118 64 140 63.6" />
        <path className="ink-thin letter-doodle__heart" d="M146 66 C143 63.6 141.6 62 141.6 60.6 C141.6 59.4 142.6 58.6 143.6 58.6 C144.4 58.6 145.4 59.2 146 60 C146.6 59.2 147.6 58.6 148.4 58.6 C149.4 58.6 150.4 59.4 150.4 60.6 C150.4 62 149 63.6 146 66 Z" />
      </g>

      <g transform="translate(4 3)">
        <path className="wash" fill="var(--berry)" d="M29 78 L110 112 L191 74 L192 150 L28 152 Z" />
      </g>
      <g className="ink-layer">
        <path className="ink" d="M29 78 C58 90 84 102 110 112 C138 100 164 87 191 74 C191.4 100 191.8 125 192 150 C138 151 84 151.6 28 152 C28.4 128 28.7 103 29 78 Z" />
        <path className="ink-thin" d="M30 150 C52 136 72 125 92 119" />
        <path className="ink-thin" d="M190 148 C170 135 150 125 129 119" />
      </g>

      <circle cx="110" cy="114" r="11.5" fill="var(--gold)" stroke="var(--ink)" strokeWidth="2.2" />
      <path
        d="M110 120 C106 117 104 114.6 104 112.6 C104 110.8 105.4 109.6 107 109.6 C108.2 109.6 109.4 110.4 110 111.6 C110.6 110.4 111.8 109.6 113 109.6 C114.6 109.6 116 110.8 116 112.6 C116 114.6 114 117 110 120 Z"
        fill="var(--berry)"
      />

      <g transform="translate(126 166) rotate(-17)">
        <path className="wash" fill="var(--gold)" d="M0 0 L62 0 L62 12 L0 12 Z" transform="translate(2 2)" />
        <path fill="var(--skin)" d="M62 0 L76 6 L62 12 Z" />
        <path fill="#f2a3a3" d="M0 0 C-5 0 -7 2 -7 6 C-7 10 -5 12 0 12 Z" />
        <g className="ink-layer">
          <path className="ink" d="M0 0 C20 -0.4 42 -0.3 62 0 L62 12 C42 12.3 20 12.4 0 12 Z" />
          <path className="ink" d="M62 0 L76 6 L62 12" />
          <path className="ink-thin" d="M70.5 3.6 L76 6 L70.5 8.4 Z" />
          <path className="ink-thin" d="M4 6 C24 5.8 42 5.8 60 6" />
          <path className="ink" d="M0 0 C-5 0 -7 2 -7 6 C-7 10 -5 12 0 12" />
        </g>
      </g>

      <path className="twinkle" transform="translate(30 32)" d={SPARKLE} fill="var(--gold)" stroke="var(--ink)" strokeWidth="1.6" strokeLinejoin="round" />
      <path className="twinkle" style={{ animationDelay: '0.9s' }} transform="translate(196 40) scale(0.7)" d={SPARKLE} fill="var(--ice)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
    </DoodleSvg>
  )
}
