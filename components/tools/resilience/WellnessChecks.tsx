'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { WellnessCheck, WellnessReflection } from './types'
import { Card } from '@/components/ui/card'

const defaultSigns: WellnessCheck[] = [
  { id: '1', sign: "I've stopped seeing friends as much", selected: false },
  { id: '2', sign: "I've started to have thoughts that I would be better off dead", selected: false },
  { id: '3', sign: "I've experienced more frequent low mood", selected: false },
  { id: '4', sign: "I've been getting irritable more easily", selected: false }
]

export default function WellnessChecks() {
  const [signs, setSigns] = useState<WellnessCheck[]>(defaultSigns)
  const [newSign, setNewSign] = useState('')
  const [reflection, setReflection] = useState<WellnessReflection>({
    action: '',
    importance: '',
    capability: ''
  })
  const [showReflection, setShowReflection] = useState(false)

  const handleAddSign = () => {
    if (newSign.trim()) {
      setSigns(prev => [...prev, { id: Date.now().toString(), sign: newSign, selected: false }])
      setNewSign('')
    }
  }

  const handleToggleSign = (id: string) => {
    setSigns(prev => prev.map(sign => 
      sign.id === id ? { ...sign, selected: !sign.selected } : sign
    ))
  }

  const handleSubmitReflection = () => {
    console.log('Reflection submitted:', reflection)
    // Here you would typically save the reflection
    setShowReflection(false)
    // Reset signs and reflection
    setSigns(prev => prev.map(sign => ({ ...sign, selected: false })))
    setReflection({ action: '', importance: '', capability: '' })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Wellness Checks</h3>
      
      {!showReflection ? (
        <>
          <div className="space-y-2">
            {signs.map((sign) => (
              <div key={sign.id} className="flex items-center space-x-2">
                <Checkbox
                  id={sign.id}
                  checked={sign.selected}
                  onCheckedChange={() => handleToggleSign(sign.id)}
                />
                <Label htmlFor={sign.id}>{sign.sign}</Label>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={newSign}
              onChange={(e) => setNewSign(e.target.value)}
              placeholder="Add new sign"
            />
            <Button onClick={handleAddSign}>Add</Button>
          </div>

          <Button 
            onClick={() => setShowReflection(true)}
            className="w-full mt-4"
            disabled={!signs.some(sign => sign.selected)}
          >
            Reflect on Selected Signs
          </Button>
        </>
      ) : (
        <Card className="p-4 space-y-4">
          <div>
            <Label className="text-lg font-semibold">To get my wellbeing back on track I will...</Label>
            <Textarea
              placeholder="What will you do to return to a place of wellbeing? Tip: What tools could you return to?"
              value={reflection.action}
              onChange={(e) => setReflection(prev => ({ ...prev, action: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">This is important to me because...</Label>
            <Textarea
              placeholder="What is your motivation to do what you have committed to?"
              value={reflection.importance}
              onChange={(e) => setReflection(prev => ({ ...prev, importance: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">I can do this because...</Label>
            <Textarea
              placeholder="What strengths and previous experiences can you draw on?"
              value={reflection.capability}
              onChange={(e) => setReflection(prev => ({ ...prev, capability: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowReflection(false)}>Back</Button>
            <Button onClick={handleSubmitReflection}>Submit Reflection</Button>
          </div>
        </Card>
      )}
    </div>
  )
}

