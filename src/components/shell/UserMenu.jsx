import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from '../icons/Icon'
import RoughCircle from '../sketch/RoughCircle'
import SketchBox from '../sketch/SketchBox'
import { useDismiss } from '../../hooks/useDismiss'
import { assetUrl } from '../../lib/assets'
import './UserMenu.css'

export default function UserMenu({ me, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-menu__button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${me.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="user-menu__avatar">
          {me.avatar_url
            ? <img src={assetUrl(me.avatar_url)} alt="" />
            : <span className="user-menu__initial">{me.name.charAt(0)}</span>}
          <RoughCircle size={44} seed={88} strokeWidth={2} roughness={1.2} />
        </span>
        <motion.span className="user-menu__chevron" animate={{ rotate: open ? 180 : 0 }}>
          <Icon name="chevronDown" size={16} strokeWidth={2.4} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="user-menu__panel"
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0.6 }}
            exit={{ opacity: 0, y: -6, scale: 0.96, transition: { duration: 0.14 } }}
            transition={{ type: 'spring', stiffness: 480, damping: 30 }}
          >
            <SketchBox className="user-menu__card" seed={77}>
              <p className="user-menu__name">{me.name}</p>
              <p className="user-menu__meta">
                {me.is_admin ? 'Head elf' : 'Elf'} · signed in with your PIN
              </p>
              <button type="button" role="menuitem" className="user-menu__item" onClick={onSignOut}>
                <Icon name="logout" size={18} />
                Sign out
              </button>
            </SketchBox>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
