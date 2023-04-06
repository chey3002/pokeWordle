import React from 'react'
import Box from '../box'

export default function RowCurrent({word,solution}) {
  return (
      <div className='flex flex-row justify-center '>
        {word.split('').map((letter, index) => {
                return <Box value={letter} key={index} status="edit" />
        })}
          {solution&&Array.from(Array(solution?.length - word?.length)).map((_, index) => {
              return <Box value="" key={index} status="empty" />
          })}
        </div>
  )
}
