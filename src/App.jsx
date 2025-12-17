import React from 'react'
import { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import {useDebounce} from 'react-use'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
  }

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [loading, setLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setLoading(true)
    setErrorMessage('')
      
      try {
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);
  
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();

        if (data.Response === 'false') {
          setErrorMessage(data.Error || 'Failed to movies')
          setMovieList([])
          return;
        }

        setMovieList(data.results || [])
      } catch (error) {
        console.error(`Error fetching movies: ${error}`)
        setErrorMessage('Error fetching movies.Please try again later')
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm])

  return (
    <main className='max-w-7xl mx-auto p-8 mt-10'>
      <div className='flex flex-col items-center'>
        <img src="./hero.png" alt="hero image" />
      </div>
      <p className='text-white text-4xl text-center font-bold'>Find the <span className='text-zinc-400'>Movies</span><br/> by Yourself.</p>
      <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } />
      <section className='max-w-7xl mx-auto p-8'>
      <h2 className='text-white font-serif text-center text-3xl'>All Movies</h2>
          
            {loading ? <Spinner /> :
            errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) :
              (
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch my-6">
                {movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                  </ul>
              )
          }
          
    </section>
    </main>
    
  )
}

export default App