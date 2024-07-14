import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL : "https://playground-8b704-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
console.log(app);

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
addButtonEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputField();
    cl
    console.log(`${inputValue} added to database`);
});

onValue(shoppingListInDB, function(snaphot) {

    if(snaphot.exists()) {
        let itemsArray = Object.entries(snaphot.val());
        clearShoppingListEl();
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            appendItemToShoppingListEl(currentItem);
        }
    } 
    else {
        shoppingListEl.innerHTML = "No items here";
    }

    

});

//empty input field
function clearInputField() {
    inputFieldEl.value = "";
}

//remove all tags of li in shoppingListEl
function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

//insert item into shoppingListEl
function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB); 
    });


    shoppingListEl.append(newEl);

}