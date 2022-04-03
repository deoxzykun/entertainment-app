import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import SearchIcon from './search.svg';

//d9f09e04
const API_URL = 'https://www.omdbapi.com?apikey=d9f09e04';

const movie = {
  "Title": "Batman",
  "Year": "1989",
  "imdbID": "tt0096895",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
}

const App = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('batman');
  },[]);

  return(
    <div className='app'>
      <h1>Deoxzy TV</h1>
      <div className='search'>
        <input
          placeholder='search for movies, shows and anime'
          value={search}
          onChange={(event) => {setSearch(event.target.value)}}
        />
        <img src={SearchIcon} alt='search' onClick={() => searchMovies(search)} />
      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
              {
                movies.map((movie) => (
                  <Card movie={movie} />
                ))
              }
            </div>
          ) : (
            <div className='empty'>
              <h2>No results found!</h2>
            </div>
          )
      }

      
    </div>
  );
}

export default App;