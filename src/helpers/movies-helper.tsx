import { RouteObject } from "react-router";
import TitlePage from "../Pages/Title-Page/title-page";
import Player from "../Pages/Title-Player/player";
import { Movie } from "../utils/interfaces/objects";

export const generatePlayerRoutes = (movies: Movie[]): RouteObject[] => {
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