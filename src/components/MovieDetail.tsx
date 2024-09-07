"use client";
import { Box, Text, VStack, HStack, Tooltip, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import formattedRating from "../utils/formattedRating";
import StarRating from "../components/StarRating";
import { useSelector } from "react-redux";
import { Movie, MovieState } from "../types";
import { useRouter } from "next/navigation";
import MoviePoster from "../components/MoviePoster";

interface MovieDetailProps {
  id: number;
  movie: Movie;
}

interface LabelValueProps {
  movie: Movie;
}

/**
 * The LabelValue component renders a movie's label-value pairs.
 *
 * @param {LabelValueProps} props The component props.
 * @param {Movie} props.movie The movie object.
 * @returns {JSX.Element} The component element.
 */
const LabelValue = ({ movie }: LabelValueProps) => {
  const averageRating = formattedRating(movie.ratingList!);

  return (
    <VStack spacing={2} align="center">
      <Text>Genre: {movie.genre}</Text>
      <Text>Release Date: {movie.releaseDate}</Text>
      <Text>Average Rating: {averageRating}</Text>
      <HStack spacing={1}>
        {[...Array(5)].map((_, i) => (
          <Tooltip
            key={i}
            label={`${averageRating} stars`}
            aria-label="Rating"
          >
            <StarIcon
              color={
                i < Math.round(Number(averageRating)) ? "yellow.400" : "gray.300"
              }
            />
          </Tooltip>
        ))}
      </HStack>
    </VStack>
  );
};

/**
 * The MovieDetail component renders a movie's details and a rating form.
 * If the movie is not found in the store, it falls back to the initial movie.
 * The component also provides a link to return to the home page.
 *
 * @param {MovieDetailProps} props The component props.
 * @param {number} props.id The movie's ID.
 * @param {Movie} props.movie The initial movie.
 * @returns {JSX.Element} The component element.
 */
export default function MovieDetail({ id, movie: initialMovie }: MovieDetailProps) {
  const movies = useSelector((state: { movies: MovieState }) => state.movies.movies);
  const movie = movies.find((m: Movie) => m.id === id) || initialMovie;
  const router = useRouter();

  return (
    <Box mt={8} p={6} display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <MoviePoster thumbnail={movie.thumbnail!} title={movie.title}/>
      <Text fontWeight="bold" fontSize="2xl" mt={4}>
        {movie.title}
      </Text>
      <LabelValue movie={movie} />
      <StarRating rating={movie.ratingList![1] || 0} id={id} />
      <Text>Rate this movie out of 5 stars</Text>
      <Button mt={4} colorScheme="blue" onClick={() => router.push('/')}>
        Return to Home Page
      </Button>
    </Box>
  );
}
