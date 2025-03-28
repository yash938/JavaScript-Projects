// Configuration
const API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
const IMAGE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;

// DOM Elements
const messagesArea = document.getElementById("messagesArea");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// State Management
let conversationHistory = [];
let currentImageFile = null;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("aimerz-theme") || "dark";
body.classList.add(`${savedTheme}-theme`);

// Theme Toggle Event Listener
themeToggle.addEventListener("click", () => {
  const currentTheme = body.classList.contains("dark-theme") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.classList.remove(`${currentTheme}-theme`);
  body.classList.add(`${newTheme}-theme`);

  // Save theme preference
  localStorage.setItem("aimerz-theme", newTheme);
});

// Message Creation Functions
function createMessageElement(content, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.textContent = content;
  return messageDiv;
}

function createLoadingElement() {
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("message", "loading");
  loadingDiv.textContent = "Generating response...";
  return loadingDiv;
}

// Image Handling
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    currentImageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Send Message Function
async function sendMessage() {
  const message = messageInput.value.trim();

  if (!message && !currentImageFile) return;

  // User Message
  const userMessageElement = createMessageElement(message, "user-message");
  messagesArea.appendChild(userMessageElement);

  // Loading Indicator
  const loadingElement = createLoadingElement();
  messagesArea.appendChild(loadingElement);

  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;

  try {
    let response;
    const payload = {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    };

    // Image handling
    if (currentImageFile) {
      const base64Image = await convertImageToBase64(currentImageFile);
      payload.contents[0].parts.push({
        inlineData: {
          mimeType: currentImageFile.type,
          data: base64Image,
        },
      });
    }

    // API Request
    const apiResponse = await fetch(
      currentImageFile ? IMAGE_API_URL : API_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await apiResponse.json();
    response = data.candidates[0].content.parts[0].text;

    // Remove Loading Indicator
    messagesArea.removeChild(loadingElement);

    // AI Response
    const aiMessageElement = createMessageElement(response, "ai-message");
    messagesArea.appendChild(aiMessageElement);

    // Reset
    messageInput.value = "";
    currentImageFile = null;
    previewImage.style.display = "none";
    previewImage.src = "";
    imageInput.value = "";

    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
    messagesArea.removeChild(loadingElement);
    const errorMessage = createMessageElement(
      "Sorry, something went wrong.",
      "ai-message"
    );
    messagesArea.appendChild(errorMessage);
  }
}

// Utility Functions
async function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Add Welcome Message
function addWelcomeMessage() {
  const welcomeMessage = createMessageElement(
    "Hi! I'm Aimerz, your AI assistant. How can I help you today?",
    "ai-message"
  );
  messagesArea.appendChild(welcomeMessage);
}

// Event Listeners
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Call welcome message on script load
document.addEventListener("DOMContentLoaded", addWelcomeMessage);
