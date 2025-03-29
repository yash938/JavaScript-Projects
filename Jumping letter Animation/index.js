// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the container that holds the text
  const textContainer = document.querySelector(".jumping-text");

  // Get the text content from the container
  const text = textContainer.textContent;

  // Clear the original text content in the container
  textContainer.textContent = "";

  // Loop through each character in the text
  text.split("").forEach((letter) => {
    // Create a new <span> element for each letter
    const span = document.createElement("span");

    // Set the text content of the <span> to the current letter
    span.textContent = letter;

    // Append the <span> to the text container
    textContainer.appendChild(span);
  });
});
