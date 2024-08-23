export interface Movie {
    _id: string; 
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