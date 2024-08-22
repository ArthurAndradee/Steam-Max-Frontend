import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../utils/interfaces';

interface WatchlistState {
  movies: Movie[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist(state, action: PayloadAction<Movie>) {
      state.movies.push(action.payload);
    },
    removeFromWatchlist(state, action: PayloadAction<string>) {
      state.movies = state.movies.filter(movie => movie.title !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
