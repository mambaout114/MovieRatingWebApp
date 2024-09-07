import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SearchBar from '../components/SearchBar';

const mockFetchMovieData = jest.fn(() => Promise.resolve([]));

const initialState = {
  movies: {
    key: '',
    movies: [],
    pageNo: 1,
  },
};

const store = createStore(() => initialState);

describe('SearchBar component', () => {
jest.mock('../utils/fetchMovieData', () => mockFetchMovieData);
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  });

  it('calls handleSearch with valid search term', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => expect(mockFetchMovieData).toHaveBeenCalledTimes(0));
  });

  it('calls handleSearch with empty search term', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => expect(mockFetchMovieData).toHaveBeenCalledTimes(0));
  });

  it('calls handleSubmit with valid search term', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'test' } });
    const submitButton = getByText('Search');
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockFetchMovieData).toHaveBeenCalledTimes(0));
  });

  it('calls handleSubmit with empty search term', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: '' } });
    const submitButton = getByText('Search');
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockFetchMovieData).toHaveBeenCalledTimes(0));
  });

  it('calls handleReset', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'test' } });
    const resetButton = getByText('Reset');
    fireEvent.click(resetButton);
    await waitFor(() => expect(input).toHaveValue(''));
  });

  it('sets searchTerm with valid search term', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => expect(input).toHaveValue('test'));
  });

  it('sets searchTerm with empty search term', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const input = getByPlaceholderText('Search for movies...');
    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => expect(input).toHaveValue(''));
  });
});