let failedAttempts = 0;
let isLocked = false;
let lockTimer = null;
const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 300000;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    if (isLocked) {
        messageDiv.innerHTML = '⛔ Account is locked. Please wait 5 minutes.';
        messageDiv.className = 'lock-message';
        return;
    }

    if (username === '' || password === '') {
        messageDiv.innerHTML = '⚠️ Please fill in both username and password fields.';
        messageDiv.className = 'error-message';
        return;
    }

    if (username === 'AIUB' && password === '$_student') {
        messageDiv.innerHTML = '✅ Successfully Logged In';
        messageDiv.className = 'success-message';
        failedAttempts = 0;
        document.querySelector('button').disabled = false;
        return;
    } else {
        failedAttempts++;
        let attemptsLeft = MAX_ATTEMPTS - failedAttempts;

        if (attemptsLeft > 0) {
            messageDiv.innerHTML = `❌ Invalid credentials. You have ${attemptsLeft} attempts left.`;
            messageDiv.className = 'error-message';
        } else {
            messageDiv.innerHTML = '🔒 You have 1 attempt left. You are locked for 5 minutes.';
            messageDiv.className = 'lock-message';
            lockAccount();
        }
    }
}

function lockAccount() {
    isLocked = true;
    const loginButton = document.querySelector('button');
    loginButton.disabled = true;
    loginButton.style.opacity = '0.6';

    if (lockTimer) {
        clearTimeout(lockTimer);
    }

    lockTimer = setTimeout(function() {
        unlockAccount();
    }, LOCK_DURATION);

    displayLockTimer();
}

function unlockAccount() {
    isLocked = false;
    const loginButton = document.querySelector('button');
    loginButton.disabled = false;
    loginButton.style.opacity = '1';
    
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '🔓 Account unlocked. You can try again.';
    messageDiv.className = 'success-message';
    
    failedAttempts = 0;
    
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
        timerDisplay.innerHTML = '';
    }
}

function displayLockTimer() {
    const messageDiv = document.getElementById('message');
    let timeLeft = LOCK_DURATION / 1000;

    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }

    window.timerInterval = setInterval(function() {
        if (!isLocked) {
            clearInterval(window.timerInterval);
            return;
        }

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        messageDiv.innerHTML = `🔒 Account locked. Time remaining: ${minutes}m ${seconds}s`;
        messageDiv.className = 'lock-message';
        
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(window.timerInterval);
            unlockAccount();
        }
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});

function resetLogin() {
    failedAttempts = 0;
    isLocked = false;
    if (lockTimer) {
        clearTimeout(lockTimer);
    }
    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }
    document.querySelector('button').disabled = false;
    document.querySelector('button').style.opacity = '1';
    document.getElementById('message').innerHTML = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}