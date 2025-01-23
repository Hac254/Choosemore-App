'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AnticipatedEvent } from './types'
import { Card } from '@/components/ui/card'

export default function AnticipatedEvents() {
  const [events, setEvents] = useState<AnticipatedEvent[]>([])
  const [showForm, setShowForm] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<AnticipatedEvent | null>(null)
  const [formData, setFormData] = useState({
    event: '',
    action: '',
    importance: '',
    capability: ''
  })

  const handleAddEvent = () => {
    if (formData.event.trim()) {
      const newEvent: AnticipatedEvent = {
        id: Date.now().toString(),
        event: formData.event,
        action: formData.action,
        importance: formData.importance,
        capability: formData.capability
      }
      
      if (currentEvent) {
        setEvents(prev => prev.map(event => 
          event.id === currentEvent.id ? newEvent : event
        ))
      } else {
        setEvents(prev => [...prev, newEvent])
      }
      
      resetForm()
    }
  }

  const handleEdit = (event: AnticipatedEvent) => {
    setCurrentEvent(event)
    setFormData({
      event: event.event,
      action: event.action,
      importance: event.importance,
      capability: event.capability
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      event: '',
      action: '',
      importance: '',
      capability: ''
    })
    setCurrentEvent(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Anticipated Events</h3>
      
      {!showForm ? (
        <>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>{event.event}</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                    View/Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setEvents(prev => prev.filter(e => e.id !== event.id))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={() => setShowForm(true)} className="w-full">
            Add New Event
          </Button>
        </>
      ) : (
        <Card className="p-4 space-y-4">
          <div>
            <Label className="text-lg font-semibold">When...</Label>
            <Input
              placeholder="What is the event?"
              value={formData.event}
              onChange={(e) => setFormData(prev => ({ ...prev, event: e.target.value }))}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">I will...</Label>
            <Textarea
              placeholder="What will you do to return to a place of wellbeing? Remember you can only control your thoughts and actions not others."
              value={formData.action}
              onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">This is important to me because...</Label>
            <Textarea
              placeholder="What is your motivation to do what you have committed to?"
              value={formData.importance}
              onChange={(e) => setFormData(prev => ({ ...prev, importance: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">I can do this because...</Label>
            <Textarea
              placeholder="What strengths and previous experiences can you draw on?"
              value={formData.capability}
              onChange={(e) => setFormData(prev => ({ ...prev, capability: e.target.value }))}
              className="mt-2"
              rows={4}
            />
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleAddEvent}>
              {currentEvent ? 'Update Event' : 'Add Event'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

