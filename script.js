let timerDisplay = document.getElementById('timerDisplay');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let focusInput = document.getElementById('focusTime');
let breakInput = document.getElementById('breakTime');

let focusTime, breakTime, isFocus, countdown, timerRunning;

startBtn.addEventListener('click', startPomodoro);
resetBtn.addEventListener('click', resetTimer);

function startPomodoro() {
    if (timerRunning) return; // Prevent multiple timers from running
    focusTime = parseInt(focusInput.value) * 60;  // convert minutes to seconds
    breakTime = parseInt(breakInput.value) * 60;  // convert minutes to seconds
    isFocus = true;
    timerRunning = true;
    startBtn.disabled = true;
    resetBtn.disabled = false;
    
    startTimer(focusTime); // Start with focus time
}

function startTimer(seconds) {
    clearInterval(countdown);
    let now = Date.now();
    let then = now + seconds * 1000;
    
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        let secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            timerRunning = false;
            startBtn.disabled = false;
            resetBtn.disabled = true;
            if (isFocus) {
                isFocus = false;
                showAlert("Focus time is over! Take a break!");
                startTimer(breakTime);  // Switch to break time
            } else {
                isFocus = true;
                showAlert("Break is over! Back to focus!");
                startTimer(focusTime);  // Switch back to focus time
            }
            return;
        }
        
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    let display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

// Function to show a popup alert when the timer ends
function showAlert(message) {
    alert(message);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(countdown);
    timerRunning = false;
    startBtn.disabled = false;
    resetBtn.disabled = true;
    timerDisplay.textContent = '00:00';
}
