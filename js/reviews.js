document.addEventListener("DOMContentLoaded", () => {
  const reviewBtn = document.getElementById("commnetBtn");
  const reviewList = document.getElementById("commentBody");

  // Save Reviews
  function saveReview() {
    const userName = document.getElementById("inputUser").value.trim();
    const userPw = document.getElementById("inputPw").value.trim();
    const userComment = document.getElementById("inputComment").value.trim();
    const userStar = document.getElementById("star").value;
    const movieId = getMovieIdFromURL();
    const timestamp = new Date().toLocaleDateString();

    if (!userName || !userPw || !userComment || userStar === "Rates") {
      alert("Please fill in all fields!");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: userName,
      password: userPw,
      comment: userComment,
      rating: userStar,
      time: timestamp,
      movieId: movieId,
    };

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    renderReviews();
    clearInputFields();
  }

  // Clear input fields
  function clearInputFields() {
    document.getElementById("inputUser").value = "";
    document.getElementById("inputPw").value = "";
    document.getElementById("inputComment").value = "";
    document.getElementById("star").value = "Rates";
  }

  // Delete review
  function deleteReview(reviewId) {
    const userPw = prompt("Please enter your password: ");
    if (!userPw) return;

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

    if (
      reviewIndex !== -1 &&
      String(reviews[reviewIndex].password) === String(userPw)
    ) {
      // 타입을 String으로 변환하여 비교
      reviews.splice(reviewIndex, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      renderReviews();
    } else {
      alert("Password does not match.");
    }
  }

  // Edit review
  function editReview(reviewId) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

    if (reviewIndex === -1) return;

    const userPw = prompt("Please enter your password: ");
    if (String(reviews[reviewIndex].password) !== String(userPw)) {
      // 비밀번호를 String으로 변환하여 비교
      alert("Password does not match.");
      return;
    }

    const newComment = prompt(
      "Enter new review content: ",
      reviews[reviewIndex].comment
    );
    if (!newComment) return;

    reviews[reviewIndex].comment = newComment;
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews();
  }

  // Render review list
  function renderReviews() {
    reviewList.innerHTML = "";
    const movieId = getMovieIdFromURL();
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const movieReviews = reviews.filter((review) => review.movieId === movieId);

    if (movieReviews.length === 0) {
      reviewList.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    movieReviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.classList.add("commentBox");
      reviewItem.innerHTML = `
        <p class="commentStar">${review.rating}</p>
        <p class="commentText">${review.comment}</p>
        <div>
          <p class="commentUser">${review.name}</p>
          <p class="commentTime">${review.time}</p>
        </div>
        <button class="edit" data-id="${review.id}">수정</button> 
        <button class="del" data-id="${review.id}">삭제</button>
      `;
      reviewList.appendChild(reviewItem);
    });

    //  Add event listeners for delete and edit buttons
    document.querySelectorAll(".del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const reviewId = e.target.dataset.id;
        console.log("Delete button clicked", reviewId);
        deleteReview(Number(reviewId));
      });
    });

    document.querySelectorAll(".edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const reviewId = e.target.dataset.id;
        console.log("Edit button clicked", reviewId);
        editReview(Number(reviewId));
      });
    });
  }

  // Get movie ID from URL
  function getMovieIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  // Add event listener for save button
  reviewBtn.addEventListener("click", saveReview);

  // Render reviews on page load
  renderReviews();
});
