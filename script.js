const timerDisplay = document.getElementById('timer-display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const endSound = document.getElementById('end-sound');

// --- State Variables ---
let timerInterval = null;
let totalSeconds = 0;
let isPaused = false;

// --- Event Listeners ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// --- Core Functions ---

function startTimer() {
    if (timerInterval !== null && !isPaused) {
        return;
    }

    if (isPaused) {
        isPaused = false;
    } else {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    }

    if (totalSeconds <= 0) {
        return;
    }
    
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            endSound.play();
            alert("Time's up!");
            resetTimer();
            return;
        }
        totalSeconds--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        isPaused = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    totalSeconds = 0;
    updateDisplay();
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

function updateDisplay() {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    timerDisplay.textContent = 
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

updateDisplay();
