import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App.jsx'
import MusicProvider from './components/music/MusicProvider'
import { captureCodeFromUrl } from './lib/accessCode'
import './styles/tokens.css'
import './styles/base.css'

captureCodeFromUrl()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <MusicProvider>
        <App />
      </MusicProvider>
    </MotionConfig>
  </StrictMode>,
)
