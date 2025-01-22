'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TherapyContextType {
  explorationData: Record<string, string>
  setExplorationData: (data: Record<string, string>) => void
  shouldInitiateChat: boolean
  setShouldInitiateChat: (value: boolean) => void
  isChatOpen: boolean
  setIsChatOpen: (value: boolean) => void
  resetExploration: () => void
}

const TherapyContext = createContext<TherapyContextType | undefined>(undefined)

export function TherapyProvider({ children }: { children: ReactNode }) {
  const [explorationData, setExplorationData] = useState<Record<string, string>>({})
  const [shouldInitiateChat, setShouldInitiateChat] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const resetExploration = () => {
    setExplorationData({})
    setShouldInitiateChat(false)
    setIsChatOpen(false)
  }

  return (
    <TherapyContext.Provider value={{
      explorationData,
      setExplorationData,
      shouldInitiateChat,
      setShouldInitiateChat,
      isChatOpen,
      setIsChatOpen,
      resetExploration
    }}>
      {children}
    </TherapyContext.Provider>
  )
}

export function useTherapy() {
  const context = useContext(TherapyContext)
  if (context === undefined) {
    throw new Error('useTherapy must be used within a TherapyProvider')
  }
  return context
}

