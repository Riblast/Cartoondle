import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DynamicText } from "@/components/DynamicText"

interface GameStatsModalProps {
  isOpen: boolean
  onClose: () => void
  guesses: string[]
  stats: {
    played: number
    won: number
    streak: number
    maxStreak: number
  }
}

export function GameStatsModal({ isOpen, onClose, guesses, stats }: GameStatsModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    onClose()
  }

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="bg-white border-4 border-black p-0 overflow-hidden">
        <DialogHeader className="bg-black text-white p-4">
          <DialogTitle>
            <DynamicText text="CONGRATULATIONS" letterClassName="w-6 h-6 text-sm font-bold" />
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 text-black">
          <p className="text-xl font-bold mb-4">You guessed it in {guesses.length} tries!</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 p-4 border-2 border-black">
              <p className="font-bold">Games Played</p>
              <p className="text-2xl">{stats.played}</p>
            </div>
            <div className="bg-green-100 p-4 border-2 border-black">
              <p className="font-bold">Win Rate</p>
              <p className="text-2xl">{Math.round((stats.won / stats.played) * 100)}%</p>
            </div>
            <div className="bg-yellow-100 p-4 border-2 border-black">
              <p className="font-bold">Current Streak</p>
              <p className="text-2xl">{stats.streak}</p>
            </div>
            <div className="bg-red-100 p-4 border-2 border-black">
              <p className="font-bold">Max Streak</p>
              <p className="text-2xl">{stats.maxStreak}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold">Your Guesses:</p>
            {guesses.map((guess, index) => (
              <div
                key={index}
                className="p-2 bg-gray-100 rounded-md text-sm flex justify-between items-center border-2 border-black"
              >
                <span>{guess}</span>
                <span className="text-xs text-gray-500">#{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

