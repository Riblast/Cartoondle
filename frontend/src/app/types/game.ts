export interface CharacterAttribute {
  category: string
  value: string
  color?: 'green' | 'yellow' | 'red' | 'dark-red'
}

export interface Character {
  id: string
  name: string
  show: string
  attributes: {
    gender: 'Male' | 'Female' | 'Other'
    species: string
    powers: string[]
    abilities: string[]
    firstAppearance: string
    occupation: string
    affiliation: string[]
    hint: string
  }
}

export interface GameState {
  currentCharacter: Character
  guesses: string[]
  revealedAttributes: CharacterAttribute[]
  isComplete: boolean
}

