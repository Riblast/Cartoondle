'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Command, CommandList, CommandItem } from '@/components/ui/command'
import { Character } from '@/app/types/game'

interface CharacterSearchProps {
  onGuess: (characterId: string) => void
  isGameComplete: boolean
}

export function CharacterSearch({ onGuess, isGameComplete }: CharacterSearchProps) {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/characters/names')
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data)
      })
  }, [])

  const calculateSimilarity = (a: string, b: string) => {
    const lengthA = a.length
    const lengthB = b.length
    const minLength = Math.min(lengthA, lengthB)
    let similarity = 0

    for (let i = 0; i < minLength; i++) {
      if (a[i] === b[i]) {
        similarity++
      }
    }

    return similarity / Math.max(lengthA, lengthB)
  }

  const filteredCharacters = characters
    .filter(character => character.name.toLowerCase().startsWith(search.toLowerCase()))
    .sort((a, b) => calculateSimilarity(b.name.toLowerCase(), search.toLowerCase()) - calculateSimilarity(a.name.toLowerCase(), search.toLowerCase()))

  const handleSubmit = (characterId: string) => {
    onGuess(characterId)
    setSearch('')
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type character name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.trim())
            setShowSuggestions(true)
          }}
          disabled={isGameComplete}
          className="border-2 border-black focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
        />
        <Button 
          onClick={() => {
            const character = characters.find(c => c.name.toLowerCase() === search.toLowerCase())
            if (character) {
              handleSubmit(character.id)
            }
          }}
          disabled={!search || isGameComplete}
          className='bg-black hover:bg-gray-800 text-white font-bold border-2 border-black rounded-none flex items-center gap-2 px-6'
        >
          Guess
        </Button>
      </div>

      {showSuggestions && search && (
        <Command className="absolute z-10 w-full mt-0 border-2 border-t-0 border-black rounded-none bg-white/95 backdrop-blur overflow-hidden">
        <CommandList>
          {filteredCharacters.map((character, i) => (
            <CommandItem
              key={character.id}
              onSelect={() => {
                setSearch(character.name)
                setShowSuggestions(false)
              }}
              className={`cursor-pointer p-2 font-medium ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              {`${character.name} (${character.show})`}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
      )}
    </div>
  )
}