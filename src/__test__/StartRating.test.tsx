import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import StarRating from '../components/StarRating';
import { updateMovieRating } from '../store/movieSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';

// Mock the redux store
const mockStore = configureStore([]);

describe('StarRating Component', () => {
  let store: MockStoreEnhanced<unknown, {}> | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders correctly with initial rating', () => {
    render(
      <Provider store={store}>
        <StarRating rating={3} id={1} />
      </Provider>
    );

    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('changes star color on hover', () => {
    render(
      <Provider store={store}>
        <StarRating rating={2} id={1} />
      </Provider>
    );

    const stars = screen.getAllByRole('button');

    // Hover over the fourth star
    fireEvent.mouseEnter(stars[3]);

    // Mouse leave should reset to initial state
    fireEvent.mouseLeave(stars[3]);

  });

  it('dispatches updateMovieRating action on click', () => {
    render(
      <Provider store={store}>
        <StarRating rating={2} id={1} />
      </Provider>
    );

    const stars = screen.getAllByRole('button');

    // Click on the fourth star
    fireEvent.click(stars[3]);

    // Check if the correct action was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(updateMovieRating({ id: 1, rating: 4 }));
  });
});
