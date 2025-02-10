import { loadHeaderFooter } from "./utils.mjs";
import {
  fetchMovies,
  searchMovies,
  getRecommendedMovies,
  fetchTrendingMovies,
  showMovieDetails,
} from "./movies.js";
import { signup, login, updateAuthUI } from "./register.js";

async function initialize() {
  // Load header and footer
  await loadHeaderFooter();

  // Update UI based on login status
  updateAuthUI();

  // Search functionality
  const searchButton = document.getElementById("search_button");
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const query = document.getElementById("search_input").value.toLowerCase();
      searchMovies(query);
    });
  } else {
    console.error("Not found search button");
  }

  // Add event listeners for signup/login submission
  const signupButton = document.getElementById("signup-submit");
  const loginButton = document.getElementById("login-submit");
  // Add event listeners for signup/login buttons
  const signupCloseButton = document.getElementById("signup-close-btn");
  const loginCloseButton = document.getElementById("login-close-btn");

  if (signupButton) signupButton.addEventListener("click", signup);
  if (loginButton) loginButton.addEventListener("click", login);
  if (signupCloseButton)
    signupCloseButton.addEventListener("click", () => {
      document.getElementById("signup-modal").style.display = "none";
    });
  if (loginCloseButton)
    loginCloseButton.addEventListener("click", () => {
      document.getElementById("login-modal").style.display = "none";
    });

  // 회원가입/로그인 모달 열기 버튼 이벤트 등록
  const signupOpenButton = document.getElementById("signup-btn");
  const loginOpenButton = document.getElementById("login-btn");

  if (signupOpenButton)
    signupOpenButton.addEventListener("click", () => {
      document.getElementById("signup-modal").style.display = "block";
    });
  if (loginOpenButton)
    loginOpenButton.addEventListener("click", () => {
      document.getElementById("login-modal").style.display = "block";
    });
}

window.addEventListener("DOMContentLoaded", initialize);

// 영화 추천
getRecommendedMovies({ genre: 28, minRating: 7.0 }); // 예시: '액션' 장르, 평점 7 이상인 영화들 추천

// 페이지 로드 시 트렌드 영화 표시
window.onload = fetchTrendingMovies;

// 영화 카드 클릭 시 상세 정보 표시
document.getElementById("movie-list").addEventListener("click", (event) => {
  if (event.target.closest(".movie-card")) {
    const movieId = event.target.closest(".movie-card").dataset.movieId;
    showMovieDetails(movieId);
  }
});

// 페이지 로드 시 기본 영화 리스트 표시
fetchMovies();
