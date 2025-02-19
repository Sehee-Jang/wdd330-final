// import { loadHeaderFooter } from "./utils.mjs";
import { searchMovies } from "./movies.js";
import { signup, login, updateAuthUI } from "./register.js";

async function initialize() {
  // Load header and footer
  // await loadHeaderFooter();

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

// top button
document.getElementById("top-btn").addEventListener("click", function () {
  window.scroll({
    behavior: "smooth",
    top: 0,
  });
});
