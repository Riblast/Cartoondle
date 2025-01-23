import { Github, Twitter } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-0 mt-12">
      <a
        href="https://twitter.com/cartoondle"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-black text-white flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Twitter className="w-6 h-6" />
      </a>
      <a
        href="https://github.com/cartoondle"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Github className="w-6 h-6" />
      </a>
    </div>
  )
}

