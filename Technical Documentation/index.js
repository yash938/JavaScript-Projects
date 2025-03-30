document
  .getElementById("toggle-sidebar")
  .addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("collapsed");
  });

document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
