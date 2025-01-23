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
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading, fontSize: theme.fontSizes.xl }}>
            Explore Your Journey
          </CardTitle>
          <CardDescription style={{ color: theme.colors.text, fontSize: theme.fontSizes.sm }}>
            Discover insights about your past, present, and future
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="present" onValueChange={handleTabChange}>
            <TabsList className="mb-4" style={{ backgroundColor: theme.colors.gray }}>
              <TabsTrigger value="present" className="text-sm">Present</TabsTrigger>
              <TabsTrigger value="past" className="text-sm">Past</TabsTrigger>
              <TabsTrigger value="future" className="text-sm">Future</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent key="present" value="present">
                <PresentExploration handleExploreClick={handleExploreClick} />
              </TabsContent>
              <TabsContent key="past" value="past">
                <PastExploration handleExploreClick={handleExploreClick} />
              </TabsContent>
              <TabsContent key="future" value="future">
                <FutureExploration handleExploreClick={handleExploreClick} />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
          {(shouldInitiateChat || isChatOpen) && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.primary }}>AI Therapist Chat</h3>
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

