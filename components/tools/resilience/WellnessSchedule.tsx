'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { theme } from '@/styles/theme'
import { ScheduleItem } from './types'
import { format } from 'date-fns'

export default function WellnessSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null)
  const [newActivity, setNewActivity] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newNotes, setNewNotes] = useState('')

  const handleAddActivity = () => {
    if (newActivity.trim() && newDate && newTime) {
      const newItem: ScheduleItem = {
        id: Date.now().toString(),
        activity: newActivity,
        date: newDate,
        time: newTime,
        notes: newNotes
      }
      setSchedule(prev => [...prev, newItem])
      resetForm()
    }
  }

  const handleUpdateActivity = () => {
    if (editingItem && newActivity.trim() && newDate && newTime) {
      setSchedule(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, activity: newActivity, date: newDate, time: newTime, notes: newNotes }
          : item
      ))
      resetForm()
      setEditingItem(null)
    }
  }

  const handleEdit = (item: ScheduleItem) => {
    setEditingItem(item)
    setNewActivity(item.activity)
    setNewDate(item.date)
    setNewTime(item.time)
    setNewNotes(item.notes || '')
  }

  const resetForm = () => {
    setNewActivity('')
    setNewDate('')
    setNewTime('')
    setNewNotes('')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Wellness Schedule</h3>
      
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="activity">Activity</Label>
            <Input
              id="activity"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Enter activity"
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Add notes"
            />
          </div>
        </div>
        <Button 
          onClick={editingItem ? handleUpdateActivity : handleAddActivity}
          className="w-full"
        >
          {editingItem ? 'Update Activity' : 'Add Activity'}
        </Button>
      </div>

      <div className="space-y-2 mt-4">
        {schedule.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-medium">{item.activity}</p>
              <p className="text-sm text-gray-600">
                {format(new Date(`${item.date}T${item.time}`), 'PPp')}
              </p>
              {item.notes && (
                <p className="text-sm text-gray-500">{item.notes}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setSchedule(prev => prev.filter(i => i.id !== item.id))}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

