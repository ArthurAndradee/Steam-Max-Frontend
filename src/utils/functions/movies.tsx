import axios from 'axios';
import { Movie } from '../interfaces/objects';
import { RouteObject } from 'react-router-dom';
import Player from '../../Pages/Title-Player/player';

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get('http://localhost:5000/movies/');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies: ', error);
    return [];
  }
};

export const generateMovieRoutes = (movies: Movie[]): RouteObject[] => {
  return movies.map(movie => ({
    path: `/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
    element: (
      <Player 
        trailerUrl={`http://localhost:5000/videos/${movie.title.toLowerCase().replace(/\s+/g, '-')}`} 
        title={movie.title} 
      />
    ),
  }));
};