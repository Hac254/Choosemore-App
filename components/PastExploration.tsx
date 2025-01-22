'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { theme } from '@/styles/theme'

interface PastExplorationProps {
  handleExploreClick: (startingPoint: string, formData: Record<string, string>) => void
}

export default function PastExploration({ handleExploreClick }: PastExplorationProps) {
  const [selectedStartingPoint, setSelectedStartingPoint] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const renderExplorationForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {selectedStartingPoint === "Events that changed me" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="event" className="text-lg font-semibold">What was the event?</Label>
            <Textarea 
              id="event"
              placeholder="Describe the event that changed you"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('event', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="impact" className="text-lg font-semibold">How did it change you?</Label>
            <Textarea 
              id="impact"
              placeholder="Describe the impact this event had on you"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('impact', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "People that influenced me" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="person" className="text-lg font-semibold">Who influenced you?</Label>
            <Input 
              id="person"
              placeholder="Name of the person"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('person', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="influence" className="text-lg font-semibold">How did they influence you?</Label>
            <Textarea 
              id="influence"
              placeholder="Describe their influence on you"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('influence', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Thoughts, feelings and behaviours that I use to have" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="pastThoughts" className="text-lg font-semibold">What were they?</Label>
            <Textarea 
              id="pastThoughts"
              placeholder="Describe your past thoughts, feelings, or behaviors"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('pastThoughts', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reasonForChange" className="text-lg font-semibold">What led to the change?</Label>
            <Textarea 
              id="reasonForChange"
              placeholder="What caused these to change?"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('reasonForChange', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Things that I used to believe" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="pastBelief" className="text-lg font-semibold">What did you use to believe?</Label>
            <Textarea 
              id="pastBelief"
              placeholder="Describe your past beliefs"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('pastBelief', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beliefChange" className="text-lg font-semibold">What changed your belief?</Label>
            <Textarea 
              id="beliefChange"
              placeholder="What made you change this belief?"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('beliefChange', e.target.value)}
            />
          </div>
        </>
      )}

      <Button 
        className="w-full text-lg font-semibold"
        style={{ backgroundColor: theme.colors.accent, color: theme.colors.white }}
        onClick={() => handleExploreClick(selectedStartingPoint || '', formData)}
      >
        Explore with AI Therapist
      </Button>
    </motion.div>
  )

  return (
    <>
      {!selectedStartingPoint ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h3 className="text-xl font-semibold mb-4">Choose a starting point:</h3>
          <div className="space-y-2">
            {[
              { emoji: "🌟", text: "Events that changed me" },
              { emoji: "👥", text: "People that influenced me" },
              { emoji: "💭", text: "Thoughts, feelings and behaviours that I use to have" },
              { emoji: "🧭", text: "Things that I used to believe" }
            ].map((item, index) => (
              <Button 
                key={`past-${index}-${item.text}`}
                variant="outline" 
                className="w-full justify-start text-lg"
                onClick={() => setSelectedStartingPoint(item.text)}
              >
                <span className="mr-2">{item.emoji}</span> {item.text}
              </Button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedStartingPoint(null)}
              className="mr-2"
            >
              ←
            </Button>
            <h3 className="text-xl font-semibold">Tell me more...</h3>
          </div>
          {renderExplorationForm()}
        </motion.div>
      )}
    </>
  )
}

