import React from 'react'

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
]

interface KeyboardProps {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  solution: string
}

export function Keyboard({ onChar, onDelete, onEnter, guesses, solution }: KeyboardProps) {
  const charStatus = React.useMemo(() => {
    const charStatus: { [key: string]: string } = {}
    guesses.forEach(guess => {
      guess.split('').forEach((letter, i) => {
        if (!solution.includes(letter)) {
          charStatus[letter] = 'absent'
        } else if (solution[i] === letter) {
          charStatus[letter] = 'correct'
        } else if (charStatus[letter] !== 'correct') {
          charStatus[letter] = 'present'
        }
      })
    })
    return charStatus
  }, [guesses, solution])

  return (
    <div className="flex flex-col items-center">
      {KEYS.map((row, i) => (
        <div key={i} className="flex mb-2">
          {row.map((key) => {
            let className = "px-2 py-3 mx-0.5 text-sm font-bold rounded"
            if (key === 'ENTER' || key === 'DELETE') {
              className += " px-4 bg-gray-300"
            } else {
              switch (charStatus[key]) {
                case 'absent':
                  className += " bg-gray-500 text-white"
                  break
                case 'present':
                  className += " bg-yellow-500 text-white"
                  break
                case 'correct':
                  className += " bg-green-500 text-white"
                  break
                default:
                  className += " bg-gray-200"
              }
            }
            return (
              <button
                key={key}
                className={className}
                onClick={() => {
                  if (key === 'ENTER') {
                    onEnter()
                  } else if (key === 'DELETE') {
                    onDelete()
                  } else {
                    onChar(key)
                  }
                }}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

