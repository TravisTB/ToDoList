const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === ''){
        alert("Please enter a task");
    }
    else {
        let li = document.createElement("li"); //create html element with tag li
        li.innerHTML = inputBox.value;         //set the innerHTML of the li element to the value of the input box
        listContainer.appendChild(li);         //append the li element to the list container

        let span = document.createElement("span");      //create html element with tag span
        span.innerHTML = "\u00d7";                      //set the innerHTML of the span element to 'x'
        li.appendChild(span);                           //append the span element to the li element
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e){
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();