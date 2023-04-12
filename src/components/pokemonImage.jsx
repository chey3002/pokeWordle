import React, { useState, useEffect } from 'react'

export default function PokemonImage ({ pokemonNumber }) {
  const [imageUrl, setImageUrl] = useState(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`)

  // useEffect(() => {
  //     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
  //         .then(response => response.json())
  //         .then(data => setImageUrl(data.sprites.front_default));
  // }, [pokemonNumber]);
  useEffect(() => {
    setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`)
  }, [pokemonNumber])
  if (!pokemonNumber) {
    return <div />
  }

  return <img className='m-auto' src={imageUrl} alt={`Imagen del Pokémon número ${pokemonNumber}`} />
}
