'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import PresentExploration from './PresentExploration'
import PastExploration from './PastExploration'
import FutureExploration from './FutureExploration'
import LLMChatInterface from './LLMChatInterface'
import { TherapyProvider, useTherapy } from '@/contexts/TherapyContext'
import { theme } from '@/styles/theme'

function ExploreTabContent() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { shouldInitiateChat, resetExploration, setShouldInitiateChat, setExplorationData } = useTherapy()

  const handleTabChange = () => {
    resetExploration()
    setIsChatOpen(false)
  }

  const handleExploreClick = (startingPoint: string, formData: Record<string, string>) => {
    setExplorationData({
      startingPoint,
      ...formData
    })
    setShouldInitiateChat(true)
    setIsChatOpen(true)
  }

  return (
    <div className="space-y-4 max-w-full">
      <Card className="bg-white shadow-lg">
        <CardHeader className="space-y-2 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl break-words" 
            style={{ 
              color: theme.colors.primary, 
              fontFamily: theme.fonts.heading 
            }}>
            Explore Your Journey
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm md:text-base break-words" 
            style={{ 
              color: theme.colors.text 
            }}>
            Discover insights about your past, present, and future
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="present" onValueChange={handleTabChange}>
            <TabsList className="mb-4 w-full justify-start overflow-x-auto" 
              style={{ backgroundColor: theme.colors.gray }}>
              <TabsTrigger value="present" className="text-xs sm:text-sm flex-1">Present</TabsTrigger>
              <TabsTrigger value="past" className="text-xs sm:text-sm flex-1">Past</TabsTrigger>
              <TabsTrigger value="future" className="text-xs sm:text-sm flex-1">Future</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent key="present" value="present" className="mt-2">
                <PresentExploration handleExploreClick={handleExploreClick} />
              </TabsContent>
              <TabsContent key="past" value="past" className="mt-2">
                <PastExploration handleExploreClick={handleExploreClick} />
              </TabsContent>
              <TabsContent key="future" value="future" className="mt-2">
                <FutureExploration handleExploreClick={handleExploreClick} />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
          {(shouldInitiateChat || isChatOpen) && (
            <div className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 break-words" 
                style={{ color: theme.colors.primary }}>
                AI Therapist Chat
              </h3>
              <LLMChatInterface onClose={() => setIsChatOpen(false)} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ExploreTab() {
  return (
    <TherapyProvider>
      <ExploreTabContent />
    </TherapyProvider>
  )
}

