import { Character, CharacterAttribute } from "../app/types/game"

export function compareCharacters(guess: Character, target: Character): CharacterAttribute[] {
  const attributes: CharacterAttribute[] = []

  // Compare show
  attributes.push({
    category: 'Show',
    value: guess.attributes.show,
    color: guess.attributes.show === target.attributes.show ? 'green' : 'red'
  })

  // Compare gender
  attributes.push({
    category: 'Gender',
    value: guess.attributes.gender,
    color: guess.attributes.gender === target.attributes.gender ? 'green' : 'red'
  })

  // Compare species
  attributes.push({
    category: 'Species',
    value: guess.attributes.species,
    color: guess.attributes.species === target.attributes.species ? 'green' : 'red'
  })

  // Compare powers (partial matches possible)
  guess.attributes.powers.forEach(power => {
    attributes.push({
      category: 'Powers',
      value: power,
      color: target.attributes.powers.includes(power) ? 'green' : 
             target.attributes.powers.some(p => p.includes(power)) ? 'yellow' : 'red'
    })
  })

  // Compare abilities (partial matches possible)
  guess.attributes.abilities.forEach(ability => {
    attributes.push({
      category: 'Abilities',
      value: ability,
      color: target.attributes.abilities.includes(ability) ? 'green' : 
             target.attributes.abilities.some(a => a.includes(ability)) ? 'yellow' : 'red'
    })
  })

  // Compare first appearance
  const targetDate = new Date(target.attributes.firstAppearance)
  const guessDate = new Date(guess.attributes.firstAppearance)
  attributes.push({
    category: 'Debut',
    value: guess.attributes.firstAppearance,
    color: guessDate < targetDate ? 'dark-red' : 
           guessDate > targetDate ? 'dark-red' : 'green'
  })

  // Compare occupation
  attributes.push({
    category: 'Occupation',
    value: guess.attributes.occupation,
    color: guess.attributes.occupation === target.attributes.occupation ? 'green' : 'red'
  })

  // Compare affiliations (partial matches possible)
  guess.attributes.affiliation.forEach(aff => {
    attributes.push({
      category: 'Affiliation',
      value: aff,
      color: target.attributes.affiliation.includes(aff) ? 'green' : 
             target.attributes.affiliation.some(a => a.includes(aff)) ? 'yellow' : 'red'
    })
  })

  return attributes
}

