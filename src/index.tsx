import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import ProfilePicker from './Pages/Profile-Picker/profile-picker';
import Watchlist from './Pages/Watchlist/watchlist';
import Movies from './Pages/Movies/movies';
import ChildrenAndFamily from './Pages/Children-and-Family/children-and-family';
import Search from './Pages/Search/search';
import SignIn from './Pages/Sign-in/sign-in';
import { getMovies } from './utils/requests/movie-requests';
import { generatePlayerRoutes, generateTitleRoutes } from './helpers/movies-helper';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Movie } from './utils/interfaces/objects';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, []);

  const movieRoutes = [
    ...generatePlayerRoutes(movies),
  ];

  const titleRoutes = [
    ...generateTitleRoutes(movies),
  ]

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <SignIn />
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
      path: '/search',
      element: <Search movies={movies} />,
    },
    {
      path: '/movies',
      element: <Movies movies={movies} />,
    },
    {
      path: '/children-and-family',
      element: <ChildrenAndFamily movies={movies} />,
    },
    {
      path:'/watchlist',
      element:<Watchlist />, 
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
