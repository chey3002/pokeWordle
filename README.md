# PokeWordle

PokeWordle is a game based on the popular word-guessing game Wordle, but with a unique twist: instead of random words, you have to guess the names of Pokémon!

This project is built with React and Tailwind, and is inspired by the [Vida MRR](https://www.youtube.com/watch?v=oe27wXQ9yR4), and [Harry Wolff](https://www.youtube.com/watch?v=t_omcJmOQ_k) videos. I'm also using the [PokeAPI](https://pokeapi.co/) to retrieve information about the Pokémon.

[Play here!](https://chey3002.github.io/pokeWordle/)
## How to Play

The goal of the game is to guess the name of a random Pokémon in just six tries. For each guess, enter the name of the Pokémon you think it is, and the game will show you how many letters match the correct name, and how many of those letters are in the correct position.

If you guess the Pokémon's name correctly in six tries or less, you win! If not, you lose, but you can always try again.

## How to Run the Project

To run the project on your local machine, make sure you have Node.js and npm installed. Then, follow these steps:

1. Clone this repository to your local machine.
2. Open the terminal and navigate to the project's root directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the development server.
5. Open your browser and navigate to `http://localhost:5173/pokeWordle`.

## How to Build the Project

To build the project for production, follow these steps:

1. Clone this repository to your local machine.
2. Open the terminal and navigate to the project's root directory.
3. Run `npm install` to install the dependencies.
4. Run `npm run build` to build the project.
5. The output files will be located in the `dist` directory.

## Using the PokeAPI

The PokeAPI is used to retrieve information about the Pokémon, including their names and images. This information was fetched previously, and stored in a js file on json format.
## Credits

This project was created by [Chey3002](https://github.com/chey3002). Feel free to use and modify this code however you like. If you do something interesting with it, let me know!

