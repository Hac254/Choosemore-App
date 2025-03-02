'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { theme } from '@/styles/theme'
import { useState } from 'react'
import ResilienceTool from './resilience/ResilienceTool'
import GamesView from './games/GamesView'

interface Tool {
  name: string;
  emoji: string;
  url?: string;
  component?: React.ComponentType<any>;
}

const tools: Tool[] = [
  { 
    name: "Personal Growth Journal", 
    emoji: "📔",
    url: "https://personal-growth-tool.vercel.app/" 
  },
  { 
    name: "Attention Training Tool", 
    emoji: "👂",
    url: "https://attention-training-tool.vercel.app/" 
  },
  { 
    name: "Worry Exposure Tool", 
    emoji: "😧",
    url: "https://worry-exposure-tool.vercel.app/" 
  },
  { 
    name: "Sleep Tool", 
    emoji: "😴",
    url: "https://sleep-tool.vercel.app/" 
  },
  { 
    name: "Self Management Tool", 
    emoji: "⚡",
    url: "https://self-management-model.vercel.app/" 
  },
  { 
    name: "OCD Tool", 
    emoji: "💭",
    url: "https://cbt-therapy-ocd-tool.vercel.app/" 
  },
  { 
    name: "Behaviour Tool", 
    emoji: "📅",
    url: "https://behavioural-activation-tool.vercel.app/" 
  },
  { 
    name: "OCD Helper", 
    emoji: "🛡️",
    url: "https://fear-less.vercel.app/" 
  },
  { 
    name: "Dream well, Sleep Assistant", 
    emoji: "🛏",
    url: "https://sweet-dreams-sigma.vercel.app/" 
  },
  { 
    name: "Resilience", 
    emoji: "🌱",
    component: ResilienceTool 
  }
]

export default function ToolsTab() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [showGames, setShowGames] = useState(false)

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl sm:text-2xl" style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}>
          Therapeutic Tools
        </CardTitle>
        <CardDescription className="text-sm sm:text-base" style={{ color: theme.colors.text }}>
          Access resources and tools to support your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedTool && tools.find(t => t.name === selectedTool)?.component ? (
          <div className="w-full">
            {selectedTool === 'Resilience' && (
              <ResilienceTool onBack={() => setSelectedTool(null)} />
            )}
          </div>
        ) : showGames ? (
          <GamesView onBack={() => setShowGames(false)} />
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.primary }}>Tools</h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tools.map((tool) => {
                  const ButtonComponent = (
                    <Button
                      key={tool.name}
                      variant="outline"
                      className="min-h-[7rem] w-full flex flex-col items-center justify-center text-center p-4 hover:bg-secondary hover:text-white space-y-2"
                      style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.primary,
                        border: `1px solid ${theme.colors.gray}`
                      }}
                      onClick={() => !tool.url && setSelectedTool(tool.name)}
                    >
                      <span className="text-3xl sm:text-4xl mb-2" role="img" aria-label={tool.name}>
                        {tool.emoji}
                      </span>
                      <span className="text-sm sm:text-base font-medium">
                        {tool.name}
                      </span>
                    </Button>
                  )

                  return tool.url ? (
                    <a 
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      {ButtonComponent}
                    </a>
                  ) : ButtonComponent
                })}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.primary }}>Interactive Games</h3>
              <Button
                variant="outline"
                className="min-h-[7rem] w-full sm:w-64 flex flex-col items-center justify-center text-center p-4 hover:bg-secondary hover:text-white space-y-2"
                style={{
                  backgroundColor: theme.colors.white,
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.gray}`
                }}
                onClick={() => setShowGames(true)}
              >
                <span className="text-3xl sm:text-4xl mb-2" role="img" aria-label="Games">
                  🎮
                </span>
                <span className="text-sm sm:text-base font-medium">
                  Therapeutic Games
                </span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

