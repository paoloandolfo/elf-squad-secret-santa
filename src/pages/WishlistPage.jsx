import PageHeader from '../components/shell/PageHeader'
import Highlight from '../components/sketch/Highlight'
import Chip from '../components/common/Chip'
import WishEditor from '../components/wishes/WishEditor'
import WishTips from '../components/wishes/WishTips'
import './WishlistPage.css'

export default function WishlistPage({ session, details }) {
  return (
    <section className="wishlist-page">
      <PageHeader
        kicker="Psst, help your Santa out"
        title={<>My <Highlight>wishlist</Highlight></>}
        subtitle="A few good hints go a long way. Your Santa will thank you (secretly)."
        aside={<Chip icon="lock" tone="pine">Only your Santa sees this</Chip>}
      />
      <div className="wishlist-page__grid">
        <WishEditor token={session.token} wishes={session.data.wishes} onChange={session.setWishes} />
        <WishTips budget={details.budget} />
      </div>
    </section>
  )
}
