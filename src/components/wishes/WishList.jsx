import { motion } from 'motion/react'
import NotebookPage from './NotebookPage'
import WishLine from './WishLine'

export default function WishList({ title, wishes, emptyText }) {
  return (
    <NotebookPage title={title}>
      {wishes.length > 0 ? (
        <motion.ul
          style={{ listStyle: 'none' }}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { delayChildren: 0.4, staggerChildren: 0.12 } } }}
        >
          {wishes.map((wish, i) => (
            <motion.li
              key={wish.id}
              variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
            >
              <WishLine wish={wish} index={i} />
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="notebook__empty">{emptyText}</p>
      )}
    </NotebookPage>
  )
}
