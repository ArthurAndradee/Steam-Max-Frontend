export interface Movie {
    title: string,
    mainCast: [string],
    genre: string,
    banner: string
}

export interface Movies {
    movies: Movie[]
}

export interface PlayerProps {
    trailerUrl: string;
    title: string;
}  