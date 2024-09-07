import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetail from "../components/MovieDetail";
import { Movie, MovieState } from "../types";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import configureStore from "redux-mock-store";
import { useRouter } from "next/navigation";

// Mock store and initial state
const mockStore = configureStore([]);
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    genre: "Action/Sci-Fi",
    releaseDate: "2010-07-16",
    thumbnail: "https://example.com/inception.jpg",
    ratingList: [5, 4, 5, 3, 4],
    description: ""
  },
];
const initialState: { movies: MovieState } = {
  movies: {
    movies: mockMovies,
    pageNo: 0,
    key: ""
  },
};

// Mock utilities and components
jest.mock("../utils/formattedRating", () => jest.fn(() => "4.2"));
jest.mock("../components/StarRating", () => jest.fn(() => <div>Star Rating Component</div>));

// Mocking the useRouter hook from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("MovieDetail Component", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders movie details correctly", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MovieDetail id={1} movie={mockMovies[0]} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders movie image correctly", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MovieDetail id={1} movie={mockMovies[0]} />
        </ChakraProvider>
      </Provider>
    );

    const imageElement = screen.getByAltText("Inception");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockMovies[0].thumbnail);
  });

  it("renders StarRating component correctly", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MovieDetail id={1} movie={mockMovies[0]} />
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText("Star Rating Component")).toBeInTheDocument();
  });

  it("navigates to home page when the button is clicked", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ChakraProvider>
          <MovieDetail id={1} movie={mockMovies[0]} />
        </ChakraProvider>
      </Provider>
    );

    const button = screen.getByText("Return to Home Page");
    expect(button).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(button);

    // Check if the router's push function was called with "/"
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
