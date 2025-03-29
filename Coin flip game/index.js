const coin = document.getElementById("coin");
const flipBtn = document.getElementById("flipBtn");
const resetBtn = document.getElementById("resetBtn");
const resultText = document.getElementById("result");
const statsText = document.getElementById("stats");

let headsCount = 0;
let tailsCount = 0;
let isFlipping = false;

function flipCoin() {
  if (isFlipping) return;

  isFlipping = true;
  resultText.textContent = "";
  coin.classList.add("flipping");

  setTimeout(() => {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    if (result === "Heads") {
      headsCount++;
      resultText.textContent = "Heads!";
      resultText.classList.add("text-green-600");
    } else {
      tailsCount++;
      resultText.textContent = "Tails!";
      resultText.classList.add("text-blue-600");
    }

    statsText.textContent = `Heads: ${headsCount} | Tails: ${tailsCount}`;

    coin.classList.remove("flipping");
    isFlipping = false;
  }, 1200);
}

function resetGame() {
  headsCount = 0;
  tailsCount = 0;
  resultText.textContent = "";
  resultText.classList.remove("text-green-600", "text-blue-600");
  statsText.textContent = "Heads: 0 | Tails: 0";
}

flipBtn.addEventListener("click", flipCoin);
resetBtn.addEventListener("click", resetGame);
