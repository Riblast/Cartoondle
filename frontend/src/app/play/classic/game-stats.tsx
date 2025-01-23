interface GameStatsProps {
  guesses: string[]
  isComplete: boolean
  stats: {
    played: number
    won: number
    streak: number
    maxStreak: number
  }
}

export function GameStats({ guesses, isComplete, stats }: GameStatsProps) {
  if (guesses.length === 0) return null

  return (
    <div className="mt-6">

      {isComplete && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <h3 className="font-bold text-green-800 mb-2">
            🎉 Congratulations! You got it!
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Games Played</p>
              <p className="font-bold">{stats?.played}</p>
            </div>
            <div>
              <p className="text-gray-600">Win Rate</p>
              <p className="font-bold">
                {Math.round((stats?.won / stats?.played) * 100)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Current Streak</p>
              <p className="font-bold">{stats?.streak}</p>
            </div>
            <div>
              <p className="text-gray-600">Max Streak</p>
              <p className="font-bold">{stats?.maxStreak}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

