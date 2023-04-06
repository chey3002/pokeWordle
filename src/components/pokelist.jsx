import React, { useState } from 'react'

export default function Pokelist({ pokesSameLength }) {
    const [showPokelist, setShowPokelist] = useState(false)
    const pokelistVisivility = () => {
        if (showPokelist) return 'grid'
        return 'hidden'
    }
  return (
    <div className='flex flex-col justify-center'>
                    <div>
                        <button className='flex m-auto w-fit px-3 py-2 justify-center border-b  rounded-md  active:translate-y-1  transition-all' onClick={() => setShowPokelist(!showPokelist)}>{showPokelist ? 'Hide' : 'Show'} Pokemon List</button>
                    </div>
                    <div className={`mt-5 ${pokelistVisivility()} transition-all`}>
                        <ul className='text-start grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 '>
                            {pokesSameLength.current.map((poke, index) => {
                                return <li key={index} className='text-left'>{poke.name.toUpperCase()}</li>
                            })}
                        </ul>
                    </div>
                </div>
                
  )
}
