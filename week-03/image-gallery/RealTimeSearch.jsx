import {useState} from 'react';
import animeList from './data/animeList.js';

function RealTimeSearch(){
    
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [favourites, setFavourites] = useState([]);

    const handleKeyDown = (e) =>{
         if(e.key==='Escape'){
            setInputValue('');
        }

        if(e.key==='Enter' && filtered.length > 0){
           toggleFavourite(filtered[0].id);
        }
    };

    const handleChange = (e) =>{
        setInputValue(prev => e.target.value);
        console.log(`Value right now is ${e.target.value} and ${inputValue}`);
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
        console.log(`Filter is now ${filter} and ${e.target.value}`);
    }

    const toggleFavourite = (id) => {
        setFavourites(prev => prev.includes(id) ? prev.filter(prev => prev !== id) : [...prev, id]);
        console.log(`Favourites ${favourites}`);
    };

    const filtered = animeList.filter(prev =>
        (prev.name.toLowerCase().includes(inputValue.toLowerCase())
        &&
        (filter === 'all' || prev.category === filter)
      ));

    return(
    <>
    <div>
        <h2>Real Time Search for Anime</h2>
        <input 
            value = {inputValue}
            type = "text"
            placeholder = "Search for anything here"
            onChange = {handleChange}
            onKeyDown = {handleKeyDown}
        />
        <button>Select</button>
        <select value={filter} onChange = {handleFilter}>
            <option value ="all">all</option>
            <option value ="action">action</option>
            <option value ="thriller">thriller</option>
            <option value ="drama">drama</option>
            <option value ="fantasy">fantasy</option>
        </select>

      {filtered.map((anime)=>(
        <div key={anime.id}>
            <h3>{anime.name}</h3>
            <p>Category: {anime.category}</p>
            <img src={anime.image} />
            <button onClick = {(e) => toggleFavourite(anime.id)}>Favourite</button>
        </div>
      ))};
    </div>
    </>);
}

export default RealTimeSearch;