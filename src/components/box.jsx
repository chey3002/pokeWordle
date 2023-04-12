import React from 'react'

export default function Box ({ value, status }) {
  function boxStyle (status) { // posible status: correct, present, absent, empty, edit
    if (status === 'correct') {
      return 'bg-green-500 border-2 border-green-400'
    }
    if (status === 'present') {
      return 'bg-yellow-500 border-2 border-yellow-400'
    }
    if (status === 'absent') {
      return 'bg-gray-500 border-2 border-gray-400'
    }
    if (status === 'empty') {
      return 'bg-black border-2 border-gray-400 animate'
    }
    if (status === 'edit') {
      return 'bg-black border-2 border-gray-400 '
    }
  }
  const boxClass = `uppercase w-16 h-16 flex text-4xl justify-center items-center ${boxStyle(status)}`
  return (
    <div className={boxClass}>
      {value}
    </div>
  )
}
