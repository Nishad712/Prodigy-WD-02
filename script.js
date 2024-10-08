// Get elements from the HTML document
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const milisecondsElement = document.querySelector('.miliseconds');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const lapsButton = document.querySelector('.laps');
const clearAllButton = document.querySelector('.clear-all');
const lapsContainer = document.querySelector('.laps-container');

// Variables to manage the state of the stopwatch
let isRunning = false; // Tracks if the stopwatch is currently running
let startTime; // Stores the starting time when the stopwatch is started
let lapNumber = 1; // Tracks the number of laps
let pausedTime = 0; // Variable to store the elapsed time when paused

// Event listeners for buttons
startButton.addEventListener('click', toggleStart);
resetButton.addEventListener('click', resetStopwatch);
lapsButton.addEventListener('click', recordLap);
clearAllButton.addEventListener('click', clearAllLaps);

// Function to start or pause the stopwatch
function toggleStart() {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
}

// Function to start the stopwatch
function startStopwatch() {
    isRunning = true;

    // Set the start time either from scratch or based on paused time
    if (pausedTime === 0) {
        startTime = Date.now();
    } else {
        startTime = Date.now() - pausedTime;
        pausedTime = 0; // Reset paused time
    }
    // Update button text and show necessary buttons
    startButton.textContent = 'Pause';
    updateStopwatch();
}

// Function to pause the stopwatch
function pauseStopwatch() {
    isRunning = false;
    pausedTime += Date.now() - startTime;
    startButton.textContent = 'Resume';
}

// Function to resume the stopwatch
function resumeStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (pausedTime || 0); // Use pausedTime if it's not zero
        pausedTime = 0; // Reset paused time
        startButton.textContent = 'Pause';
        updateStopwatch();
    }
}


// Function to update the stopwatch display
function updateStopwatch() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const formattedTime = formatTime(currentTime);
        displayTime(formattedTime);
        requestAnimationFrame(updateStopwatch);
    }
}

// Function to format the time in minutes, seconds, and milliseconds
function formatTime(time) {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const miliseconds = Math.floor((time % 1000) / 10);

    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        miliseconds: String(miliseconds).padStart(2, '0'),
    };
}

// Function to display the formatted time
function displayTime({ minutes, seconds, miliseconds }) {
    minutesElement.textContent = `${minutes}:`;
    secondsElement.textContent = `${seconds}:`;
    milisecondsElement.textContent = miliseconds;
}

// Function to reset the stopwatch
function resetStopwatch() {
    isRunning = false;
    pausedTime = 0; // Reset paused time
    startButton.textContent = 'Start';
    displayTime({ minutes: '00', seconds: '00', miliseconds: '00' });
    lapNumber = 1;
    clearAllLaps();
}

// Function to record lap time
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-stops', 'block');
        lapItem.innerHTML = `<span class="rank">${lapNumber++}) </span>
                             <span class="value">${lapTime.minutes}:${lapTime.seconds}:${lapTime.miliseconds}</span>`;

        // Append new lap item at the end of the lapsContainer
        lapsContainer.appendChild(lapItem);
    }
}

// Function to clear all lap times
function clearAllLaps() {
    lapsContainer.innerHTML = '';
    lapNumber = 1;
}

