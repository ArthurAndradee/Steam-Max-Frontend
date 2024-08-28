import { Movie } from "../interfaces/objects";

export interface HomeProps {
    movies: Movie[];
}


export interface PlayerProps {
    trailerUrl: string;
    title: string;
}  

export interface ProfileBubbleProps {
    name: string;
    picture: string;
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
  
export interface ProfileEditFormProps {
  currentName: string;
  currentPicture: string;
  onUpdateSuccess: (updatedProfile: { name: string; picture: string }) => void;
  onCancel: () => void;
}

export interface ProfileAddFormProps {
  onCancel: () => void;
}