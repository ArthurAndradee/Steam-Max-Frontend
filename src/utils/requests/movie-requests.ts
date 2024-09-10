import axios from 'axios';
import { Movie, Movies } from '../interfaces/objects';

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get('http://localhost:5000/movies/');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies: ', error);
    return [];
  }
};

export const getRandomMovie = (movies: Movies) => {
  if (movies.movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.movies.length);
  return movies.movies[randomIndex];
}