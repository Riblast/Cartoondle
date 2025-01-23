'use client'

import { Card } from '@/components/ui/card'
import { Eye, Play, Quote, Wand2, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { DynamicText } from './DynamicText'

const modes = [
  {
    id: 'classic',
    name: 'CLASSIC',
    description: 'Get clues on every try',
    icon: Play,
    color: 'bg-blue-500',
  },
  {
    id: 'cooming soon',
    name: 'SILHOUETTE',
    description: 'cooming soon...',
    icon: HelpCircle,
  }
  // {
  //   id: 'power',
  //   name: 'POWER',
  //   description: 'Guess with a special power animation',
  //   icon: Wand2,
  //   color: 'bg-green-500',
  // },
  // {
  //   id: 'quote',
  //   name: 'QUOTE',
  //   description: 'Guess with a dialogue',
  //   icon: Quote,
  //   color: 'bg-yellow-500',
  // },
  // {
  //   id: 'silhouette',
  //   name: 'SILHOUETTE',
  //   description: 'Guess with a character shadow',
  //   icon: Eye,
  //   color: 'bg-red-500',
  // },
]

export function GameModes() {
  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
    {modes.map((mode, index) => (
      mode.id !== 'cooming soon' ?
      <Link key={mode.id} href={`/play/${mode.id}`}>
        <Card className="overflow-hidden border-2 border-black">
          <div className="grid grid-cols-[auto,1fr] h-full">
            <div className={`w-16 flex items-center justify-center ${index % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <mode.icon className="w-8 h-8" />
            </div>
            <div className={`p-4 ${index % 2 === 0 ? 'bg-white text-black ' : 'bg-black text-white'}`}>
              <DynamicText
                text={mode.name}
                className={'mb-1'}
                letterClassName='w-6 h-6 text-sm font-bold'
                border={(index % 2 === 0) ? 'black' : 'white'}
                />
              <p className="text-sm">{mode.description}</p>
            </div>
          </div>
        </Card>
      </Link>
      : 
      <Card key={mode.id} className="overflow-hidden border-2 border-black">
          <div className="grid grid-cols-[auto,1fr] h-full">
            <div className={`w-16 flex items-center justify-center ${index % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <mode.icon className="w-8 h-8" />
            </div>
            <div className={`p-4 ${index % 2 === 0 ? 'bg-white text-black ' : 'bg-black text-white'}`}>
              <DynamicText
                text={mode.name}
                className={'mb-1'}
                letterClassName='w-6 h-6 text-sm font-bold'
                border={(index % 2 === 0) ? 'black' : 'white'}
                />
              <p className="text-sm">{mode.description}</p>
            </div>
          </div>
        </Card>
    ))}
  </div>
  )
}

