// 이메일 유효성 체크
export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// 비밀번호 유효성 검사 함수 (최소 8자 이상)
export function validatePassword(password) {
  return password.length >= 8;
}
