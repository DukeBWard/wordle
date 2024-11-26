"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { WORDS } from './words'
import { Grid } from './grid'
import { Keyboard } from './keyboard'

const WORD_LENGTH = 5
const MAX_GUESSES = 6

export default function Game() {
  const [solution, setSolution] = useState('')
  const [guesses, setGuesses] = useState<string[]>(Array(MAX_GUESSES).fill(''))
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setSolution(randomWord)
  }, [])

  const onChar = useCallback((value: string) => {
    if (currentGuess.length < WORD_LENGTH && !gameOver) {
      setCurrentGuess((prev) => prev + value)
    }
  }, [currentGuess, gameOver])

  const onDelete = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1))
  }, [])

  const onEnter = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH || gameOver) return

    const newGuesses = [...guesses]
    const currentGuessIndex = newGuesses.findIndex((guess) => guess === '')
    newGuesses[currentGuessIndex] = currentGuess

    setGuesses(newGuesses)
    setCurrentGuess('')

    if (currentGuess === solution || currentGuessIndex === MAX_GUESSES - 1) {
      setGameOver(true)
    }
  }, [currentGuess, gameOver, guesses, solution])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter()
      } else if (e.key === 'Backspace') {
        onDelete()
      } else if (/^[A-Za-z]$/.test(e.key)) {
        onChar(e.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEnter, onDelete, onChar])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
      <Keyboard onChar={onChar} onDelete={onDelete} onEnter={onEnter} guesses={guesses} solution={solution} />
      {gameOver && (
        <div className="mt-8 text-2xl font-bold">
          {guesses.includes(solution) ? 'You won!' : `Game over! The word was ${solution}`}
        </div>
      )}
    </div>
  )
}

