import { ArrowDown, ArrowUp } from 'lucide-react'
import { Character, CharacterAttribute } from "@/app/types/game"
import React, { useState, useEffect, useRef } from 'react'

interface AttributeDisplayProps {
  attributes: CharacterAttribute[][]
  guesses: string[]
  dailyCharacter: Character
}

const categoryIcons = {
  Show: "📺",
  Gender: "👤",
  Species: "🧬",
  Powers: "⚡",
  Abilities: "💫",
  Debut: "🎬",
  Occupation: "💼",
  Affiliation: "🏢"
}

const colorClasses = {
  green: "bg-green-500 text-white",
  yellow: "bg-yellow-500 text-white",
  red: "bg-red-500 text-white",
  'dark-red': "bg-red-900 text-white"
}

const AutoSizingText = ({ children }: { children: React.ReactNode }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    const resizeText = () => {
      if (textRef.current) {
        const { offsetWidth, offsetHeight } = textRef.current;
        const newFontSize = Math.min(offsetWidth, offsetHeight) * 0.15;
        setFontSize(newFontSize);
      }
    };
    resizeText();
    window.addEventListener('resize', resizeText);
    return () => window.removeEventListener('resize', resizeText);
  }, [children]);

  return (
    <div ref={textRef} className="w-full h-full flex items-center justify-center overflow-hidden text-center" style={{ fontSize: `${fontSize}px` }}>
      {children}
    </div>
  );
};

export function AttributeDisplay({ attributes, guesses, dailyCharacter }: AttributeDisplayProps) {
  const categories = Array.from(new Set(attributes.flatMap(guess => guess.map(attr => attr.category))));
  const correctAttributes = attributes.flat().filter(attr => attr.color === 'green');

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-[auto,1fr] gap-4">
        <div className="font-semibold text-xs flex items-center justify-center">Name</div>
        <div className="grid grid-cols-8 gap-1">
          {categories.map(category => (
            <div key={category} className="flex gap-2 sm:gap-0 border-2 border-black py-2 bg-slate-100 items-center justify-center text-xs font-medium">
              <div className='text-base sm:text-xs'>
              {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <div className='hidden md:block'>
                {category}
              </div>
            </div>
          ))}
        </div>
        
        {/* Correct Attributes Row */}
        <div className="font-semibold text-green-600 flex items-center justify-center">&nbsp;</div>
        <div className="grid grid-cols-8 gap-1">
          {categories.map(category => {
            const correctAttr = correctAttributes.find(attr => attr.category === category);
            return (
              <div key={category} className="w-full h-full flex items-center justify-center">
                <div className='aspect-square w-full h-full max-w-[80px] max-h-[80px]'>
                  {correctAttr ? (
                    <div className={`${colorClasses.green} w-full h-full border-2 border-black flex items-center justify-center p-1 overflow-hidden`}>
                      <AutoSizingText>{correctAttr.value}</AutoSizingText>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-100 border-2 border-black border-dashed"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Guesses Rows */}
        {[...guesses].reverse().map((guess, guessIndex) => (
          <React.Fragment key={guessIndex}>
            <div className="font-medium text-sm flex justify-center items-center">{guess}</div>
            <div className="grid grid-cols-8 gap-1">
              {categories.map(category => {
                const attr = attributes[guesses.length - 1 - guessIndex].find(a => a.category === category);
                return (
                  <div key={category} className="w-full h-full flex items-center justify-center">
                    <div className='aspect-square w-full h-full max-w-[80px] max-h-[80px]'>
                    {attr ? (
                      <div className={`${colorClasses[attr.color || 'red']} w-full h-full border-2 border-black flex items-center justify-center p-1 relative overflow-hidden`}>
                        {attr.color === 'dark-red' && (
                          <>
                            {attr.value < dailyCharacter.attributes[attr.category as keyof typeof dailyCharacter.attributes] ? (
                              <ArrowUp className="w-10 h-10 absolute opacity-50 text-rose-300" />
                            ) : (
                              <ArrowDown className="w-10 h-10 absolute opacity-50 text-rose-300" />
                            )}
                          </>
                        )}
                        <AutoSizingText>{attr.value}</AutoSizingText>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md"></div>
                    )}
                    </div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}