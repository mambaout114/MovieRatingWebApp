import moviesData from '../data/movies.json'; 
/**
 * Fetch movies with pagination and optional search key
 * @param {number} page - The page number to fetch
 * @param {number} pageSize - The number of movies per page
 * @param {string} key - The search key to filter movies
 * @return {Promise} - A promise that resolves to an array of movies
 */
export async function fetchMovieData(
  page: number = 1, 
  pageSize: number = 20, 
  key: string = ""
) {
  const trimmedKey = key.trim().toLowerCase();
  const validPage = Math.max(1, page);
  const validPageSize = Math.max(1, pageSize);
  const filteredMovies = trimmedKey
    ? moviesData.filter(movie => movie.title.toLowerCase().includes(trimmedKey))
    : moviesData;
  const start = (validPage - 1) * validPageSize;
  const end = start + validPageSize;

  return filteredMovies.slice(start, end);
}

/**
 * Fetch a movie by its ID
 * @param {string} id - The ID of the movie to fetch
 * @return {Promise} - A promise that resolves to the movie with the given ID if it exists, otherwise undefined
 */
export const fetchMovieById = async (id: string) => {
  return moviesData.find(movie => movie.id === id);
};
