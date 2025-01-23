import Image from 'next/image'
import { GameModes } from '../components/game-modes'
import { SocialLinks } from '../components/social-links'
import { DynamicText } from '@/components/DynamicText'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="text-center mb-8">
        <DynamicText 
            text="CARTOONDLE"
            className="mb-2"
            letterClassName="w-8 h-8 md:w-12 md:h-12 text-2xl md:text-4xl font-black"
          />
        </header>
        {/* Game Modes */}
        <GameModes />
        {/* Other Games */}
        <div className="mt-12 text-center">
        <DynamicText 
            text="OTHER GAMES"
            className="mb-6"
            letterClassName="w-6 h-6 md:w-8 md:h-8 text-sm md:text-lg font-bold"
          />
          <div className="flex justify-center gap-4 flex-wrap">
            {['Adventure Time', 'Regular Show', 'Ben 10', 'PowerPuff'].map((game) => (
              <div
                key={game}
                className="w-24 h-24 bg-white border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform p-2"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                <Image
                  src="/placeholder.svg"
                  alt={game}
                  width={48}
                  height={48}
                  className="rounded mb-2"
                />
                <span className="text-xs font-bold text-center">{game}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Social Links */}
        <SocialLinks />
      </div>
    </main>
  )
}

