import './Search.css';

function Search() {
    return (
        <div className='search-wraper'>
            <input 
            id='pokemon-name-search' 
            type="text"
            placeholder="Enter Pokeman name...."
             />
        </div>
    )
}

export default Search;