import React from 'react'
import Box from '../box'

export default function RowCompleted({ word, checkLetter }) {

    
  return (
      <div className='flex flex-row justify-center '>
          {word?.split('').map((letter, i) => {
              return (<Box key={i} value={letter} status={checkLetter(letter,i)} />)
          })}
      </div>
  )
}
