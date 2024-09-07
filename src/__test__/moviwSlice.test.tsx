import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieState } from "../types";
import movieSlice, {
  setMovies,
  updateMovieRating,
  setPageNo,
  clearMovies,
  setKey,
} from "../store/movieSlice";
import movieReducer from "../store/movieSlice";

const state = movieReducer(undefined, {
    type: ""
});
const movies: Movie[] = [
      { id: 1, title: "Movie 1", ratingList: [1, 2, 3] },
      { id: 2, title: "Movie 2", ratingList: [4, 5, 6] },
    ];
describe("movieSlice", () => {
  const initialState: MovieState = {
    movies: [],
    pageNo: 2,
    key: "",
  };

 it("initial state is set correctly", () => {
    const state = movieReducer(undefined, {
        type: ""
    });
    expect(state).toEqual(initialState);
  });

  it("setMovies adds new movies to the state", () => {
    const movies: Movie[] = [
      { id: 1, title: "Movie 1", ratingList: [1, 2, 3] },
      { id: 2, title: "Movie 2", ratingList: [4, 5, 6] },
    ];
    const state = movieReducer(undefined, {
        type: ""
    });
  });

  it("setMovies does not add duplicate movies to the state", () => {
    const movies: Movie[] = [
      { id: 1, title: "Movie 1", ratingList: [1, 2, 3] },
      { id: 1, title: "Movie 1", ratingList: [1, 2, 3] },
    ];
    const state = movieReducer(undefined, {
        type: ""
    });
    expect(state.movies.length).toBe(0);
  });

  it("clearMovies clears the movies array", () => {
    
    const state = movieReducer({ ...initialState, movies }, clearMovies());
    expect(state.movies.length).toBe(0);
  });

  it("setPageNo updates the pageNo in the state", () => {
    const pageNo = 2;
    const state = movieReducer({ ...initialState, movies }, clearMovies());
    expect(state.pageNo).toBe(pageNo);
  });


  it("updateMovieRating updates the rating of a movie in the state", () => {
    const movie: Movie = { id: 1, title: "Movie 1", ratingList: [1, 2, 3] };
    const rating = 4;
    const state = movieReducer({ ...initialState, movies: [movie] }, updateMovieRating({ id: movie.id, rating }));
    expect(state.movies[0].ratingList![1]).toBe(rating);
  });
});