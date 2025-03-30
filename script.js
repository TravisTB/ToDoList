const inputBox = document.getElementById("input-box");
const timerBox = document.getElementById("timer-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task and a timer");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        if (timerBox.value !== '') {
            let timerSpan = document.createElement("span");
            timerSpan.className = "timer";
            timerSpan.textContent = formatTimer(timerBox.value);
            li.appendChild(timerSpan);
            li.setAttribute('data-time', timerBox.value * 60); // Store the remaining time in seconds
            startTimer(li, timerBox.value * 60); // Pass the remaining time in seconds
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);

        inputBox.value = '';
        saveData();
    }

    timerBox.value = '';
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN' && e.target.className !== 'timer') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateTimers();
}

function formatTimer(minutes) {
    return `${minutes} minutes left`;
}

function startTimer(li, time) {
    const timerSpan = li.querySelector('.timer');
    const interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerSpan.textContent = `${minutes}m ${seconds}s left`;
        time--;
        if (time < 0) {
            clearInterval(interval);
            timerSpan.textContent = "Time's up!";
        }
    }, 1000);
}

function updateTimers() {
    const timers = document.querySelectorAll('.timer');
    timers.forEach(timer => {
        const li = timer.parentElement;
        const time = parseInt(li.getAttribute('data-time'));
        startTimer(li, time);
    });
}

document.getElementById('input-box').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

document.getElementById('timer-box').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

showTask();