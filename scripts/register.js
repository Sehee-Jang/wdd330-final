document.getElementById("signup-btn").addEventListener("click", () => {
  document.getElementById("signup-modal").style.display = "block";
});

document.getElementById("login-btn").addEventListener("click", () => {
  document.getElementById("login-modal").style.display = "block";
});

// 회원가입 처리
document.getElementById("signup-submit").addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // 이메일 및 비밀번호 유효성 체크 (예: 정규 표현식 활용)
  if (validateEmail(email) && password.length >= 8) {
    alert("회원가입 완료");
    document.getElementById("signup-modal").style.display = "none";
  } else {
    alert("입력된 정보를 확인해 주세요");
  }
});

// 로그인 처리
document.getElementById("login-submit").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (validateEmail(email) && password.length >= 8) {
    alert("로그인 성공");
    document.getElementById("login-modal").style.display = "none";
  } else {
    alert("입력된 정보를 확인해 주세요");
  }
});

// 이메일 유효성 체크
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}
