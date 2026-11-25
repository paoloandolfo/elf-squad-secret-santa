import PageHeader from '../components/shell/PageHeader'
import MissionCard from '../components/home/MissionCard'
import MissionFacts from '../components/mission/MissionFacts'
import MissionChecklist from '../components/mission/MissionChecklist'
import { missionView } from '../components/mission/missionView'
import { missionCopy } from '../components/mission/missionCopy'
import { missionSteps } from '../components/mission/missionSteps'
import './MissionPage.css'

export default function MissionPage({ session, roster, details, reveal, navigate }) {
  const { me, event, wishes, target } = session.data
  const copy = missionCopy(missionView(event, target, reveal.revealed), me, target)
  const steps = missionSteps({ event, details, wishes, roster, target, revealed: reveal.revealed })

  return (
    <section className="mission-page">
      <PageHeader kicker={copy.kicker} title={copy.title} subtitle={copy.subtitle} />
      <div className="mission-page__grid">
        <MissionCard event={event} target={target} roster={roster} reveal={reveal} />
        <aside className="mission-page__side">
          <MissionFacts details={details} />
          <MissionChecklist steps={steps} onNavigate={navigate} />
        </aside>
      </div>
    </section>
  )
}
