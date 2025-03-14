'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { theme } from '@/styles/theme'
import { generateTherapistResponse } from '@/utils/gemini-api'
import { AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTherapy } from '@/contexts/TherapyContext'

export default function LLMChatInterface({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { explorationData } = useTherapy()
  const [questionCount, setQuestionCount] = useState(0)

  // Auto-initiate chat with exploration data
  useEffect(() => {
    const initiateChat = async () => {
      if (explorationData.startingPoint && Object.keys(explorationData).length > 1) {
        const initialMessage = formatExplorationData(explorationData)
        const newUserMessage = { 
          id: `user-${Date.now()}`, 
          role: 'user' as const, 
          content: initialMessage 
        }
        setMessages([newUserMessage])
        
        try {
          setIsLoading(true)
          const response = await generateTherapistResponse([newUserMessage])
          setMessages([
            newUserMessage,
            { id: `assistant-${Date.now()}`, role: 'assistant', content: response }
          ])
          setQuestionCount(prev => prev + 1)
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unexpected error occurred')
        } finally {
          setIsLoading(false)
        }
      }
    }

    initiateChat()
  }, [explorationData])

  const formatExplorationData = (data: Record<string, string>) => {
    const { startingPoint, ...formData } = data
    const formattedData = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
    return `Starting Point: ${startingPoint}\n${formattedData}`
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const newUserMessage = { id: `user-${Date.now()}`, role: 'user' as const, content: input }
    const newMessages = [...messages, newUserMessage]

    setMessages(newMessages)
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await generateTherapistResponse(newMessages)
      setMessages([...newMessages, { id: `assistant-${Date.now()}`, role: 'assistant', content: response }])
      setQuestionCount(prev => prev + 1)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px] rounded-lg border">
      <div className="flex justify-between items-center p-2 border-b">
        <h3 className="text-lg font-semibold" style={{ color: theme.colors.primary }}>AI Therapist Chat</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'ml-auto bg-primary text-white max-w-[70%]' 
                : 'bg-secondary/20 max-w-[70%]'
            }`}
            style={{
              backgroundColor: message.role === 'user' ? theme.colors.accent : theme.colors.gray,
              color: message.role === 'user' ? theme.colors.white : theme.colors.text
            }}
          >
            <p className="text-base whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-secondary/20 p-3 rounded-lg max-w-[70%] animate-pulse">
            <p className="text-base">Thinking...</p>
          </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Share your thoughts..."
            disabled={isLoading || questionCount >= 2}
            style={{
              backgroundColor: theme.colors.gray,
              color: theme.colors.text,
            }}
          />
          <Button 
            onClick={sendMessage}
            disabled={isLoading || questionCount >= 2}
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.white,
            }}
          >
            Send
          </Button>
        </div>
      </div>
      {questionCount >= 2 && (
        <div className="p-4 border-t">
          <p className="text-center text-base" style={{ color: theme.colors.text }}>
            The AI therapist has asked two questions. Please reflect on the conversation and consider scheduling a session with a human therapist for further support.
          </p>
        </div>
      )}
    </div>
  )
}

