import React from 'react'
import Box from '../box'

export default function RowEmpty({solution}) {
  return (
      <div className='flex flex-row justify-center '>
          {solution?.split('').map((_, i) => <Box value="" key={i} status="empty" />)}
      </div>
  )
}
