import { useCallback, useMemo } from 'react'
import { AnimatePresence } from 'motion/react'
import TopBar from './TopBar'
import BottomNav from './BottomNav'
import PageTransition from './PageTransition'
import Onboarding from '../onboarding/Onboarding'
import { PAGES } from '../../pages'
import { resolveTab, tabsFor } from './tabs'
import { tabBadges } from './tabBadges'
import { useHashRoute } from '../../hooks/useHashRoute'
import { useReveal } from '../../hooks/useReveal'
import { useTabDirection } from '../../hooks/useTabDirection'
import { firstName } from '../../lib/names'
import './AppShell.css'

export default function AppShell({ session, roster, onRosterChange, onSignOut, onboarding, onOnboarded }) {
  const { me, event, wishes, target } = session.data
  const details = roster?.event ?? event
  const tabs = useMemo(() => tabsFor(me), [me])
  const [route, navigate] = useHashRoute()
  const active = resolveTab(route, tabs)
  const direction = useTabDirection(active, tabs)
  const reveal = useReveal(me.id, event.drawn_at)
  const badges = tabBadges({ wishes, event, target, revealed: reveal.revealed })
  const Page = PAGES[active]

  const finishOnboarding = useCallback((tab) => {
    onOnboarded()
    navigate(tab)
  }, [onOnboarded, navigate])

  const joinedNames = (roster?.members ?? []).filter((m) => m.joined).map((m) => firstName(m.name))

  return (
    <>
      <TopBar tabs={tabs} active={active} badges={badges} me={me} event={details} onSignOut={onSignOut} />

      <main className="shell__main">
        <AnimatePresence mode="wait" custom={direction} onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={active} direction={direction}>
            <Page
              session={session}
              roster={roster}
              details={details}
              reveal={reveal}
              navigate={navigate}
              onRosterChange={onRosterChange}
            />
          </PageTransition>
        </AnimatePresence>
      </main>

      <BottomNav tabs={tabs} active={active} badges={badges} />

      <AnimatePresence>
        {onboarding && <Onboarding key="onboarding" me={me} names={joinedNames} onDone={finishOnboarding} />}
      </AnimatePresence>
    </>
  )
}
