import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const FlickFetch = () => {
  const location = useLocation(); // 1. Catches the data sent from the router

  // 2. Looks for the passed data; if it exists, uses it. If not, starts with a blank string ('')
  const [searchTerm, setSearchTerm] = useState(
    location.state?.initialSearch || "",
  );

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // useRef to detect clicks outside the search area
  const searchContainerRef = useRef(null);

  // Handles the debounced API search
  useEffect(() => {
    // If the search term is empty, clears everything
    if (!searchTerm.trim()) {
      setMovies([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowDropdown(true);

    // Sets a delay (debounce) so the API isn't called on every single keystroke
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://omdbapi.com/?s=${searchTerm.trim()}&page=1&apikey=28f9634c`,
        );
        const data = await response.json();

        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]); // Clear movies if none are found
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms delay

    // Cleanup function to cancel the previous timeout if the user keeps typing
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Handles clicking outside the search area to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Checks if the click is outside the search area and (&&) not on the filter dropdown
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.closest(".filter__class") // <-- This is the new line!
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetches detailed movie info when a user clicks a movie in the dropdown
  const fetchMovieDetails = async (id) => {
    setShowDropdown(false);
    setSearchTerm(""); // Clears search box

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=28f9634c`,
      );
      const details = await response.json();
      setSelectedMovie(details);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Resets button logic
  const clearInput = () => {
    setSearchTerm("");
    setMovies([]);
    setSelectedMovie(null);
    setShowDropdown(false);
    setSortOption("");
  };

  // Derives sorted movies dynamically based on the current sortOption
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "Oldest_To_Newest")
      return parseInt(a.Year) - parseInt(b.Year);
    if (sortOption === "Newest_To_Oldest")
      return parseInt(b.Year) - parseInt(a.Year);
    if (sortOption === "A_To_Z") return a.Title.localeCompare(b.Title);
    if (sortOption === "Z_To_A") return b.Title.localeCompare(a.Title);
    return 0; // Default: No sorting
  });

  return (
    <div className="film__body">
      <div className="film__container">
        <div className="row__header">
          <div className="header">
            <nav>
              <div className="nav__container flick__nav">
                <figure className="nav__logo">
                  <Link to="/">
                    <img
                      className="nav__logo--img"
                      src="/assets/CinemaSifter_logo_img.png"
                      alt="Logo Image"
                    />
                  </Link>
                  <Link to="/">
                    <img
                      className="nav__logo--title white-logo"
                      src="/assets/CinemaSifter_logo_text.png"
                      alt="Logo Name"
                    />
                  </Link>
                </figure>
                <button className="button btn__clear" onClick={clearInput}>
                  RESET
                </button>
              </div>
            </nav>
          </div>

          <div className="search__container" ref={searchContainerRef}>
            <h1 className="film__header--title">Fetch your Flick</h1>
            <div className="search__element">
              <input
                id="movie-search-box"
                className="form__control"
                type="text"
                placeholder="Search Movie by Title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setSelectedMovie(null); // Hide detailed view on focus
                  if (searchTerm.trim().length > 0) setShowDropdown(true);
                }}
              />
              <div className="search__glass">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>

            <div className="list__container">
              {/* Dropdown List */}
              {showDropdown && (
                <div className="search__list">
                  {isLoading ? (
                    <div className="spinner-content">
                      <i className="fas fa-spinner fa-spin spinner-icon"></i>
                    </div>
                  ) : sortedMovies.length > 0 ? (
                    sortedMovies.map((movie) => (
                      <div
                        key={movie.imdbID}
                        className="search__list--item"
                        onClick={() => fetchMovieDetails(movie.imdbID)}
                      >
                        <div className="search__item--thumbnail">
                          <img
                            src={
                              movie.Poster !== "N/A"
                                ? movie.Poster
                                : "/assets/image_not_found.png"
                            }
                            alt="thumbnail"
                          />
                        </div>
                        <div className="search__item--info">
                          <h3>{movie.Title}</h3>
                          <p>{movie.Year}</p>
                        </div>
                      </div>
                    ))
                  ) : searchTerm.trim().length > 0 ? (
                    <div className="spinner-content">No movies found.</div>
                  ) : null}
                </div>
              )}
            </div>
            <div className="header__overlay"></div>
          </div>
        </div>
      </div>

      <div className="movies__container">
        <div className="search__sort">
          <h3 className="search__results--title">Search Results:</h3>
          <select
            id="filter"
            className="filter__class"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option className="filter__option" value="" disabled>
              Sort Your Flicks
            </option>
            <option className="filter__option" value="Oldest_To_Newest">
              Oldest to Newest
            </option>
            <option className="filter__option" value="Newest_To_Oldest">
              Newest to Oldest
            </option>
            <option className="filter__option" value="A_To_Z">
              Alphabetically A -&gt; Z
            </option>
            <option className="filter__option" value="Z_To_A">
              Alphabetically Z -&gt; A
            </option>
          </select>
        </div>

        <div className="result__container">
          <div
            id="result-grid"
            style={{ display: selectedMovie ? "block" : "none" }}
          >
            {selectedMovie && (
              <div className="result__grid">
                <div className="movie-poster">
                  <img
                    src={
                      selectedMovie.Poster !== "N/A"
                        ? selectedMovie.Poster
                        : "/assets/image_not_found.png"
                    }
                    alt="movie poster"
                  />
                </div>
                <div className="movie__info">
                  <h3 className="movie__title">{selectedMovie.Title}</h3>
                  <ul className="movie__misc--info">
                    <li className="year">Year: {selectedMovie.Year}</li>
                    <li className="rated">Ratings: {selectedMovie.Rated}</li>
                    <li className="released">
                      Released: {selectedMovie.Released}
                    </li>
                  </ul>
                  <p className="genre">
                    <b>Genre:</b> {selectedMovie.Genre}
                  </p>
                  <p className="writer">
                    <b>Writer:</b> {selectedMovie.Writer}
                  </p>
                  <p className="actors">
                    <b>Actors: </b>
                    {selectedMovie.Actors}
                  </p>
                  <p className="plot">
                    <b>Plot:</b> {selectedMovie.Plot}
                  </p>
                  <p className="language">
                    <b>Language:</b> {selectedMovie.Language}
                  </p>
                  <p className="awards">
                    <b>
                      <i className="fas fa-award"></i>
                    </b>{" "}
                    {selectedMovie.Awards}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlickFetch;
