// Modal functionality
const triggers = document.querySelectorAll(".trigger-btn");
const modals = document.querySelectorAll(".modal-overlay");
const closeButtons = document.querySelectorAll(".close-modal");

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modalType = trigger.getAttribute("data-modal");
    const modal = document.getElementById(`${modalType}-modal`);
    modal.classList.add("active");
  });
});

function closeModal(modal) {
  modal.classList.remove("active");
}

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal-overlay");
    closeModal(modal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("active")) {
        closeModal(modal);
      }
    });
  }
});

// Auto-close notification after 3 seconds
const notificationTrigger = document.querySelector(
  '[data-modal="notification"]'
);
notificationTrigger.addEventListener("click", () => {
  setTimeout(() => {
    const notificationModal = document.getElementById("notification-modal");
    closeModal(notificationModal);
  }, 3000);
});
