import PageHeader from '../components/shell/PageHeader'
import Highlight from '../components/sketch/Highlight'
import SketchBox from '../components/sketch/SketchBox'
import Chip from '../components/common/Chip'
import Loader from '../components/common/Loader'
import HqStats from '../components/admin/HqStats'
import DrawControls from '../components/admin/DrawControls'
import EventSettings from '../components/admin/EventSettings'
import MemberManager from '../components/admin/MemberManager'
import AccessCodeSettings from '../components/admin/AccessCodeSettings'
import KeepApart from '../components/admin/KeepApart'
import '../components/admin/AdminSection.css'
import './HqPage.css'

export default function HqPage({ session, roster, onRosterChange }) {
  if (!roster) return <Loader />
  const { token, refresh } = session

  return (
    <section className="hq-page">
      <PageHeader
        kicker="Head elf only"
        title={<>Elf <Highlight>HQ</Highlight></>}
        subtitle="Run the draw, tweak the details and look after the crew."
        aside={<Chip icon="hat" tone="berry">Admin</Chip>}
      />

      <HqStats event={roster.event} members={roster.members} />

      <div className="hq-page__grid">
        <SketchBox className="hq-page__card" fill="#fff6df" seed={4242}>
          <DrawControls token={token} roster={roster} onRosterChange={onRosterChange} onDrawChanged={refresh} />
        </SketchBox>
        <SketchBox className="hq-page__card" seed={4245}>
          <AccessCodeSettings token={token} code={session.data.access_code} onSaved={refresh} />
        </SketchBox>
        <SketchBox className="hq-page__card hq-page__card--wide" seed={4246}>
          <KeepApart token={token} roster={roster} onRosterChange={onRosterChange} />
        </SketchBox>
        <SketchBox className="hq-page__card hq-page__card--wide" seed={4243}>
          <EventSettings token={token} event={roster.event} onRosterChange={onRosterChange} />
        </SketchBox>
        <SketchBox className="hq-page__card hq-page__card--wide" seed={4244}>
          <MemberManager token={token} members={roster.members} onRosterChange={onRosterChange} />
        </SketchBox>
      </div>
    </section>
  )
}
