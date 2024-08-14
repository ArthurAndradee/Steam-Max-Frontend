export interface Movie {
    title: string,
    mainCast: [string],
    genre: string,
    banner: string
}

export interface Movies {
    movies: Movie[]
}

export interface TrailerPlayerProps {
    trailerUrl: string;
    title: string;
}  