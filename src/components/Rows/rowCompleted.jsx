import React from 'react'
import Box from '../box'

export default function RowCompleted({ word, solution }) {
    const checkLetter = (letter,i) => {
        console.log(i);
        if (!solution?.toUpperCase().includes(letter)) return 'absent'
        if (solution?.toUpperCase().charAt(i) === letter) return 'correct'
        return 'present'
    }
    
  return (
      <div className='flex flex-row justify-center '>
          {word?.split('').map((letter, i) => {
              return (<Box key={i} value={letter} status={checkLetter(letter,i)} />)
          })}
      </div>
  )
}
