import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'

interface SplashScreenProps {
  onStart: () => void
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <motion.div 
      className="h-screen flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(to bottom right, ${theme.colors.primary}, ${theme.colors.secondary})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 
        className="text-6xl font-bold mb-4"
        style={{ color: theme.colors.accent, fontFamily: theme.fonts.heading }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        ChooseMore
      </motion.h1>
      <motion.p 
        className="text-xl mb-8"
        style={{ color: theme.colors.white }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Explore, Map, and Plan Your Journey
      </motion.p>
      <motion.button
        className="px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
        style={{ 
          backgroundColor: theme.colors.accent,
          color: theme.colors.white
        }}
        onClick={onStart}
        whileHover={{ 
          backgroundColor: theme.colors.secondary,
          scale: 1.05 
        }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  )
}

