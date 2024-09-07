
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { fetchMovieData } from '../utils/fetchMovieData';

export default async function HomePage() {
  const movies = await fetchMovieData(1);

  return (
    <>
      <SearchBar />
      <MovieList movies={movies} />
    </>
  );
}
