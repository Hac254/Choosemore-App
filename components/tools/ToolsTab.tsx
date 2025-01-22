import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { theme } from '@/styles/theme'
import { Book, Calendar, Headphones, Heart, Lightbulb, MessageCircle, Pencil, Target, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import ResilienceTool from './resilience/ResilienceTool'

const tools = [
  { name: "Journaling", icon: Pencil },
  { name: "Meditation", icon: Heart },
  { name: "Goal Setting", icon: Target },
  { name: "Mood Tracker", icon: Zap },
  { name: "Thought Records", icon: Lightbulb },
  { name: "Scheduling", icon: Calendar },
  { name: "Audio Exercises", icon: Headphones },
  { name: "Reading Materials", icon: Book },
  { name: "Chat Support", icon: MessageCircle },
  { name: "Resilience", icon: Shield },
]

export default function ToolsTab() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading, fontSize: theme.fontSizes['2xl'] }}>
          Therapeutic Tools
        </CardTitle>
        <CardDescription style={{ color: theme.colors.text, fontSize: theme.fontSizes.base }}>
          Access resources and tools to support your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedTool === 'Resilience' ? (
          <ResilienceTool onBack={() => setSelectedTool(null)} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <Button
                key={tool.name}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center text-center p-2 hover:bg-secondary hover:text-white"
                style={{
                  backgroundColor: theme.colors.white,
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.gray}`
                }}
                onClick={() => setSelectedTool(tool.name)}
              >
                <tool.icon className="h-8 w-8 mb-2" />
                <span className="text-sm">{tool.name}</span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

