import Sparkle from '../doodles/Sparkle'
import './WishLine.css'

const BULLET_COLORS = ['var(--berry)', 'var(--gold)', 'var(--pine-soft)', 'var(--ice)']

export default function WishLine({ wish, index }) {
  return (
    <span className="wish-line">
      <Sparkle className="wish-line__bullet" color={BULLET_COLORS[index % BULLET_COLORS.length]} />
      <span className="wish-line__text">
        {wish.body}
        {wish.link && (
          <>
            {' '}
            <a className="wish-line__link" href={wish.link} target="_blank" rel="noreferrer noopener">
              link ↗
            </a>
          </>
        )}
      </span>
    </span>
  )
}
