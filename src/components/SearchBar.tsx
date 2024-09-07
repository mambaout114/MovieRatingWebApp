'use client';
import { Box, Input, Button } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieData } from '../utils/fetchMovieData';
import { setMovies, clearMovies, setKey, setPageNo } from '../store/movieSlice';
import { MovieState } from '../types';
import { useState } from 'react';

/**
 * The SearchBar component renders a form with an input and two buttons.
 * When the user submits the form, the component dispatches the setKey, setPageNo, and clearMovies actions.
 * Then, it fetches the movies based on the search term and dispatches the setMovies action.
 * The component also provides a reset button to clear the search term and reset the movies list.
 *
 * @returns {JSX.Element} The component element.
 */
export default function SearchBar() {
  const dispatch = useDispatch();
  const key = useSelector((state: { movies: MovieState }) => state.movies.key);
  const [searchTerm, setSearchTerm] = useState(key || '');

  /**
   * Debounced function to fetch the movies based on the search term.
   * The function is called with the search term when the user submits the form.
   * It dispatches the setKey, setPageNo, and clearMovies actions.
   * Then, it fetches the movies based on the search term and dispatches the setMovies action.
   */
  const handleSearch = debounce(
    async (value: string) => {
      dispatch(setKey(value || ''));
      dispatch(setPageNo(1));
      dispatch(clearMovies());
      const movies: any = await fetchMovieData(1, 20, value);
      dispatch(setMovies(movies));
    },
    300,
    { leading: true, trailing: false }
  );

  const handleReset = () => {
    setSearchTerm('');
    handleSearch('');
  };

  return (
    <Box mb={8} mt={8} style={{ display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchTerm);
        }}
        style={{ display: 'flex', width: '50%' }}
      >
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          border="1px solid #E2E8F0"
          placeholder="Search for movies..."
          mr={2}
        />
        <Button type="submit" colorScheme="blue" mr={2}>
          Search
        </Button>
        <Button type="button" onClick={handleReset} colorScheme="red">
          Reset
        </Button>
      </form>
    </Box>
  );
}
