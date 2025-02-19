import {
  validateEmail,
  validatePassword,
  confirmPassword,
} from "../utils/auth.js";

/* *****************************
 * Modals
 * ***************************** */
// Open signup modal
export function openSignupModal() {
  document.getElementById("signup-modal").style.display = "block";
}

// Open login modal
export function openLoginModal() {
  document.getElementById("login-modal").style.display = "block";
}

// Close modal
export function closeModals() {
  document.getElementById("signup-modal").style.display = "none";
  document.getElementById("login-modal").style.display = "none";
}

/* *****************************
 * Sign Up
 * ***************************** */
export function signup() {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPasswordValue = document
    .getElementById("signup-confirm-password")
    .value.trim();
  const errorText = document.getElementById("error-text");

  // Check if all required fields are filled
  if (!email || !password || !confirmPasswordValue) {
    errorText.textContent = "Please fill in all fields.";
    errorText.style.color = "red";
    return;
  }

  // Email validation
  if (!validateEmail(email)) {
    errorText.textContent = "Please enter a valid email.";
    errorText.style.color = "red";
    return;
  }

  // Password validation
  if (!validatePassword(password)) {
    errorText.textContent =
      "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.";
    errorText.style.color = "red";
    return;
  }

  if (!confirmPassword(password, confirmPasswordValue)) {
    errorText.textContent = "Passwords do not match.";
    errorText.style.color = "red";
    return;
  }

  i; // Check if the email is already registered
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    errorText.textContent = "This email is already registered.";
    errorText.style.color = "red";
    return;
  }

  // Save to local storage
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please log in.");
  closeModals();
}

/* *****************************
 * Login
 * ***************************** */
export function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  // 로컬 스토리지에서 사용자 정보 확인
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    alert("Incorrect email or password.");
    return;
  }

  // 로그인 성공 -> 로컬 스토리지에 로그인 상태 저장
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  alert("Login successful!");
  updateAuthUI();
  closeModals();
}

// 로그인 UI 업데이트 (로그인/로그아웃 버튼 변경)
export function updateAuthUI() {
  const authContainer = document.getElementById("auth-container");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    const email = loggedInUser.email;
    const nickname = email.split("@")[0]; // Extract username before '@'

    authContainer.innerHTML = `
      <span id="user-nickname">${nickname}</span>
      <button id="logout-btn">Logout</button>
    `;
    // Redirect to profile page when clicking nickname
    document.getElementById("user-nickname").addEventListener("click", () => {
      window.location.href = "pages/profile.html";
    });
    // Logout button
    document.getElementById("logout-btn").addEventListener("click", logout);
  } else {
    authContainer.innerHTML = `
      <button id="signup-btn">Signup</button>
      <button id="login-btn">Login</button>
    `;

    document
      .getElementById("signup-btn")
      .addEventListener("click", openSignupModal);
    document
      .getElementById("login-btn")
      .addEventListener("click", openLoginModal);
  }
}

// 로그아웃 기능
export function logout() {
  localStorage.removeItem("loggedInUser");
  alert("ou have been logged out.");
  updateAuthUI();
}
