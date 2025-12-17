import React from 'react'

const MovieCard = ({movie: { title, vote_average, poster_path, release_date, original_language}}) => {
    return (
        <div className='p-5 rounded-2xl shadow-inner shadow-white/10 flex flex-col h-full border-l-4 border-blue-50'>
            <div className='overflow-hidden rounded-lg'>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
        </div>
        <div className='mt-4'>
          <h2 className='text-white font-serif'>{title}</h2>
          <div className='flex flex-row items-center gap-4'>
            <img src="/Rating.svg" alt="rating" />
            <p className='text-white font-serif'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            <span className='text-white font-serif'>.</span>
            <p className='text-white font-serif'>{original_language}</p>
            <span className='text-white font-serif'>.</span>
            <p className='text-white font-serif'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
    </div>
  )
}

export default MovieCard