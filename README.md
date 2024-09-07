**Movie Rating Web App**
==========================

**Table of Contents**
-----------------

1. [Overview](#overview)
2. [Application Structure and File Organization](#application-structure-and-file-organization)
3. [Functionality](#functionality)
4. [Components](#components)
5. [Store and State Management](#store-and-state-management)
6. [API and Data Fetching](#api-and-data-fetching)
7. [Routing and Navigation](#routing-and-navigation)
8. [Styles and Themes](#styles-and-themes)
9. [Testing](#testing)
10. [Getting Started](#getting-started)

**Overview**
------------

The Movie rating web app uses Next.js and TypeScript. The application allows users to view movies, rate them, and see average ratings in a user-friendly and responsive interface.

**Application Structure and File Organization**
---------------------------------------------

The application is structured into the following directories:

* `components`: contains reusable React components
* `pages`: contains Next.js pages
* `public`: contains static assets
* `styles`: contains CSS styles and themes
* `store`: contains Redux store and state management
* `utils`: contains utility functions

The following is an outline of the structure of all files under the `src` folder:

* **app**
	+ `page.tsx` (defines the app's pages)
* **components**
	+ `MovieDetail.tsx` (defines the MovieDetail component)
	+ `MovieList.tsx` (defines the MovieList component)
	+ `MoviePoster.tsx` (defines the MoviePoster component)
	+ `SearchBar.tsx` (defines the SearchBar component)
	+ `StarRating.tsx` (defines the StarRating component)
* **styles**
	+ `theme.ts` (defines the app's theme)
* **store**
	+ `store.ts` (defines the app's store)
	+ `movieSlice.ts` (defines the movies reducer)
* **utils**
	+ `fetchMovieData.ts` (defines the fetchMovieData function)
  	+ `formattedRating.ts` (defines the formattedRating function)
* **types**
	+ `index.ts` (defines the Movie type)

**Functionality**
----------------

The application features the following functionality:

* Search Bar: allows users to search for movies by title.
* Movie List: displays movie thumbnails, titles, average ratings, and "ViewDetails" buttons.
* Movie Poster: displays a larger image of the movie.
* Movie Details: shows the title, genre, release date, and average rating.
* Rating Component: allows users to rate the movie on a scale of 1 to 5 stars.

**Components**
--------------

The application uses the following components:

* `SearchBar`: a search bar component that allows users to search for movies
* `MovieList`: a movie list component that displays a list of movies
* `MoviePoster`: a movie poster component that displays movie posters
* `MovieDetail`: a movie details component that displays movie information and rating
* `StarRating`: a rating component that allows users to rate movies

**Store and State Management**
-----------------------------

The application uses Redux for state management. The store is located in `store/store.js` and contains the following reducers:

* `movies`: manages movie data
* `ratings`: manages rating data

**API and Data Fetching**
-------------------------

The application uses the `fetchMovieData` function in `utils/fetchMovieData.js` to fetch movie data from an API.

**Routing and Navigation**
-------------------------

The application uses Next.js routing and navigation. The `pages` directory contains the following pages:

* `index.js`: the home page
* `[id].js`: the movie details page

**Styles and Themes**
---------------------

The application uses Chakra UI for styling and theming. The `styles` directory contains the following files:

* `theme.js`: the theme file

**Testing**
------------

The application uses Jest for testing. To execute the tests, follow these steps:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the tests with `npm test`

**Getting Started**
-------------------

To get started with the application, follow these steps:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the application with `npm run dev`
4. Open the application in your browser at `http://localhost:3000`
