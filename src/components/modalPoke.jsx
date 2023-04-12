/* eslint-disable react/jsx-closing-tag-location */
import React, { useEffect } from 'react'
import PokemonImage from './pokemonImage'

export default function ModalPoke ({ title, active, chosenPokemon, gameStatus }) {
  const [showModal, setShowModal] = React.useState(false)
  useEffect(() => {
    if (gameStatus === active) {
      setShowModal(true)
    }
  }, [gameStatus])
  const getColor = () => {
    if (active === 'won') return ' text-green-700 '
    if (active === 'lost') return ' text-red-700 '
  }
  return (
    <>
      {showModal
        ? (<>
          <div
            className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
          >
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/* content */}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/* header */}
                <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className={`text-3xl font-semibold ${getColor()}`}>
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
                {/* body */}
                <div className='relative p-6 flex-auto'>
                  <div className='text-slate-700'>
                    <p>The pokemon was <b>{chosenPokemon.name.toUpperCase()}</b></p>
                    <PokemonImage pokemonNumber={chosenPokemon.id} />
                  </div>
                </div>
                {/* footer */}
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
          </>)
        : null}
    </>
  )
}
