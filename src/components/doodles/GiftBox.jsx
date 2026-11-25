import DoodleSvg from './DoodleSvg'
import './GiftBox.css'

export default function GiftBox({ className = '', boil = true }) {
  return (
    <DoodleSvg viewBox="0 0 220 220" className={`gift-box ${className}`} boil={boil}>
      <ellipse cx="111" cy="204" rx="84" ry="8" className="gift-box__shadow" />

      <g className="gift-body">
        <g transform="translate(4 3)">
          <path className="wash" fill="var(--berry)" d="M42 102 L181 99 L183 193 L40 196 Z" />
          <path className="wash" fill="var(--gold)" d="M99 101 L123 100 L124 194 L97 195 Z" />
        </g>
        <g className="gift-box__dots">
          <circle cx="62" cy="128" r="4" />
          <circle cx="155" cy="122" r="3.5" />
          <circle cx="72" cy="172" r="3" />
          <circle cx="160" cy="168" r="4" />
          <circle cx="143" cy="147" r="2.5" />
          <circle cx="56" cy="152" r="2.5" />
        </g>
        <g className="ink-layer">
          <path className="ink" d="M42 102 C82 100 140 99 181 98.5 C182 130 182.5 160 183.5 193 C140 194.5 90 195.5 40 196.5 C41 165 41.5 133 42 102 Z" />
          <path className="ink" d="M99 101.5 C98.5 132 98 164 97 195.5" />
          <path className="ink" d="M123 100.5 C123.5 131 124 162 124.5 194.5" />
          <path className="ink-thin" d="M150 180 l6 -6 M158 182 l6 -6 M166 184 l6 -6" />
        </g>
      </g>

      <g className="gift-lid">
        <g transform="translate(4 3)">
          <path className="wash" fill="var(--berry-deep)" d="M28 76 L193 72 L195 104 L27 107 Z" />
          <path className="wash" fill="var(--gold)" d="M97 75 L125 74 L126 105 L96 106 Z" />
          <path className="wash" fill="var(--gold)" d="M111 72 C92 42 64 44 70 62 C75 73 96 74 111 72 Z" />
          <path className="wash" fill="var(--gold)" d="M111 72 C130 42 158 44 152 62 C147 73 126 74 111 72 Z" />
        </g>
        <g className="ink-layer">
          <path className="ink" d="M28 76.5 C80 74 150 72.5 193 72 C194 82 194.5 93 195.5 104 C150 105.5 80 106.5 26.5 107.5 C27 97 27.5 86 28 76.5 Z" />
          <path className="ink" d="M97 75.5 C96.8 86 96.4 96 96 106" />
          <path className="ink" d="M125 74.5 C125.3 85 125.6 95 126 105" />
          <path className="ink" d="M111 72 C92 41 63 43 70 62 C75 73.5 96 74.5 111 72" />
          <path className="ink" d="M111 72 C130 41 159 43 152 62 C147 73.5 126 74.5 111 72" />
          <path className="ink-thin" d="M82 55 C91 60 100 66 107 70" />
          <path className="ink-thin" d="M140 55 C131 60 122 66 115 70" />
          <ellipse className="ink gift-box__knot" cx="111" cy="71" rx="8.5" ry="7" />
        </g>
      </g>
    </DoodleSvg>
  )
}
