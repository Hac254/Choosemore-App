'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { theme } from '@/styles/theme'

interface GamesViewProps {
  onBack: () => void
}

interface Game {
  name: string
  emoji: string
  description: string
  url: string
}

const games: Game[] = [
  {
    name: "Memory Game",
    emoji: "🧠",
    description: "Challenge your memory skills by matching card pairs",
    url: "https://memory-game-liart-mu.vercel.app/"
  },
  {
    name: "Fear Fighter",
    emoji: "🦸",
    description: "Face and overcome your fears through interactive challenges",
    url: "https://fear-fighter-la3b-mqi5rwcqv-odedebenjamin7-gmailcoms-projects.vercel.app/"
  },
  {
    name: "Flappy Bird",
    emoji: "🐦",
    description: "Test your reflexes in this classic arcade-style game",
    url: "https://flappy-bird-game-plum.vercel.app/"
  },
  {
    name: "Tetris",
    emoji: "🎮",
    description: "Classic block-stacking puzzle game to challenge your mind",
    url: "https://tetris-game-seven-rouge.vercel.app/"
  },
  {
    name: "Mindfulness Maze",
    emoji: "🧘",
    description: "Navigate through a peaceful maze while practicing mindfulness",
    url: "https://mindfulness-maze.example.com"
  },
  {
    name: "Emotion Explorer",
    emoji: "🎯",
    description: "Learn to identify and understand different emotions",
    url: "https://emotion-explorer.example.com"
  },
  {
    name: "Resilience Runner",
    emoji: "🏃",
    description: "Build resilience through interactive challenges",
    url: "https://resilience-runner.example.com"
  },
  {
    name: "Thought Tracker",
    emoji: "💭",
    description: "Track and challenge negative thought patterns",
    url: "https://thought-tracker.example.com"
  }
]

export default function GamesView({ onBack }: GamesViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="outline">← Back to Tools</Button>
        <h2 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>Therapeutic Games</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map((game) => (
          <Card key={game.name} className="p-4 hover:shadow-lg transition-shadow">
            <a 
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{game.emoji}</span>
                <h3 className="text-lg font-semibold" style={{ color: theme.colors.primary }}>{game.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{game.description}</p>
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}
