import { signUp, login, getUserProfile, logout } from "../utils/auth";

document.addEventListener("DOMContentLoaded", () => {
  fetchTrendingMovies();
});

function fetchTrendingMovies() {
  const apiKey = "02bf7eeb76ad14e4db3c689d31deefccY";
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-card");
    movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" width="150">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
        `;
    moviesContainer.appendChild(movieElement);
  });
}
// 회원가입 처리
document
  .getElementById("signup-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signUp(email, password);
  });

// 로그인 처리
document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  login(email, password);
});

// 프로필 정보 표시
if (document.getElementById("username") && document.getElementById("email")) {
  const user = getUserProfile();
  if (user) {
    document.getElementById("username").textContent = user.email;
    document.getElementById("email").textContent = user.email;
  }
}

// 로그아웃 처리
document.getElementById("logout")?.addEventListener("click", function () {
  logout();
});
