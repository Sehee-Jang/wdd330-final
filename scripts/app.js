const API_KEY = "02bf7eeb76ad14e4db3c689d31deefcc";
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

// 영화 리스트 가져오기
function fetchMovies() {
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
function createMovieCard(movie) {
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
  movieCard.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));

  return movieCard;
}

// 검색 기능 구현
document.getElementById("search_button").addEventListener("click", () => {
  const query = document.getElementById("search_input").value.toLowerCase();
  searchMovies(query);
});

function searchMovies(query) {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const movieList = data.results.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );
      const movieListContainer = document.getElementById("movie-list");
      movieListContainer.innerHTML = "";

      movieList.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieListContainer.appendChild(movieCard);
      });
    })
    .catch((error) => console.error("Error searching movies:", error));
}

// 페이지 로드 시 기본 영화 리스트 표시
fetchMovies();

/* *****************************
 * SIGNUP & LOGIN
 * ***************************** */
// 로그인/회원가입 버튼 클릭 시 모달 창 표시
document.getElementById("signup-btn").addEventListener("click", () => {
  document.getElementById("signup-modal").style.display = "block";
});

document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("login-modal").style.display = "block";
});

// 회원가입 제출 처리
document.getElementById("signup-submit").addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // 이메일 및 비밀번호 유효성 체크 (정규식 활용)
  if (validateEmail(email) && password.length >= 8) {
    alert("회원가입이 완료되었습니다!");
    document.getElementById("signup-modal").style.display = "none"; // 모달 닫기
  } else {
    alert("입력된 정보를 확인해주세요.");
  }
});

// 로그인 제출 처리
document.getElementById("login-submit").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (validateEmail(email) && password.length >= 8) {
    alert("로그인 성공!");
    document.getElementById("login-modal").style.display = "none"; // 모달 닫기
  } else {
    alert("입력된 정보를 확인해주세요.");
  }
});

// 이메일 유효성 체크
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}
// 닫기 버튼 클릭 시 모달 닫기
document.getElementById("signup-close-btn").addEventListener("click", () => {
  document.getElementById("signup-modal").style.display = "none";
});

document.getElementById("login-close-btn").addEventListener("click", () => {
  document.getElementById("login-modal").style.display = "none";
});
