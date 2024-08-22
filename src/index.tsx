import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/home';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Player from './Pages/Title-Player/player';
import { Movie } from './utils/interfaces';
import './index.css';
import Login from './Pages/Login/welcome';
import ProfilePicker from './Pages/Profile-Picker/profile-picker';
import axios from 'axios';
import TitlePage from './Pages/Title/title-page';
import Watchlist from './Pages/Watchlist/watchlist';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(()=> {
    getMovies()
  },[])
  
  const getMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/movies/')
      setMovies(response.data)
    } catch (error) {
      console.error('Erro ferching products: ', error)
    }
  }

  const generateMovieRoutes = (movies: Movie[]): RouteObject[] => {
    return movies.map(movie => ({
      path: `/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`,
      element: <Player trailerUrl={`http://localhost:5000/videos/${movie.title.toLowerCase().replace(/\s+/g, '-')}`} title={movie.title} />,
    }));
  };

  const movieRoutes = [
    ...generateMovieRoutes(movies),
  ];

  const titleRoutes = movies.map((movie) => ({
    path: `/titles/${movie.title}`,
    element: (
      <TitlePage 
        title={movie.title} 
        mainCast={movie.mainCast} 
        genre={movie.genre} 
        banner={movie.banner} 
        ageRating={movie.ageRating} 
        rating={movie.rating} 
        description={movie.description} 
      />
    )
  }))
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/profile-picker',
      element: <ProfilePicker />
    },
    {
      path: '/home',
      element: <Home movies={movies} />,
    },
    {
      path:'/watchlist',
      element:<Watchlist />
    },
    ...movieRoutes,
    ...titleRoutes,
  ]);

  return <RouterProvider router={router} />;
};

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();
