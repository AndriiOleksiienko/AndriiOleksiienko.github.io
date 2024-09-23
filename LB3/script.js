const addItemBtn = document.getElementById("addItemBtn");
const itemInput = document.getElementById("itemInput");
const shoppingList = document.getElementById("shoppingList");

const regExp = /[a-zA-Zа-яА-Я]/g;

addItemBtn.addEventListener("click", function () {
        const newItem = itemInput.value.trim();

        if (!regExp.test(newItem)) {
            alert("The name of the item must consist of at least one letter");
            return;
        }

        const li = document.createElement("li");

        const itemText = document.createElement("span");
        itemText.textContent = newItem;

        

        //Кнопка редагування
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = itemText.textContent;
            editInput.className = "edit-input";

            //Кнопка збереження
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.addEventListener("click", function () {
                const updatedText = editInput.value.trim();

                if (!regExp.test(updatedText)) {
                    alert("The name of the item must consist of at least one letter");
                    return;
                }

                itemText.textContent = updatedText;
                li.replaceChild(itemText, editInput);
                li.replaceChild(editBtn, saveBtn);
            });

            li.replaceChild(editInput, itemText);
            li.replaceChild(saveBtn, editBtn);

        });

        //Кнопка видалення
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            const confirmation = confirm("Are you sure you want to delete this item?");
            if (confirmation) {
                li.remove();
            }
        });



        li.appendChild(itemText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        shoppingList.appendChild(li);

        itemInput.value = "";
        itemInput.focus();
    });

itemInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addItemBtn.click();
    }
});
