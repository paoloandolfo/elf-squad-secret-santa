import GiftBox from '../doodles/GiftBox'
import './Brand.css'

export default function Brand({ href = '#/mission' }) {
  return (
    <a className="brand" href={href} aria-label="Secret Santa 2026, go to my mission">
      <span className="brand__mark"><GiftBox boil={false} /></span>
      <span className="brand__name">Secret Santa</span>
      <span className="brand__year">2026</span>
    </a>
  )
}
