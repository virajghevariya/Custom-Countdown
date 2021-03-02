const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countDownEl = document.getElementById('countdown');
const countDownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countdownVal = Date;
let countdownActive;
let savedCountdown;

// Set Date to input with Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Populate Countdown / Complete UI
function updateDom() {
  
    const now = new Date().getTime();
    const distance = countdownVal - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Check if countdown is finish
    if(distance < 0) {
        countDownEl.hidden = true;
        inputContainer.hidden = true;
        clearInterval(countdownActive);
        completeEl.hidden = false;

        completeElInfo.textContent = `${countDownTitle} is finished on ${countDownDate}`;
        
    }
    else {
        // Populate Countdown
        countDownElTitle.textContent = `${countDownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        // Hide Input
        inputContainer.hidden = true;
        // Show Countdown
        countDownEl.hidden = false;
    }
}

// Take Value from Input
function updateCountdown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    
    // Check if no date entered
    if(countDownDate === '') {
        alert('Please fill the Date!');
    }else {
        // Get Number Version Of Current Date, updateDOM
        countdownVal = new Date(countDownDate).getTime();
        console.log(countdownVal);
        // It is trigger updateDom & setInterval
        countdownActive = setInterval(updateDom, second);
        savedCountdown = {
            title : countDownTitle,
            date : countDownDate,
        };
      
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    }
}

function reset() {
    countDownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    clearInterval(countdownActive);

    localStorage.removeItem('countdown');

    countDownTitle = '';
    countDownDate = '';
}

function restorePreviousCountdown() {
    // Get Countdown from localstorage if available
    if(localStorage.getItem('countdown')) {
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countDownTitle = savedCountdown.title;
        countDownDate = savedCountdown.date;
        countdownVal = new Date(countDownDate).getTime();
        updateDom();
        countdownActive = setInterval(updateDom, second);
    }
}
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load restore Local Storage
restorePreviousCountdown();