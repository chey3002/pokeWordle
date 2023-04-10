import { useEffect, useRef, useState } from 'react'
import { pokeList } from '../../public/json/pokemons'
import RowCompleted from './Rows/rowCompleted';
import RowEmpty from './Rows/rowEmpty';
import RowCurrent from './Rows/rowCurrent';
import { useWindow } from '../hooks/useWindow';
import PokemonImage from './pokemonImage';
import Footer from './footer';
import Header from './header';
import Keyboard from './keyboard';

const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '-', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
export default function Wordle() {
    const [chosenPokemon, setChosenPokemon] = useState({})
    const pokesSameLength = useRef([])
    const [turn, setTurn] = useState(1)
    const [currentWord, setCurrentWord] = useState("")
    const [completedWords, setCompletedWords] = useState([])
    const [gameStatus, setGameStatus] = useState("playing")
    const [animate, setAnimate] = useState(false);
    const letterState = useRef({})



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
        if (gameStatus != "playing") {
            return
        }
        const letter = e.key.toUpperCase()
        if ((e.key === 'Backspace' || e.key ==='←')&& currentWord.length > 0) {
            onDelete()
        }
        if (e.key === 'Enter' ) {
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
            id = id[id.length - 2]
            setChosenPokemon({
                name: selected.name,
                length: selected.name.length,
                id: id
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

    const checkLetter = (letter, i) => {
        const solution = chosenPokemon.name
        if (!solution?.toUpperCase().includes(letter)) {
            letterState.current[letter] = 'absent'
            return 'absent'
        }
        if (solution?.toUpperCase().charAt(i) === letter) {
            letterState.current[letter] = 'correct'
            return 'correct'
        }
        letterState.current[letter] = 'present'

        return 'present'
    }
    return (
        <div className='min-h-screen grid place-items-center bg-slate-700 text-white'>
            <Header />
            <div>
                {completedWords?.map((word, index) => {
                    return <RowCompleted key={index} checkLetter={checkLetter} word={word} solution={chosenPokemon.name} />
                })}
                {(gameStatus != "won" && gameStatus != "lost") && <RowCurrent word={currentWord} solution={chosenPokemon.name} shake={animate} />}
                {Array.from(Array(6 - turn)).map((_, index) => {
                    return <RowEmpty key={index} solution={chosenPokemon.name} />
                })}
                {chosenPokemon.id && <div className={`${gameStatus != "won" && 'hidden'} grid place-content-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2`} >
                    <p className=' m-auto align-middle text-center text-2xl text-green-400'>Congratulations!</p>
                    <PokemonImage pokemonNumber={chosenPokemon.id} />
                </div>}
                {gameStatus === "lost" ? <p className='text-center text-2xl text-red-500'>You lost! the correct pokemon was:"{chosenPokemon.name.toUpperCase()}"</p> : <></>}

                <div className='my-5'>
                    <button className="flex m-auto w-fit px-3 py-2 justify-center border-2 border-blue-600 bg-blue-500 rounded-md p-2 hover:bg-blue-600 active:translate-y-1 active:border-blue-500 transition-all" onClick={handleReset}>Reset</button>
                </div>
                <Keyboard
                    letterState={letterState}
                    handleKeydown={handleKeydown}
                />
            </div>
            <Footer pokesSameLength={pokesSameLength} chosenPokemon={chosenPokemon} />
        </div>
    )
}