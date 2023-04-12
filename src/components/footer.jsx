
import Pokelist from './pokelist'

export default function Footer ({ pokesSameLength, chosenPokemon }) {
  return (
    <div className='text-center'>
      <p>The list of pokemon available  are {pokesSameLength.current.length} with the same length ({chosenPokemon.length})</p>
      <p>The max length of the word will be 6</p>
      <p>The list of pokemon used for this app was fetched from the pokeApi at 03/04/2023, so the pokemon names are in English</p>
      <Pokelist pokesSameLength={pokesSameLength} />
      <div className='flex justify-center '><p>Created by: <a href='https://github.com/chey3002' className='text-blue-500'>Chey3002</a>, check a look of the code on <a href='https://github.com/chey3002/pokeWordle' className='text-blue-500'>Github</a></p>
      </div>
    </div>
  )
}
