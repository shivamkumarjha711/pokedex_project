import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon.jsx';
import usePokemonList from '../hooks/usePokemonList.js';

function PokemonList() {

    const [ pokemonListState, setPokemonListState ] = usePokemonList('https://pokeapi.co/api/v2/pokemon', false);

    return (
        <div className='pokemon-list-wraper'>
            <div className='pokemon-wrapper'>
                {(pokemonListState.isLoading) ? 'Loading....' : 
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className='controlls'>
                <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})}>Prev</button>
                <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})}>Next</button>
            </div>
        </div>
    )
}

export default PokemonList
