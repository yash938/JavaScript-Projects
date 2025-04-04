// Get the toggle button element
const toggleBtn = document.getElementById("toggleBtn");

// Add an event listener to the button to listen for clicks
toggleBtn.addEventListener("click", () => {
  // Toggle the 'dark-mode' and 'light-mode' classes on the body
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Change button text based on the current mode
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "Switch to Light Mode";
  } else {
    toggleBtn.textContent = "Switch to Dark Mode";
  }
});

// Set initial mode to light mode
document.body.classList.add("light-mode");
toggleBtn.textContent = "Switch to Dark Mode";
