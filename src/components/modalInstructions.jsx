/* eslint-disable react/prop-types */
import React from 'react'
import Box from './box'

export default function ModalInstructions ({ title }) {
  const [showModal, setShowModal] = React.useState(true)
  return (
    <>
      {showModal
        ? (
          <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                    <h3 className='text-3xl font-semibold text-gray-700'>
                      {title}
                    </h3>
                    <button
                      className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}
                    >
                      <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  <div className='relative p-6 flex-auto'>
                    <div className='text-slate-700'>
                      <h4 className='text-2xl font-bold'>
                        Guess the Wordle in 6 tries.
                      </h4>
                      <ul className='list-disc ml-5'>
                        <li>
                          Each guess must be a valid pokemon name that fits in the
                          black spaces.
                        </li>
                        <li>
                          The color of the tiles will change to show how close
                          your guess was to the word.
                        </li>
                      </ul>
                      <h5 className='text-xl font-bold'>Example</h5>
                      <div className='text-white flex flex-row'>
                        <Box value='Z' status='absent' />
                        <Box value='U' status='absent' />
                        <Box value='B' status='absent' />
                        <Box value='A' status='correct' />
                        <Box value='T' status='absent' />
                      </div>
                      <p className='my-2'>
                        A is in the word and in the correct spot.
                      </p>
                      <div className='text-white flex flex-row'>
                        <Box value='D' status='present' />
                        <Box value='I' status='absent' />
                        <Box value='T' status='absent' />
                        <Box value='T' status='absent' />
                        <Box value='O' status='absent' />
                      </div>
                      <p className='my-2'>
                        D is in the word but in the wrong spot.
                      </p>
                      <p className='my-2'>
                        The letters on gray are not in the word
                      </p>
                      <p className='my-2'>
                        <b>Remember</b>, you can click on the Show Pokemon List
                        button at the bottom of the screen to see the possible
                        pokemon names
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                    <button
                      className='text-blue-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black' />
          </>
          )
        : null}
    </>
  )
}
