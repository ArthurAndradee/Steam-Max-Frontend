import axios from 'axios';
import { Movie, Movies } from '../interfaces/objects';
import { RouteObject } from 'react-router-dom';
import Player from '../../Pages/Title-Player/player';
import TitlePage from '../../Pages/Title-Page/title-page';

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get('https://streaming-service-backend-muow.onrender.com/movies/');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies: ', error);
    return [];
  }
};

export const generatePlayerRoutes = (movies: Movie[]): RouteObject[] => {
  return movies.map(movie => ({
    path: `/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
    element: (
      <Player 
        trailerUrl={`https://streaming-service-backend-muow.onrender.com/videos/${movie.title.toLowerCase().replace(/\s+/g, '-')}`} 
        title={movie.title} 
      />
    ),
  }));
};

export const generateTitleRoutes = (movies: Movie[]): RouteObject[] => {
  return movies.map(movie => ({
    path: `/titles/${movie.title}`,
    element: (
      <TitlePage
        _id={movie._id}
        title={movie.title}
        mainCast={movie.mainCast}
        genre={movie.genre}
        banner={movie.banner}
        ageRating={movie.ageRating}
        rating={movie.rating}
        description={movie.description}
      />
    )
  }));
};

export const filterMoviesByGenre = (movies: Movie[], genre: string): Movie[] => {
  return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
};

export const getRandomMovie = (movies: Movies) => {
  if (movies.movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.movies.length);
  return movies.movies[randomIndex];
}