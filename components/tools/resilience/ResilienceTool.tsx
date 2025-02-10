'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { theme } from '@/styles/theme'
import WellnessSchedule from './WellnessSchedule'
import WellnessChecks from './WellnessChecks'
import AnticipatedEvents from './AnticipatedEvents'

interface ResilienceToolProps {
  onBack: () => void
}

export default function ResilienceTool({ onBack }: ResilienceToolProps) {
  const [activeTab, setActiveTab] = useState('schedule')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">← Back to Tools</Button>
        <h2 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>Resilience Tool</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <Button 
          onClick={() => setActiveTab('schedule')} 
          variant={activeTab === 'schedule' ? 'default' : 'outline'}
          className="w-full sm:w-auto"
        >
          Wellness Schedule
        </Button>
        <Button 
          onClick={() => setActiveTab('checks')} 
          variant={activeTab === 'checks' ? 'default' : 'outline'}
          className="w-full sm:w-auto"
        >
          Wellness Checks
        </Button>
        <Button 
          onClick={() => setActiveTab('events')} 
          variant={activeTab === 'events' ? 'default' : 'outline'}
          className="w-full sm:w-auto"
        >
          Anticipated Events
        </Button>
      </div>

      {activeTab === 'schedule' && <WellnessSchedule />}
      {activeTab === 'checks' && <WellnessChecks />}
      {activeTab === 'events' && <AnticipatedEvents />}
    </div>
  )
}

