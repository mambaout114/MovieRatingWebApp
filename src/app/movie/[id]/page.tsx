import { fetchMovieById } from "../../../utils/fetchMovieData";
import MovieDetail from "../../../components/MovieDetail";
import { VStack, Icon, Text } from "@chakra-ui/react";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await fetchMovieById(params.id);
  if (!movie) {
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
    <>
      <MovieDetail movie={movie} id={params.id}></MovieDetail>
    </>
  );
}
