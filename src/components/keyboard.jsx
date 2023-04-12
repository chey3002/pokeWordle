
import React, { useEffect } from 'react'
const keysLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '-'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
]
export default function Keyboard ({ handleKeydown, letterState }) {
  const [keyboardState, setKeyboadState] = React.useState({})
  useEffect(() => {
    setKeyboadState({ ...letterState.current })
  },
  // this is to make sure that the useEffect runs only when the letters used increases
  [Object.keys(letterState.current).length])
  const getBGColor = (key) => {
    if (key !== '') {
      if (keyboardState[key]) {
        if (keyboardState[key] === 'correct') {
          return ' bg-green-400 '
        }
        if (keyboardState[key] === 'absent') {
          return ' bg-gray-300 '
        }
        if (keyboardState[key] === 'present') {
          return ' bg-yellow-400 '
        }
      } else {
        return ' bg-gray-500 '
      }
    }
  }
  return (
    <div className='flex flex-col'>
      {keysLayout.map((row, i) => {
        return (
          <div className='flex items-center justify-center' key={i}>
            {
                        row.map((key) => {
                          return (
                            <button
                              onClick={() => handleKeydown({ key })}
                              className={`rounded  font-bold p-2 m-1 ${getBGColor(key)} text-white`} key={key}
                            >{key}
                            </button>
                          )
                        })
                    }
          </div>
        )
      }
      )}
    </div>
  )
}
