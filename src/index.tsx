import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/home';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Player from './Pages/Player/player';
import { Movie } from './utils/interfaces';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const fetchMoviesByCategory = async (category: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`http://localhost:5000/movies/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
};

const App = () => {
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [romance, fantasy, horror] = await Promise.all([
        fetchMoviesByCategory('Romance'),
        fetchMoviesByCategory('Fantasy'),
        fetchMoviesByCategory('Horror'),
      ]);
      setRomanceMovies(romance);
      setFantasyMovies(fantasy);
      setHorrorMovies(horror);
    };

    fetchMovies();
  }, []);

  const generateMovieRoutes = (movies: Movie[]): RouteObject[] => {
    return movies.map(movie => ({
      path: `/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
      element: <Player trailerUrl={`http://localhost:5000/videos/${movie.title.toLowerCase().replace(/\s+/g, '-')}`} title={movie.title} />,
    }));
  };

  const movieRoutes = [
    ...generateMovieRoutes(romanceMovies),
    ...generateMovieRoutes(fantasyMovies),
    ...generateMovieRoutes(horrorMovies),
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home romanceMovies={romanceMovies} fantasyMovies={fantasyMovies} horrorMovies={horrorMovies} />,
    },
    ...movieRoutes,
  ]);

  return <RouterProvider router={router} />;
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
