import { Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Kbd } from './ui/kbd'

export function SearchBar() {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
          className={`bg-input px-2 mr-2 text-muted-foreground rounded-md text-sm gap-2 hidden md:flex justify-center items-center h-[32px] border ${isFocused ? 'border-primary/50' : 'border-transparent'}`}
        animate={{
          scale: isFocused ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <Search className="h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-[100px] border-none outline-none bg-transparent"
        />
        <Kbd>⌘/</Kbd>
      </motion.div>
    </AnimatePresence>
  )
}
