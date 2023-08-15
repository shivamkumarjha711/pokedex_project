import axios from "axios";
import { useEffect, useState } from "react"

function usePokemonList(url, type) {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemon() {
        // setIsLoading(true);
        setPokemonListState((state) => ({...state, isLoading: true}));
        const response = await axios.get(pokemonListState.pokedexUrl);      // this downloads list of 20 poemon

        const pokemonResults = response.data.results;       // we get the array of pokemon from result

        console.log("response", response.data.pokemon);
        console.log(response.data);
        setPokemonListState((state) => ({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);

        // iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons
        if (type) {
            setPokemonListState((state) => ({
                ...state,
                pokemonList: response.data.pokemon.slice(0, 5)
            }))
        } else {
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            // passing that promise array to axios.all
            const pokemonData = await axios.all(pokemonResultPromise);   // array of 20 pokemon detailed data
            console.log(pokemonData);

            // now iterate on the data of each pokemon, and extract id, name, image and types
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name, 
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
                    types: pokemon.types
                };
            })
            console.log(pokeListResult);
            setPokemonListState((state) => ({
                ...state, 
                pokemonList: pokeListResult, 
                isLoading: false
            }));
            // setPokemonList(pokeListResult);
            // setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.pokedexUrl])


    return [ pokemonListState, setPokemonListState ]

}

export default usePokemonList