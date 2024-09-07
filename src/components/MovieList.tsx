"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Image, Text, VStack, HStack, Tooltip, SimpleGrid, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import debounce from "lodash/debounce";
import Link from "next/link";
import formattedRating from "../utils/formattedRating";
import { fetchMovieData } from "../utils/fetchMovieData";
import { setMovies, setPageNo } from "../store/movieSlice";
import { Movie, MovieState } from "../types";

interface MovieListProps {
  movies: Movie[];
}
/**
 * The MovieCard component renders a single movie item in the list.
 * The component receives a movie object as a prop and renders its title, rating, and thumbnail.
 * When the user clicks on the movie item, the component redirects to the movie details page.
 *
 * @param {Movie} movie The movie object to render.
 * @returns {JSX.Element} The component element.
 */
const MovieCard = ({ movie }: { movie: Movie }) => {
  const averageRating = formattedRating(movie.ratingList);

  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        border="1px solid #E2E8F0"
        width="250px"
        height="600px"
        _hover={{ boxShadow: "lg" }}
        transition="box-shadow 0.3s ease"
      >
        <Image
          src={movie.thumbnail}
          alt={movie.title}
          style={{
            width: "100%",
            height: "350px",
          }}
          loading="lazy"
        />
        <Box p="6">
          <Text fontWeight="bold" fontSize="2xl">
            {movie.title}
          </Text>
          <VStack align="start" mt={2}>
            <Text fontSize="xl">Rating: {averageRating}</Text>
            <HStack spacing={0.5}>
              {Array.from({ length: 5 }, (_, i) => (
                <Tooltip
                  key={i}
                  label={`${averageRating} stars`}
                  aria-label="Rating"
                >
                  <StarIcon
                    color={i < Math.round(Number(averageRating)) ? "yellow.400" : "gray.300"}
                  />
                </Tooltip>
              ))}
            </HStack>
          </VStack>
          <Text mt={2} color="blue.500">
            View Details
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

/**
 * The MovieList component renders a list of movies based on the provided movies prop.
 * If a search key is provided, the movies are filtered based on the search key.
 * The component also loads more movies on scroll and updates the page number.
 *
 * @param {MovieListProps} props The component props.
 * @param {Movie[]} props.movies The list of movies to render.
 * @param {string} [props.key] The search key to filter the movies.
 * @returns {JSX.Element} The component element.
 */
export default function MovieList({ movies: initialMovies }: MovieListProps) {
  const dispatch = useDispatch();
  const { movies, pageNo, key } = useSelector(
    (state: { movies: MovieState }) => state.movies
  );
  const filteredMovies = key
    ? initialMovies.filter((movie) =>
      movie.title.toLowerCase().includes(key.trim().toLowerCase())
    )
    : initialMovies;

  useEffect(() => {
    if (pageNo === 2 && movies.length === 0 && filteredMovies.length > 0) {
      dispatch(setMovies(filteredMovies));
    }
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        dispatch(setPageNo(pageNo + 1));
        fetchMovieData(pageNo + 1, 20, key).then((newMovies) =>
          dispatch(setMovies(newMovies))
        );
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [movies.length, filteredMovies, pageNo, dispatch, key]);

  if (0 === movies.length && key) {
    return (
      <VStack spacing={4} align="center" justify="center" height="100vh">
        <Icon boxSize={12} color="gray.500" />
        <Text fontSize="lg" color="gray.600">
          No Result Found
        </Text>
      </VStack>
    );
  }
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      minChildWidth="240px"
      ml={4}
      mr={4}
      spacing={4}
      mb={8}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
}

