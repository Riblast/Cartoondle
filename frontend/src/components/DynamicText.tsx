import { cn } from "@/lib/utils"

interface DynamicTextProps {
  text: string
  className?: string
  letterClassName?: string
  spaceWidth?: string
  border?: string
}

export function DynamicText({ text, className = '', letterClassName = '', spaceWidth = 'w-2 md:w-4', border = 'black' }: DynamicTextProps) {
  const borderColor = border === 'white' ? 'border-white' : 'border-black'
  return (
    <div className={cn('inline-flex flex-wrap justify-center', className)}>
      {[...text].map((letter, i) => (
        <span
          key={i}
          className={`
            flex items-center justify-center
            ${letter === ' ' ? spaceWidth : letterClassName}
            ${letter !== ' ' && (i % 2 === 0 ? `bg-black text-white border-2 ${borderColor}` : `bg-white text-black border-2 ${borderColor}`)}`
            // ${border ? `border-2 border-${border}` : null}
          }
        >
          {letter !== ' ' && letter}
        </span>
      ))}
    </div>
  )
}