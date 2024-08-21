export interface Movie {
    title: string,
    mainCast: [string],
    genre: string,
    banner: string,
    ageRating: string,
    rating: number
    description: string
}

export interface Movies {
    movies: Movie[]
}

export interface HomeProps {
    movies: Movie[];
}

export interface PlayerProps {
    trailerUrl: string;
    title: string;
}  

export interface ProfileBubbleProps {
    userName: string;
    userPicture: string;
    onClick: () => void
}

export interface CategorizedMovies {
  [category: string]: Movie[];
}

export const groupMoviesByCategory = (movies: Movie[]): CategorizedMovies => {
  return movies.reduce((acc: CategorizedMovies, movie: Movie) => {
    const category = movie.genre || 'Unknown';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(movie);
    return acc;
  }, {});
};
