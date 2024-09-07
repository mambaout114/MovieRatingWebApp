import React from 'react';
import { render, waitFor } from '@testing-library/react';
import  MovieList  from '../components/MovieList';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../reducers'; 

jest.mock('./api', () => ({
  fetchMovieData: jest.fn(() => Promise.resolve([])),
}));

describe('MovieList component', () => {
  const store = createStore(rootReducer);
  const movies = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
  ];

  it('renders correctly when there are movies', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MovieList movies={movies} />
      </Provider>
    );
    expect(getByText('Movie 1')).toBeInTheDocument();
    expect(getByText('Movie 2')).toBeInTheDocument();
  });

  it('renders "No Result Found" when there are no movies and a search key is present', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MovieList movies={[]} key="search" />
      </Provider>
    );
    expect(getByText('No Result Found')).toBeInTheDocument();
  });

  it('filters movies correctly based on the search key', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MovieList movies={movies} key="Movie 1" />
      </Provider>
    );
    expect(getByText('Movie 1')).toBeInTheDocument();
    expect(getByText('Movie 2')).not.toBeInTheDocument();
  });

  it('calls the loadMoreMovies function when the user scrolls to the bottom of the page', async () => {
    const loadMoreMovies = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <MovieList movies={movies} loadMoreMovies={loadMoreMovies} />
      </Provider>
    );
    const scrollEvent = new Event('scroll');
    Object.defineProperty(scrollEvent, 'target', {
      value: { scrollHeight: 1000, scrollTop: 1000 },
    });
    window.dispatchEvent(scrollEvent);
    await waitFor(() => expect(loadMoreMovies).toHaveBeenCalledTimes(1));
  });

  it('calls the useEffect hook when the component mounts and unmounts', async () => {
    const useEffect = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <MovieList movies={movies} useEffect={useEffect} />
      </Provider>
    );
    expect(useEffect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(useEffect).toHaveBeenCalledTimes(2));
  });
});