const totalLevels = 5;
const inputsPerLevel = 20;
let currentLevel = 1;
let totalScore = 0;
let answers = Array.from({ length: totalLevels }, () => Array(inputsPerLevel).fill(""));
let correctAnswers = Array.from({ length: totalLevels }, () => Array(inputsPerLevel).fill(""));
let timeLeft = 300;
let timerInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  renderInputs();
  startTimer();
});

function renderInputs() {
  const container = document.getElementById("input-columns");
  container.innerHTML = "";

  const columnLeft = document.createElement("div");
  columnLeft.className = "column";
  const columnRight = document.createElement("div");
  columnRight.className = "column";

  for (let i = 0; i < inputsPerLevel; i++) {
    const index = i + (currentLevel - 1) * inputsPerLevel;
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const numberLabel = document.createElement("span");
    numberLabel.className = "input-number";
    numberLabel.textContent = `${index + 1}.`;

    const input = document.createElement("input");
    input.type = "text";
    input.value = answers[currentLevel - 1][i];
    input.addEventListener("input", (e) => {
      answers[currentLevel - 1][i] = e.target.value;
    });

    inputGroup.appendChild(numberLabel);
    inputGroup.appendChild(input);

    if (i < 10) {
      columnLeft.appendChild(inputGroup);
    } else {
      columnRight.appendChild(inputGroup);
    }
  }

  container.appendChild(columnLeft);
  container.appendChild(columnRight);

  document.getElementById("current-level").textContent = currentLevel;

  if (currentLevel === totalLevels) {
    document.getElementById("finish-button").classList.remove("hidden");
  } else {
    document.getElementById("finish-button").classList.add("hidden");
  }
}

function submitAnswers() {
  let scoreThisLevel = 0;
  for (let i = 0; i < inputsPerLevel; i++) {
    if (answers[currentLevel - 1][i].toLowerCase() === correctAnswers[currentLevel - 1][i].toLowerCase()) {
      scoreThisLevel++;
    }
  }
  totalScore += scoreThisLevel;
  document.getElementById("total-score").textContent = totalScore;
}

function nextLevel() {
  if (currentLevel < totalLevels) {
    currentLevel++;
    renderInputs();
  }
}

function prevLevel() {
  if (currentLevel > 1) {
    currentLevel--;
    renderInputs();
  }
}

function finishGame() {
  alert(`Permainan selesai! Skor akhir Anda adalah: ${totalScore}`);
  // Simpan ke leaderboard bisa ditambahkan di sini
}

function startTimer() {
  document.getElementById("time-left").textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishGame();
    }
  }, 1000);
}
