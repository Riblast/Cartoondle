export interface Character {
  id: number
  name: string
  attributes: {
    show: string,
    gender: string,
    species: string,
    powers: [string],
    abilities: [string],
    firstAppearance: string,
    occupation: string,
    affiliation: [string]
  }
}