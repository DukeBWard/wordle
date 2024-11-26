import React from 'react'

interface GridProps {
  guesses: string[]
  currentGuess: string
  solution: string
}

export function Grid({ guesses, currentGuess, solution }: GridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex(g => g === '')
        return (
          <React.Fragment key={i}>
            {Array.from({ length: 5 }).map((_, j) => {
              const letter = isCurrentGuess ? currentGuess[j] : guess[j]
              let className = "w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold"
              
              if (!isCurrentGuess && letter) {
                if (letter === solution[j]) {
                  className += " bg-green-500 text-white"
                } else if (solution.includes(letter)) {
                  className += " bg-yellow-500 text-white"
                } else {
                  className += " bg-gray-500 text-white"
                }
              }

              return (
                <div key={j} className={className}>
                  {letter}
                </div>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

