const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const selectAllButton = document.getElementById("select-all");
const deleteButton = document.getElementById("delete-selected");
const cancelButton = document.getElementById("cancel-selected");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBox.value = '';
        saveData();
        updateButtonsVisibility();
    }
}

inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateButtonsVisibility();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    if (localStorage.getItem("data")) {
        listContainer.innerHTML = localStorage.getItem("data");
    } else {
        listContainer.innerHTML = "";
    }
    updateButtonsVisibility();
}

function selectAllTasks() {
    let tasks = document.querySelectorAll("li");
    tasks.forEach(task => task.classList.add("checked"));
    saveData();
}

function deleteSelectedTasks() {
    let selectedTasks = document.querySelectorAll(".checked");

    if (selectedTasks.length === 0) {
        alert("No tasks selected.");
        return;
    }

    let confirmation = confirm("Are you sure you want to delete the selected tasks?");
    if (confirmation) {
        selectedTasks.forEach(task => task.remove());
        saveData();
        updateButtonsVisibility(); // Update visibility after deletion
    }
}

function cancelSelection() {
    let selectedTasks = document.querySelectorAll(".checked");
    selectedTasks.forEach(task => task.classList.remove("checked"));
    saveData();
}

function updateButtonsVisibility() {
    let tasks = document.querySelectorAll("li");
    if (tasks.length > 0) {
        selectAllButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    } else {
        selectAllButton.style.display = "none";
        deleteButton.style.display = "none";
        cancelButton.style.display = "none";
    }
}

showTask();
