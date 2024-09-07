"use client";
import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMovieRating } from "../store/movieSlice";

interface StarRatingProps {
  rating: number;
  id: number;
}

/**
 * The StarRating component renders a rating component with five stars.
 * It uses the `updateMovieRating` action creator to update the rating of the movie.
 * The component has three states:
 *   - The initial state is that the rating is 0.
 *   - When the user hovers over a star, the `hoveredRating` state is updated to the index of the star.
 *   - When the user clicks on a star, the `rating` state is updated to the index of the star.
 *
 * @param {StarRatingProps} props The component props.
 * @param {number} props.rating The initial rating of the movie.
 * @param {number} props.id The ID of the movie.
 * @returns {JSX.Element} The component element.
 */
const StarRating = ({ rating, id }: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const dispatch = useDispatch();

  /**
   * Handles the event when the user hovers over a star.
   * @param {number | null} index The index of the star that the user is hovering over.
   */
  const handleMouseHover = (index: number | null) => {
    setHoveredRating(index ?? null);
  };

  /**
   * Handles the event when the user clicks on a star.
   * @param {number} index The index of the star that the user clicked on.
   */
  const handleClick = (index: number) => {
    dispatch(updateMovieRating({ id, rating: index }));
  };

  return (
    <Box display="flex" alignItems="center" mt={12}>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((starIndex) => (
        <Tooltip key={starIndex} label={`Rate ${starIndex} star(s)`} placement="top">
          <Box
            as="button"
            onMouseEnter={() => handleMouseHover(starIndex)}
            onMouseLeave={() => handleMouseHover(null)}
            onClick={() => handleClick(starIndex)}
            p={1}
          >
            <Icon
              as={StarIcon}
              boxSize={6}
              color={
                hoveredRating !== null
                  ? starIndex <= hoveredRating
                    ? "yellow.400"
                    : "gray.300"
                  : starIndex <= rating
                    ? "yellow.400"
                    : "gray.300"
              }
              transition="color 0.2s"
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default StarRating;
