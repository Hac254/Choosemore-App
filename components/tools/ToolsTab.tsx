import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { theme } from '@/styles/theme'
import { useState } from 'react'
import ResilienceTool from './resilience/ResilienceTool'

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
    name: "Self Management Tool", 
    emoji: "⚡",
    url: "https://self-management-model.vercel.app/" 
  },
  { 
    name: "OCD Tool(Socratic Reasoning)", 
    emoji: "💭",
    url: "https://cbt-therapy-ocd-tool.vercel.app/" 
  },
  { 
    name: "Behaviour Activation Tool", 
    emoji: "📅",
    url: "https://behavioural-activation-tool.vercel.app/" 
  },
  { 
    name: "OCD Helper Tool", 
    emoji: "🛡️",
    url: "https://fear-less.vercel.app/" 
  },
  { 
    name: "Resilience Builder", 
    emoji: "🌱",
    component: ResilienceTool 
  },
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
        {selectedTool && tools.find(t => t.name === selectedTool)?.component ? (
          <div>
            {selectedTool === 'Resilience Builder' && (
              <ResilienceTool onBack={() => setSelectedTool(null)} />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tools.map((tool) => {
              const ButtonComponent = (
                <Button
                  key={tool.name}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center text-center p-2 hover:bg-secondary hover:text-white"
                  style={{
                    backgroundColor: theme.colors.white,
                    color: theme.colors.primary,
                    border: `1px solid ${theme.colors.gray}`
                  }}
                  onClick={() => !tool.url && setSelectedTool(tool.name)}
                >
                  <span className="text-3xl mb-2" role="img" aria-label={tool.name}>
                    {tool.emoji}
                  </span>
                  <span className="text-sm">{tool.name}</span>
                </Button>
              )

              return tool.url ? (
                <a 
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ButtonComponent}
                </a>
              ) : ButtonComponent
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

