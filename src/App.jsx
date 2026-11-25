import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import SketchFilters from './components/sketch/SketchFilters'
import Scene from './components/scene/Scene'
import Screen from './components/common/Screen'
import Loader from './components/common/Loader'
import ErrorNote from './components/common/ErrorNote'
import ToastProvider from './components/common/ToastProvider'
import ConfirmProvider from './components/common/ConfirmProvider'
import MusicToggle from './components/music/MusicToggle'
import RosterScreen from './components/roster/RosterScreen'
import PinScreen from './components/pin/PinScreen'
import AppShell from './components/shell/AppShell'
import AccessGate from './components/gate/AccessGate'
import { useRoster } from './hooks/useRoster'
import { useSession } from './hooks/useSession'
import { isCodeError } from './lib/accessCode'
import { EVENT_SLUG } from './config'
import './App.css'

function pickScreen({ session, roster, rosterError, picked }) {
  if (isCodeError(rosterError)) return 'gate'
  if (session.data) return 'home'
  if (session.loading) return 'loading'
  if (picked) return 'pin'
  if (roster) return 'roster'
  if (rosterError) return 'error'
  return 'loading'
}

export default function App() {
  const { roster, error: rosterError, reload, setRoster } = useRoster(EVENT_SLUG)
  const session = useSession()
  const [picked, setPicked] = useState(null)
  const [onboarding, setOnboarding] = useState(false)
  const screen = pickScreen({ session, roster, rosterError, picked })

  const handleSignedIn = useCallback((token, created) => {
    session.signIn(token)
    setPicked(null)
    setOnboarding(Boolean(created))
    reload()
  }, [session, reload])

  const handleOnboarded = useCallback(() => setOnboarding(false), [])

  const handleSignOut = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    session.signOut()
    reload()
  }, [session, reload])

  const handleBack = useCallback(() => setPicked(null), [])

  return (
    <ToastProvider>
      <ConfirmProvider>
        <SketchFilters />
        <div className={`app ${screen === 'home' ? 'app--shell' : ''}`}>
          <Scene quiet={screen === 'roster'} />
          {screen !== 'home' && <MusicToggle className="music-toggle--floating" />}
          {screen === 'home' ? (
            <AppShell
              session={session}
              roster={roster}
              onRosterChange={setRoster}
              onSignOut={handleSignOut}
              onboarding={onboarding}
              onOnboarded={handleOnboarded}
            />
          ) : (
            <main className={`app__main app__main--${screen}`}>
              <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                {screen === 'loading' && <Screen key="loading"><Loader /></Screen>}
                {screen === 'gate' && <Screen key="gate"><AccessGate onUnlocked={reload} /></Screen>}
                {screen === 'error' && <Screen key="error"><ErrorNote error={rosterError} onRetry={reload} /></Screen>}
                {screen === 'roster' && <Screen key="roster" className="screen--top"><RosterScreen roster={roster} onPick={setPicked} /></Screen>}
                {screen === 'pin' && (
                  <Screen key="pin">
                    <PinScreen member={picked} onBack={handleBack} onSignedIn={handleSignedIn} />
                  </Screen>
                )}
              </AnimatePresence>
            </main>
          )}
          <footer className="app__footer">made with 🎄 and too much hot chocolate</footer>
        </div>
      </ConfirmProvider>
    </ToastProvider>
  )
}
