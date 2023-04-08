import React, { useState, useEffect } from 'react';

export default function PokemonImage ({ pokemonNumber }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(response => response.json())
            .then(data => setImageUrl(data.sprites.front_default));
    }, [pokemonNumber]);

    if (!imageUrl) {
        return <div></div>;
    }

    return <img className='m-auto' src={imageUrl} alt={`Imagen del Pokémon número ${pokemonNumber}`} />;
}