document.getElementById("commnetBtn").addEventListener("click", function () {
  const nickname = document.getElementById("inputUser").value;
  const password = document.getElementById("inputPw").value;
  const comment = document.getElementById("inputComment").value;
  const rating = document.getElementById("star").value;

  if (!nickname || !password || !comment || rating === "별점") {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const newReview = { nickname, comment, rating };
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  displayReviews();
});

// 저장된 리뷰 표시
function displayReviews() {
  const commentBody = document.getElementById("commentBody");
  commentBody.innerHTML = "";

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach(({ nickname, comment, rating }) => {
    commentBody.innerHTML += `<p><strong>${nickname}:</strong> ${comment} (${rating})</p>`;
  });
}

// 페이지 로드 시 리뷰 표시
document.addEventListener("DOMContentLoaded", displayReviews);
