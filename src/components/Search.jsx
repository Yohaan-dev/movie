import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {

  return (
      <search className='max-w-4xl mx-auto my-8'>
          <div className='flex flex-row items-center space-x-4 rounded-md mx-auto px-4 py-3 p-2 w-full bg-blue-950/20 text-white text-lg text-center font-serif'>
          <img src="./search.svg" alt="search" />
              <input
                  type="text"
                  className='w-full focus:outline-none'
              placeholder='Search through thousands of movies'
              value={searchTerm}
              onChange={(e)=> setSearchTerm(e.target.value)}
          />  
          </div>   
          <h1 className='text-white font-serif text-center'>{ searchTerm }</h1>
    </search>
  )
}

export default Search