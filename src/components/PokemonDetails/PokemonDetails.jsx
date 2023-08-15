import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'
import usePokemonList from "../hooks/usePokemonList.js";

function PokemonDetails() {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        let pokemonListHookResponse = [];
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        });
        pokemonListHookResponse = usePokemonList(`https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : 'fire'}`, true);
    }


    useEffect(() => {
        downloadPokemon();
        console.log("List", pokemonListHookResponse.pokemonListState);
    }, []);


    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} />
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">Height: {pokemon.height}</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>

            {pokemon.types &&
                <div>
                    More {pokemon.types[0]} type pokemons
                    <ul>
                        {pokemonListHookResponse && pokemonListHookResponse.pokemonListState.pokemonList && pokemonListHookResponse.pokemonListState.pokemonList.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
            }
        </div>
    )
}

export default PokemonDetails