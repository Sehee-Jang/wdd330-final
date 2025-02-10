import { getMovieDetails, getMovieCredits } from "./movies.js";

// Get movie ID from URL
function getMovieIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Render movie details
function renderMovieDetail(movie, cast) {
  const detailWrap = document.querySelector(".detailWrap");

  if (!movie) {
    detailWrap.innerHTML = "<p>Unable to load movie details.</p>";
    return;
  }

  detailWrap.innerHTML = `
    <div class="movie-detail">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }" class="poster">
      <div class="detail-info">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p><strong>Genres:</strong> ${movie.genres
          .map((g) => g.name)
          .join(", ")}</p>
        <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
        <p><strong>Age Restriction:</strong> ${
          movie.adult ? "18+ (Restricted)" : "All Ages"
        }</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
      </div>
    </div>

     <h3>Cast</h3>
    <div class="cast-list">
      ${cast
        .map(
          (actor) => `
        <div class="actor">
          <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}">
          <p><strong>${actor.name}</strong></p>
          <p>${actor.character}</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Fetch and display movie details
document.addEventListener("DOMContentLoaded", () => {
  const movieId = getMovieIdFromURL();
  if (movieId) {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=02bf7eeb76ad14e4db3c689d31deefcc`
    )
      .then((response) => response.json())
      .then((movie) => renderMovieDetail(movie))
      .catch((error) => console.error("Error fetching movie details:", error));
  } else {
    document.querySelector(".detailWrap").innerHTML =
      "<p>Movie ID not found.</p>";
  }
});

// Fetch movie and cast information
document.addEventListener("DOMContentLoaded", async () => {
  const movieId = getMovieIdFromURL();
  if (movieId) {
    try {
      const [movie, cast] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
      ]);
      renderMovieDetail(movie, cast);
    } catch (error) {
      console.error("Error loading movie details:", error);
      document.querySelector(".detailWrap").innerHTML =
        "<p>Unable to load movie details.</p>";
    }
  } else {
    document.querySelector(".detailWrap").innerHTML =
      "<p>Movie ID not found.</p>";
  }
});
