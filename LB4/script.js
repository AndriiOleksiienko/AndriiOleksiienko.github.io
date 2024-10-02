itemInput = document.getElementById("itemInput")
shoppingList = document.getElementById("ToDo-list")
checkedBtn = document.getElementById("checkedButton")
uncheckedBtn = document.getElementById("uncheckedButton")
allBtn = document.getElementById("allButton")

// addEventListener("DOMContentLoaded", localStorage.clear());
addEventListener("DOMContentLoaded", loadFromLocalStorage());


function formatDate() {
    var date = new Date();
    var minutes = date.getMinutes(),
        hours = date.getHours(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    year = year.toString().slice(-2);
    return (`${day}.${month}.${year} ${hours}:${minutes}`);
}

function loadFromLocalStorage() {
    let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];
    taskArr.forEach(task =>  loadTaskToPage(task))
}


function saveToLocalStorage(task){
    let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];
    taskArr.push(task)
    localStorage.setItem("taskArr", JSON.stringify(taskArr))
}

function taskCheckChange(tempTaskId,tempTaskCheck){
    let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];
    taskArr = taskArr.map((task) => {
        if (task.id === tempTaskId){
            task.checked = tempTaskCheck;
        }
        return task;

    })
    localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

function taskTextChange(tempTaskId, tempTaskText) {
    let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];
    taskArr = taskArr.map((task) => {
        if (task.id === tempTaskId) {
            task.text = tempTaskText;
        }
        return task
    })
    localStorage.setItem("taskArr", JSON.stringify(taskArr))
}

function deleteFromLocalStorage(tempTaskId){
    let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];
    taskArr = taskArr.filter(task => task.id !== tempTaskId)
    localStorage.setItem("taskArr", JSON.stringify(taskArr))
}



function loadTaskToPage(task){
    const li = document.createElement("li");
    li.setAttribute("class", "list-item")

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = task.checked
    checkBox.addEventListener("change", function () {
        li.classList.toggle("checked-item")
        itemText.classList.toggle("checked-span")
        if(task.checked){
            task.checked = false;
        }
        else{
            task.checked = true;
        }
        taskCheckChange(task.id,task.checked)
        
    })

    const itemText = document.createElement("span");
    itemText.textContent = task.text;
    
    if (task.checked) {
        li.classList.add("checked-item")
        itemText.classList.add("checked-span")
    }

    itemText.addEventListener("dblclick", function () {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = itemText.textContent;
        editInput.className = "edit-input";
        li.replaceChild(editInput, itemText);
        editInput.focus();
        editInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                const updatedText = editInput.value.trim();

                if (updatedText === "") {
                    alert("The name of the item must consist of at least one letter");
                    return;
                };
                itemText.textContent = updatedText;
                li.replaceChild(itemText, editInput);
                taskTextChange(task.id, updatedText)
            }
        });
        editInput.addEventListener("focusout", function () {
            const updatedText = editInput.value.trim();
            if (updatedText === "") {
                editInput.focus();
                return;
            };
            itemText.textContent = updatedText;
            li.replaceChild(itemText, editInput);
            taskTextChange(task.id, updatedText)
        })
    })

    const date = document.createElement("span")
    date.setAttribute("class", "date")
    date.textContent = task.time

    const deletebtn = document.createElement("button")
    deletebtn.setAttribute("class", "delete-btn")
    deletebtn.innerHTML = "×";
    deletebtn.addEventListener("click", function () {
        li.remove();
        deleteFromLocalStorage(task.id);
    });


    li.appendChild(checkBox);
    li.appendChild(itemText);
    const rightContainer = document.createElement("div")

    rightContainer.appendChild(date);
    rightContainer.appendChild(deletebtn);
    li.appendChild(rightContainer)

    shoppingList.appendChild(li);

}

function addTaskObject(){
    newItem = itemInput.value.trim();
    
    if (newItem === "") {
        alert("The name of the item must consist of at least one letter");
        return;
    }
    var date = new Date();

    const task = {
        id: String(newItem)+String(date.getMilliseconds()),
        text: newItem,
        checked: false,
        time: formatDate()
    }
    saveToLocalStorage(task)
    loadTaskToPage(task)
    itemInput.value = "";
    itemInput.focus();
}

checkedBtn.addEventListener("click", function(){
    const listofitem = document.querySelectorAll(".list-item")
    listofitem.forEach(item => {
        if (!item.classList.contains("checked-item")) {
            item.style.display = "None"
        }
        else {
            item.style.display = "flex"
        }
    });
})

uncheckedBtn.addEventListener("click", function () {
    const listofitem = document.querySelectorAll(".list-item")
    listofitem.forEach(item => {
        if (item.classList.contains("checked-item")) {
            item.style.display = "None"
        }
        else {
            item.style.display = "flex"
        }
    });
});
allBtn.addEventListener("click", function () {
    const listofitem = document.querySelectorAll(".list-item")
    listofitem.forEach(item => {
        item.style.display = "flex"
    });
});



itemInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTaskObject();
    }
});