import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Home/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Movie } from './utils/interfaces/objects';
import './index.css';
import Login from './Pages/Login/login';
import ProfilePicker from './Pages/Profile-Picker/profile-picker';
import TitlePage from './Pages/Title-Page/title-page';
import Watchlist from './Pages/Watchlist/watchlist';
import { getMovies, generateMovieRoutes } from './utils/functions/movies';
import Movies from './Pages/Movies/movies';
import ChildrenAndFamily from './Pages/Children-and-Family/children-and-family';
import Search from './Pages/Search/search';
import SignIn from './Pages/Sign-in/sign-in';

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
    ...generateMovieRoutes(movies),
  ];

  const titleRoutes = movies.map((movie) => ({
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
