// 이메일 유효성 체크
export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// 비밀번호 유효성 검사 함수 (8자 이상 & 대소문자 & 숫자 & 특수문자 포함해야 함)
export function validatePassword(password) {
  const lengthCheck = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    lengthCheck && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
}

export function confirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

