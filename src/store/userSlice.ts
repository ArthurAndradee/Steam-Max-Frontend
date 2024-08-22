import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    password: string | null;
    email: string | null;
    watchlist: string[];
}

const initialState: UserState = {
    password: null,
    email: null,
    watchlist: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    addToWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist.push(action.payload);
    },
    clearUser: (state) => {
      state.email = null;
      state.password = null;
      state.watchlist = [];
    }
  }
});

export const { setUser, addToWatchlist, clearUser } = userSlice.actions;
export default userSlice.reducer;
