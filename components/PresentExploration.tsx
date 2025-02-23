'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { theme } from '@/styles/theme'

interface PresentExplorationProps {
  handleExploreClick: (startingPoint: string, formData: Record<string, string>) => void
}

export default function PresentExploration({ handleExploreClick }: PresentExplorationProps) {
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
      {selectedStartingPoint === "Recent interaction I had" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="person" className="text-lg font-semibold">Who was it with?</Label>
            <Input 
              id="person"
              placeholder="Type name of person"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('person', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-semibold">What happened?</Label>
            <Textarea 
              id="description"
              placeholder="Describe what happened"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Thoughts, feelings and behaviours I've noticed" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="noticed" className="text-lg font-semibold">What have you noticed?</Label>
            <Textarea 
              id="noticed"
              placeholder="Describe the thoughts, feelings, or behaviors you've noticed"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('noticed', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whenNoticed" className="text-lg font-semibold">When do you notice this most?</Label>
            <Input 
              id="whenNoticed"
              placeholder="Type here"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('whenNoticed', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Things that are going on for me at the moment" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="currentSituation" className="text-lg font-semibold">What&apos;s currently happening in your life?</Label>
            <Textarea 
              id="currentSituation"
              placeholder="Describe the current situations or circumstances"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('currentSituation', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="effect" className="text-lg font-semibold">How is this affecting you?</Label>
            <Input 
              id="effect"
              placeholder="Type here"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('effect', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Things I've learnt about myself" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="selfDiscovery" className="text-lg font-semibold">What have you learned about yourself?</Label>
            <Textarea 
              id="selfDiscovery"
              placeholder="Share your self-discoveries"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('selfDiscovery', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insightSource" className="text-lg font-semibold">What led to this insight?</Label>
            <Input 
              id="insightSource"
              placeholder="Type here"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('insightSource', e.target.value)}
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
              { emoji: "🗣️", text: "Recent interaction I had" },
              { emoji: "🧠", text: "Thoughts, feelings and behaviours I've noticed" },
              { emoji: "📅", text: "Things that are going on for me at the moment" },
              { emoji: "🔍", text: "Things I've learnt about myself" }
            ].map((item, index) => (
              <Button 
                key={`present-${index}-${item.text}`}
                variant="outline" 
                className="w-full justify-start text-sm sm:text-base md:text-lg p-3 min-h-[3rem] flex items-center"
                onClick={() => setSelectedStartingPoint(item.text)}
              >
                <span className="mr-2 text-lg sm:text-xl">{item.emoji}</span>
                <span className="line-clamp-2 text-left">{item.text}</span>
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

