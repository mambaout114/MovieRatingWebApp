import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieState } from "../types";

const initialState: MovieState = {
  movies: [],
  pageNo: 2,
  key: "",
};

/**
 * Reducer function for the movie slice.
 * @param {MovieState} state The current state of the movie slice.
 * @param {any} action The action to be handled.
 */
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {

    setMovies: (state, action: PayloadAction<Movie[]>) => {
      const existingMovieIds = new Set(state.movies.map((movie) => movie.id));
      const newMovies = action.payload.filter(
        (movie) => !existingMovieIds.has(movie.id)
      );
      state.movies.push(...newMovies);
    },
    clearMovies: (state) => {
      state.movies = [];
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    updateMovieRating: (
      state,
      action: PayloadAction<{ id: number; rating: number }>
    ) => {
      const movie = state.movies.find((movie) => movie.id === action.payload.id);
        movie!.ratingList![1] = action.payload.rating;
    },
  },
});

export const { setMovies, updateMovieRating, setPageNo, clearMovies, setKey } =
  movieSlice.actions;
export default movieSlice.reducer;
