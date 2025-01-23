'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { theme } from '@/styles/theme'

interface FutureExplorationProps {
  handleExploreClick: (startingPoint: string, formData: Record<string, string>) => void
}

export default function FutureExploration({ handleExploreClick }: FutureExplorationProps) {
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
      {selectedStartingPoint === "Things I'm excited about" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="excitement" className="text-lg font-semibold">What are you excited about?</Label>
            <Textarea 
              id="excitement"
              placeholder="Describe what you're looking forward to"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('excitement', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excitementReason" className="text-lg font-semibold">Why is this exciting for you?</Label>
            <Textarea 
              id="excitementReason"
              placeholder="What makes this exciting?"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('excitementReason', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Worries about what will happen" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="worries" className="text-lg font-semibold">What are you worried about?</Label>
            <Textarea 
              id="worries"
              placeholder="Describe your worries about the future"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('worries', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="worryCauses" className="text-lg font-semibold">What makes you worried about this?</Label>
            <Textarea 
              id="worryCauses"
              placeholder="What's causing these worries?"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('worryCauses', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Thoughts, feelings and behaviours I want to change" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="desiredChange" className="text-lg font-semibold">What would you like to change?</Label>
            <Textarea 
              id="desiredChange"
              placeholder="Describe what you want to change"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('desiredChange', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="changeMotivation" className="text-lg font-semibold">Why do you want to change this?</Label>
            <Textarea 
              id="changeMotivation"
              placeholder="What's motivating this change?"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('changeMotivation', e.target.value)}
            />
          </div>
        </>
      )}
      {selectedStartingPoint === "Situations I want to change" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="situationToChange" className="text-lg font-semibold">What situation would you like to change?</Label>
            <Textarea 
              id="situationToChange"
              placeholder="Describe the situation you want to change"
              className="min-h-[150px] text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('situationToChange', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desiredOutcome" className="text-lg font-semibold">How would you like it to be different?</Label>
            <Textarea 
              id="desiredOutcome"
              placeholder="Describe your desired outcome"
              className="text-base"
              style={{ backgroundColor: theme.colors.gray, color: theme.colors.text }}
              onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
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
              { emoji: "🎉", text: "Things I'm excited about" },
              { emoji: "😰", text: "Worries about what will happen" },
              { emoji: "🔄", text: "Thoughts, feelings and behaviours I want to change" },
              { emoji: "🔀", text: "Situations I want to change" }
            ].map((item, index) => (
              <Button 
                key={`future-${index}-${item.text}`}
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

