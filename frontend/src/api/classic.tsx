export const getDailyCharacter = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/characters/daily`)
  return await response.json()
}

export const getCharacterNames = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/characters/names`)
  return await response.json()
}

export const getCharacters = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/characters`)
  return await response.json()
}

export const getCharacter = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/characters/${id}`)
  return await response.json()
}