'use client'

import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  words: string[]
  className?: string
  delay?: number
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
}

export default function TypingAnimation({
  words,
  className = '',
  delay = 0,
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenWords = 2000,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [isWaiting, setIsWaiting] = useState(true)

  useEffect(() => {
    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false)
      }, delay)
      return () => clearTimeout(timer)
    }

    const currentWord = words[wordIndex]
    let timer: NodeJS.Timeout

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing, wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetweenWords)
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, deletingSpeed)
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, wordIndex, isWaiting, words, delay, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <div className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  )
}
