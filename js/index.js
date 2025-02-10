import {
  fetchMovies,
  getRecommendedMovies,
  fetchTrendingMovies,
  showMovieDetails,
} from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {
  // 페이지 로드 시 기본 영화 리스트 표시
  fetchMovies();
  fetchTrendingMovies();

  // 영화 추천 - 예시: '액션' 장르, 평점 7 이상인 영화들 추천
  //   getRecommendedMovies({ genre: 28, minRating: 7.0 });

  // 영화 카드 클릭 이벤트
  document.getElementById("movie-list").addEventListener("click", (event) => {
    if (event.target.closest(".movie-card")) {
      const movieId = event.target.closest(".movie-card").dataset.movieId;
      showMovieDetails(movieId);
    }
  });
});
