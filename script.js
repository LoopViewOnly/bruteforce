const input = document.getElementById("input");
const answerForm = document.getElementById("answerForm");
const mainDiv = document.getElementById("main_div");
const winnerImg = document.getElementById("winnerImg");
const bgColors = ["#4169E1", "#FF8C00"];

let attempts = 0;
let milliSeconds = 0;
let seconds = 0;
let minutes = 0;
let level = 1;
let passwords = [];

let timer;

const generatePasswords = () => {
  if (!passwords.length) {
    for (let i = 0; i < 3; i++) {
      let n;
      const n1 = Math.floor(Math.random() * [0, 1, 2].length);
      const n2 = Math.floor(Math.random() * [0, 1, 2].length);
      n = String(n1) + String(n2);
      if (i == 1) {
        const n3 = Math.floor(Math.random() * [0, 1, 2].length);
        n += String(n3);
      }
      if (i == 2) {
        const n3 = Math.floor(Math.random() * [0, 1, 2].length);
        const n4 = Math.floor(Math.random() * [0, 1, 2].length);
        n += String(n3) + String(n4);
      }
      passwords.push(n);
    }
  }
};
generatePasswords();

const startTimer = () => {
  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  function milliSecPad(num) {
    return num.toString().padStart(1, "0");
  }

  function updateTimer() {
    milliSeconds++;
    if (milliSeconds >= 10) {
      milliSeconds = 0;
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
    }

    const timerElement = document.getElementById("timer");
    timerElement.textContent = ` ${pad(minutes)}:${pad(seconds)}:${milliSecPad(
      milliSeconds
    )}`;
  }

  timer = setInterval(updateTimer, 100);
};

const stopTimer = () => {
  clearInterval(timer);
};

const increaseAttempts = () => {
  attempts++;
  const attemptsEl = document.getElementById("attempts");
  attemptsEl.textContent = ` ${attempts}`;
};

const checkPassword = () => {
  const levelEl = document.getElementById("level");
  const levelTitle = document.getElementById("level-title");
  const input = document.getElementById("input");
  const button = document.getElementById("button");
  const digits = document.getElementById("digits");

  if (input.value === passwords[level - 1]) {
    animateSuccess(level === 3);
    if (level === 3) {
      mainDiv.style.display = "none"
      winnerImg.style.display = "block"
      button.style.background = "";
      button.disabled = true;
      stopTimer();
    }
    if (level < 3) {
      button.style.background = bgColors[level - 1];
      levelTitle.style.background = bgColors[level - 1];
      level++;
      digits.textContent = Number(digits.textContent) + 1;
      levelEl.textContent = ` ${level}`;
      document.title = `Level ${level}`;
      input.maxLength=passwords[level-1].length;
      input.minLength=passwords[level-1].length;
    }
  } else {
    shakeInput();
    input.disabled = true;
  }
  input.value = "";
  input.focus();
};

const startSolve = (e) => {
  e.preventDefault();
  if (!(seconds || minutes || milliSeconds)) {
    startTimer();
  }
  if (level <= 3) {
    increaseAttempts();
    checkPassword();
  }
};

answerForm.addEventListener('submit',startSolve);

const changeLanguage = (lang) => {
  if (lang && location.pathname.includes(lang)) return;
  if (lang === "") {
    location.href = "/";
  } else {
    location.href = `/${lang}`;
  }
};
