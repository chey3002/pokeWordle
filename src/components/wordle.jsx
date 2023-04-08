import { useEffect, useRef, useState } from 'react'
import { pokeList } from '../../public/json/pokemons'
import RowCompleted from './Rows/rowCompleted';
import RowEmpty from './Rows/rowEmpty';
import RowCurrent from './Rows/rowCurrent';
import { useWindow } from '../hooks/useWindow';
import Pokelist from './pokelist';
import PokemonImage from './pokemonImage';

const keys=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','-','Z','X','C','V','B','N','M']
export default function Wordle() {
    const [chosenPokemon, setChosenPokemon] = useState({})
    const pokesSameLength = useRef([])
    const [turn, setTurn] = useState(1)
    const [currentWord, setCurrentWord] = useState("")
    const [completedWords, setCompletedWords] = useState([])
    const [gameStatus, setGameStatus] = useState("playing")
    const [animate, setAnimate] = useState(false);

    /////////////////////////////
    /////////////////////////////
    //game inputs
    const onInput = (letter) => {
        setCurrentWord(currentWord + letter)
    }
    const onDelete = () => {
        setCurrentWord(currentWord.slice(0, -1))
    }
    const onComplete = () => {
        if (currentWord.toUpperCase() === chosenPokemon.name.toUpperCase()) {
            setCompletedWords([...completedWords, currentWord])
            setGameStatus("won")
            return
        }
        if (turn === 6) {
            console.log("perdistes");
            setCompletedWords([...completedWords, currentWord])
            setGameStatus("lost")
            return
        }
        if (pokesSameLength.current.filter(poke => poke.name.toUpperCase() === currentWord.toUpperCase()).length === 0) {
            setAnimate(true)
            return
        }
        setCompletedWords([...completedWords, currentWord])
        setCurrentWord("")
        setTurn(turn + 1)
    }
    const handleKeydown = (e) => {
        if(gameStatus!="playing"){
            return
        }
        const letter = e.key.toUpperCase()
        if (e.key === 'Backspace' && currentWord.length > 0) {
            onDelete()
        }
        if (e.key === 'Enter' && currentWord.length === chosenPokemon.length) {
            onComplete()
        }
        if (currentWord.length >= chosenPokemon.length) {
            return
        }
        if (keys.includes(letter)) { 
            onInput(letter)
        }
    }
    useWindow('keydown', handleKeydown)
    
    /////////////////////////////
    /////////////////////////////
    //initialization of the game
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
        return random
    }
    function getRandomPokemon() {
        while (true) {
            const poke = pokeList[getRandomInt(0, pokeList.length)]
            if (poke.name.length <= 6) {
                return poke
            }
        }
    }
    const handleReset = () => {
        try {
            const selected = getRandomPokemon()
            let id = selected.url.split("/")
            id=id[id.length-2]
            setChosenPokemon({
                name: selected.name,
                length: selected.name.length,
                id:id
            });
            pokesSameLength.current = pokeList.filter(poke => poke.name.length === selected.name.length)
        } catch (error) {
            console.log(error);
        }
        setTurn(1)
        setCurrentWord("")
        setCompletedWords([])
        setGameStatus("playing")
    }
    useEffect(() => {
        handleReset()
    }, [])
    

    useEffect(() => {
        let timer;
        if (animate) {
            timer = setTimeout(() => {
                setAnimate(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [animate]);


    return (
        <div className='min-h-screen grid place-items-center bg-slate-700 text-white'>
            <h1 className=' text-center font-pokeFont text-5xl md:text-7lx lg:text-9xl text-amber-400 text-shadow-textBlorderBlue'>
                PokeWordle
            </h1>
            <div>
                
                {completedWords?.map((word, index) => {
                    return <RowCompleted key={index} word={word} solution={chosenPokemon.name} />
                })}
                {(gameStatus != "won" && gameStatus != "lost") && <RowCurrent word={currentWord} solution={chosenPokemon.name} shake={ animate} />}
                {Array.from(Array(6 - turn)).map((_, index) => { 
                    return<RowEmpty key={index} solution={chosenPokemon.name} />
                })}
                {gameStatus === "won" ?
                    <div className='grid place-content-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2'>
                    <p className=' m-auto align-middle text-center text-2xl text-green-400'>Congratulations!</p>
                    <PokemonImage pokemonNumber={chosenPokemon.id} />
                </div> :<></>}
                {gameStatus === "lost" ? <p className='text-center text-2xl text-red-500'>You lost! the correct pokemon was:"{chosenPokemon.name.toUpperCase()}"</p> : <></>}
                <div className='my-5'>
                    <button className="flex m-auto w-fit px-3 py-2 justify-center border-2 border-blue-600 bg-blue-500 rounded-md p-2 hover:bg-blue-600 active:translate-y-1 active:border-blue-500 transition-all"  onClick={handleReset}>Reset</button>
                </div>
            </div>
            
            <div className='text-center'>
                <p>The list of pokemon available  are {pokesSameLength.current.length} with the same length ({chosenPokemon.length})</p>
                <p>The max length of the word will be 6</p>
                <p>The list of pokemon used for this app was fetched from the pokeApi at 03/04/2023, so the pokemon names are in English</p>
                <Pokelist pokesSameLength={pokesSameLength} />
                <div className='flex justify-center '><p>Created by: <a href='https://github.com/chey3002' className='text-blue-500'>Chey3002</a>, check a look of the code on <a href='https://github.com/chey3002/pokeWordle' className='text-blue-500'>Github</a></p>
                </div>
              </div>
        </div>
    )
}