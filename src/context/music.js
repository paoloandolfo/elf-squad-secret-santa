import { createContext, useContext } from 'react'

export const MusicContext = createContext({ enabled: false, playing: false, supported: false, toggle: () => {} })

export const useMusic = () => useContext(MusicContext)
