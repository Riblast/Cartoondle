'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { CharacterSearch } from './character-search'
import { AttributeDisplay } from './attribute-display'
import { compareCharacters } from '../../../lib/character-comparison'
import { Character, CharacterAttribute } from '@/app/types/game'
import Link from 'next/link'
import { DynamicText } from '@/components/DynamicText'
import { Button } from '@/components/ui/button'
import { GameStatsModal } from './game-stats-modal'
import { getDailyCharacter } from '@/api/classic'

export default function ClassicGame() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [revealedAttributes, setRevealedAttributes] = useState<CharacterAttribute[][]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [hints, setHints] = useState<string[]>([])
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [dailyCharacter, setDailyCharacter] = useState<Character>({
  id: "",
  name: "",
  show: "",
  attributes: {
    gender: "Other",
    species: "",
    powers: [],
    abilities: [],
    firstAppearance: "",
    occupation: "",
    affiliation: [],
    hint: ""
  }
})
const [hasGuessed, setHasGuessed] = useState(false)
const getHint = () => {
  const newHint = dailyCharacter.attributes.hint
  if (newHint) {
    setHints([newHint])
  }
}
const stats = {
  played: 10,
  won: 8,
  streak: 3,
  maxStreak: 5,
}

useEffect(() => {
  if (isComplete) {
    setShowStatsModal(true)
  }
}, [isComplete])

  useEffect(() => {
    const character = getDailyCharacter()
    setDailyCharacter(character)
  }, [])

  const handleGuess = async(characterId: string) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/characters/${characterId}`)
      const guessedCharacter: Character = await response.json()

      setGuesses([...guesses, guessedCharacter.name])
    
      const newAttributes = compareCharacters(guessedCharacter, dailyCharacter)
      setRevealedAttributes([...revealedAttributes, newAttributes])
  
      if (guessedCharacter.name.toLowerCase() === dailyCharacter.name.toLowerCase()) {
        setIsComplete(true)
      }
      setHasGuessed(true)
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  }

  return (
    <div className="min-h-screen font-roboto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm">
      <div className="relative z-10 max-w-6xl mx-auto mt-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/">
            <DynamicText 
            text="CARTOONDLE"
            className="mb-2"
            letterClassName="w-8 h-8 md:w-12 md:h-12 text-2xl md:text-4xl font-black"
          />
          </Link>
        </div>

        {/* Main Game Area */}
        <Card className="border-4 border-black">
          <div className="">
            <div className="w-16 bg-black" />
            <div className="p-2 sm:p-6 bg-white">
              <div className="text-center mb-6">
              <DynamicText 
                text='GUESS TODAYS CHARACTER'
                className='whitespace-nowrap'
                letterClassName={`w-6 h-6 flex items-center justify-center font-bold text-sm`}
                border='black'
              />
                <p className="text-sm font-medium text-gray-600 my-2">
                  Type any character to begin your adventure!
                </p>
              </div>
          {/* Character Search */}
          <CharacterSearch onGuess={handleGuess} isGameComplete={isComplete} />

          <Button
                  onClick={getHint}
                  disabled={isComplete || hints.length >= 1}
                  className="bg-white hover:bg-yellow-600 text-black font-bold border-2 border-black my-2"
                >
                  Get Hint
                </Button>

              {hints.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-100 border-2 border-yellow-500">
                  <h3 className="font-bold mb-2">Hints:</h3>
                  <ul className="list-disc pl-5">
                    {hints.map((hint, index) => (
                      <li key={index} className="text-sm">
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

          {hasGuessed && (
            <>
              {/* Attributes Display */}
              <AttributeDisplay attributes={revealedAttributes} guesses={guesses} dailyCharacter={dailyCharacter} />

              {/* Color Legend */}
              <div className="mt-6 border-2 border-black overflow-hidden">
                  <div className="bg-black text-white p-2 font-bold">COLOR GUIDE</div>
                  <div className="grid grid-cols-2 md:grid-cols-4">
                    {[
                      { color: 'bg-green-500', label: 'Correct' },
                      { color: 'bg-yellow-500', label: 'Partial' },
                      { color: 'bg-red-500', label: 'Incorrect' },
                      { color: 'bg-red-900', label: 'Before/After' }
                    ].map((item, i) => (
                      <div 
                        key={i}
                        className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'} p-2 flex items-center gap-2`}
                      >
                        <div className={`w-4 h-4 ${item.color} border-2 border-black`}></div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              {/* Stats Display */}
              <GameStatsModal
          isOpen={showStatsModal}
          onClose={() => setShowStatsModal(false)}
          guesses={guesses}
          stats={stats}
        />
            </>
          )}
          </div>
          </div>
        </Card>
      </div>
    </div>
    </div>
  )
}

