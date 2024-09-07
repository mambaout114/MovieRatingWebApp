"use client";
import { Image } from "@chakra-ui/react";

interface MoviePosterProps {
  title: string;
  thumbnail: string;
}

/**
 * A movie poster component that takes a title and a thumbnail and renders an image element with the
 * given src and alt attributes.
 *
 * @param {string} title - The title of the movie.
 * @param {string} thumbnail - The URL of the movie thumbnail.
 * @returns {JSX.Element} - The movie poster component.
 */
const MoviePoster = ({ title, thumbnail }: MoviePosterProps): JSX.Element => {
  return <Image src={thumbnail} alt={title} width="45%" />;
};

export default MoviePoster;
