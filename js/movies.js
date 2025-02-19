const API_KEY = "02bf7eeb76ad14e4db3c689d31deefcc";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;

// 영화 리스트 가져오기
export function fetchMovies() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const movieList = data.results;
      const movieListContainer = document.getElementById("movie-list");
      movieListContainer.innerHTML = ""; // 기존 내용 제거

      movieList.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieListContainer.appendChild(movieCard);
      });
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

// 영화 카드 생성
export function createMovieCard(movie) {
  const movieCard = document.createElement("li");
  movieCard.className = "movie-card";
  movieCard.innerHTML = `
    <a href="#" class="movie_list_info">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}" class="poster">
      <div class="wrap" style="display:none; opacity: 1;">
        <h3 class="title">${movie.title}</h3>
        <div class="summary">${movie.overview}</div>
        <div class="score">
          <div class="preview">
            <p class="tit">Rates</p>
            <p class="number"><span class="ir">⭐️</span>${movie.vote_average}</p>   
          </div>
        </div>
      </div>
    </a>
  `;
  // 마우스 오버 및 마우스 아웃 이벤트 리스너 추가
  const movieListInfo = movieCard.querySelector(".movie_list_info");
  movieListInfo.addEventListener("mouseover", function () {
    this.querySelector(".wrap").style.display = "block";
  });
  movieListInfo.addEventListener("mouseout", function () {
    this.querySelector(".wrap").style.display = "none";
  });

  // 영화 카드 클릭 시 alert
  movieCard.addEventListener("click", () => {
    // 클릭 시 상세 페이지로 이동
    window.location.href = `wdd330-final/pages/details.html?id=${movie.id}`;
  });

  return movieCard;
}

// 영화 리스트 표시 함수
export function displayMovies(movies) {
  const movieListContainer = document.getElementById("movie-list");

  movieListContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieListContainer.appendChild(movieCard);
  });
}

// 기존 검색 기능
// export function searchMovies(query) {
//   fetch(API_URL)
//     .then((response) => response.json())
//     .then((data) => {
//       const movieList = data.results.filter((movie) =>
//         movie.title.toLowerCase().includes(query)
//       );
//       const movieListContainer = document.getElementById("movie-list");
//       movieListContainer.innerHTML = "";

//       movieList.forEach((movie) => {
//         const movieCard = createMovieCard(movie);
//         movieListContainer.appendChild(movieCard);
//       });
//     })
//     .catch((error) => console.error("Error searching movies:", error));
// }

// 검색 기능 강화: 장르, 배우, 제목 등
// 장르, 배우, 제목 등으로 영화 검색
// export function searchMovies(query, genre = "", actor = "") {
//   // const searchUrl = `${API_URL}&query=${query}`;
//   const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

//   fetch(searchUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const filteredMovies = data.results.filter((movie) => {
//         return (
//           movie.title.toLowerCase().includes(query.toLowerCase()) &&
//           (genre ? movie.genre_ids.includes(genre) : true) &&
//           (actor ? movie.cast.includes(actor) : true)
//         );
//       });
//       displayMovies(filteredMovies);
//     })
//     .catch((error) => console.error("Error searching movies:", error));
// }

export function searchMovies(query, genre = "", actor = "") {
  let searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  // Apply genre filter if genre is specified (TMDb 장르 ID 필요)
  if (genre) {
    searchUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`;
  }

  // Execute movie title search
  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      let filteredMovies = data.results;

      // Apply actor search filter (search for actor by name, get ID, then get movies they acted in)
      if (actor) {
        fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${actor}`)
          .then((response) => response.json())
          .then((actorData) => {
            if (actorData.results.length > 0) {
              const actorId = actorData.results[0].id; // Get the actor's ID from the first result
              fetch(
                `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_cast=${actorId}`
              )
                .then((response) => response.json())
                .then((actorMovies) => {
                  // Combine actor search results with the title/genre results
                  const actorMoviesList = actorMovies.results;
                  filteredMovies = filteredMovies.filter((movie) =>
                    actorMoviesList.some(
                      (actorMovie) => actorMovie.id === movie.id
                    )
                  );
                  displayMovies(filteredMovies);
                });
            } else {
              displayMovies(filteredMovies); // If no actor results, display only title/genre search results
            }
          });
      } else {
        displayMovies(filteredMovies);
      }
    })
    .catch((error) => console.error("Error searching movies:", error));
}

/* *****************************
 * Recommended Movies
 * ***************************** */
// 영화 추천 알고리즘
export function getRecommendedMovies(userPreferences) {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const recommendedMovies = data.results.filter((movie) => {
        // 장르와 평점을 기준으로 필터링
        return (
          movie.genre_ids.includes(userPreferences.genre) &&
          movie.vote_average >= userPreferences.minRating
        );
      });

      displayMovies(recommendedMovies);
    })
    .catch((error) =>
      console.error("Error fetching recommended movies:", error)
    );
}

/* *****************************
 * Trending Movies
 * ***************************** */
export function fetchTrendingMovies() {
  const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;

  fetch(trendingUrl)
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => console.error("Error fetching trending movies:", error));
}

/* *****************************
 * Movie Overview
 * ***************************** */
export function showMovieDetails(movieId) {
  const movieDetailsUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

  fetch(movieDetailsUrl)
    .then((response) => response.json())
    .then((movie) => {
      const movieDetailsContainer = document.getElementById("movie-details");
      movieDetailsContainer.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <p>Rating: ${movie.vote_average}</p>
        <p>Cast: ${movie.cast}</p>
      `;
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

/* *****************************
 * Movie Detail
 * ***************************** */
/**
 * 특정 영화의 상세 정보를 가져오는 함수
 * @param {string} movieId - 영화 ID
 * @returns {Promise<Object>} - 영화 상세 정보
 */
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("영화 정보를 불러올 수 없습니다.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

/**
 * 특정 영화의 출연진 정보를 가져오는 함수
 * @param {string} movieId - 영화 ID
 * @returns {Promise<Array>} - 출연진 목록
 */
export async function getMovieCredits(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("출연진 정보를 불러올 수 없습니다.");
    const data = await response.json();
    return data.cast.slice(0, 10); // 상위 10명만 가져오기
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
}
