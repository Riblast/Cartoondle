interface GameHintsProps {
  hints: string[]
}

export function GameHints({ hints }: GameHintsProps) {
  if (hints.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2">Hints:</h2>
      <div className="space-y-2">
        {hints.map((hint, index) => (
          <div
            key={index}
            className="p-2 bg-gray-100 rounded-md text-sm"
          >
            {hint}
          </div>
        ))}
      </div>
    </div>
  )
}

