import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home romanceMovies={romanceMovies} fantasyMovies={fantasyMovies} horrorMovies={horrorMovies} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to   start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();