// 이메일 형식 검증 함수
export function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

// 회원가입
export function signUp(email, password) {
  if (!isValidEmail(email)) {
    alert("유효한 이메일 주소를 입력해주세요.");
    return;
  }
  const user = { email, password };
  localStorage.setItem("userEmail", email);
  localStorage.setItem("user", JSON.stringify(user));
  console.log("저장된 사용자:", localStorage.getItem("user"));
  alert("회원가입 성공!");
}

// 로그인
export function login(email, password) {
  if (!isValidEmail(email)) {
    alert("유효한 이메일 주소를 입력해주세요.");
    return;
  }
  const storedEmail = localStorage.getItem("userEmail");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (
    storedEmail === email &&
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "profile.html";
  } else {
    alert("로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.");
  }
}

// 로그아웃
export function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// 로그인 상태 확인
export function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    return true;
  } else {
    window.location.href = "login.html";
    return false;
  }
}

// 프로필 정보 가져오기
export function getUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user;
  } else {
    return null;
  }
}
