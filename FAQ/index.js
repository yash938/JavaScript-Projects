document.addEventListener("DOMContentLoaded", function () {
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
      toggleAnswer(index);
    });
  });

  function toggleAnswer(index) {
    const items = document.querySelectorAll(".faq-item");
    const currentItem = items[index];
    const icon = currentItem.querySelector(".faq-icon");
    const content = currentItem.querySelector(".faq-content");

    if (content.style.display === "block") {
      content.style.display = "none";
      icon.textContent = "+";
    } else {
      content.style.display = "block";
      icon.textContent = "−";
    }
  }
});
