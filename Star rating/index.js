const stars = document.querySelectorAll(".star");
const feedback = document.querySelector(".feedback");
const submitBtn = document.querySelector(".submit-btn");
const thankYou = document.querySelector(".thank-you");
const ratingValue = document.querySelector(".rating-value");
const emoji = document.querySelector(".emoji");
let rating = 0;

const feedbackData = {
  1: {
    message: "We're sorry for the disappointing experience 😔",
    emoji: "😔",
  },
  2: { message: "We'll work hard to improve 🤔", emoji: "🤔" },
  3: { message: "Thank you for your feedback 😊", emoji: "😊" },
  4: { message: "We're glad you had a good experience! 😄", emoji: "😄" },
  5: { message: "Awesome! You made our day! 🌟", emoji: "🤩" },
};

function updateStars(value, hover = false) {
  stars.forEach((star) => {
    const starValue = parseInt(star.dataset.value);
    if (starValue <= value) {
      star.classList.add("active");
      if (!hover) star.classList.add("pulse");
    } else {
      star.classList.remove("active", "pulse");
    }
  });
}

function handleStarHover(event) {
  const value = parseInt(event.target.dataset.value);
  updateStars(value, true);
}

function handleMouseLeave() {
  updateStars(rating);
}

function handleStarClick(event) {
  rating = parseInt(event.target.dataset.value);

  // Update UI elements
  ratingValue.textContent = rating.toFixed(1);
  ratingValue.classList.add("visible");

  feedback.textContent = feedbackData[rating].message;
  emoji.textContent = feedbackData[rating].emoji;
  emoji.classList.add("visible");

  submitBtn.classList.add("visible");
  updateStars(rating);
}

function handleSubmit() {
  if (rating > 0) {
    thankYou.classList.add("visible");
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
    stars.forEach((star) => (star.style.pointerEvents = "none"));

    // Simulate sending data to server
    console.log(`Submitted rating: ${rating}`);
  }
}

stars.forEach((star) => {
  star.addEventListener("mouseover", handleStarHover);
  star.addEventListener("click", handleStarClick);
});

document
  .querySelector(".stars")
  .addEventListener("mouseleave", handleMouseLeave);
submitBtn.addEventListener("click", handleSubmit);
