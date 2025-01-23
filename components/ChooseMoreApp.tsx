'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SplashScreen from './SplashScreen'
import ExploreTab from './ExploreTab'
import MapTab from './MapTab'
import ToolsTab from './tools/ToolsTab'
import { theme } from '@/styles/theme'

export default function ChooseMoreApp() {
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen text-text p-4" style={{ fontFamily: theme.fonts.body }}>
      <h1 className="text-3xl font-bold text-primary mb-6 text-center" style={{ fontFamily: theme.fonts.heading }}>ChooseMore</h1>
      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8" style={{ backgroundColor: theme.colors.primary }}>
          <TabsTrigger 
            value="explore" 
            className="text-base font-semibold data-[state=active]:bg-accent data-[state=active]:text-text text-white" 
          >
            Explore
          </TabsTrigger>
          <TabsTrigger 
            value="map" 
            className="text-base font-semibold data-[state=active]:bg-accent data-[state=active]:text-text text-white" 
          >
            Map
          </TabsTrigger>
          <TabsTrigger 
            value="tools" 
            className="text-base font-semibold data-[state=active]:bg-accent data-[state=active]:text-text text-white" 
          >
            Tools
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <TabsContent value="explore">
            <ExploreTab />
          </TabsContent>
          <TabsContent value="map">
            <MapTab />
          </TabsContent>
          <TabsContent value="tools">
            <ToolsTab />
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

