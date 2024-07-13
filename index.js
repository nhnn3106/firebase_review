import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


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
    appendItemValueToShoppingListEl(inputValue)
    
    console.log(`${inputValue} added to database`);
});

onValue(shoppingListInDB, function(snaphot) {
    console.log(snaphot.val());
});

function clearInputField() {
    inputFieldEl.value = "";
}
function appendItemValueToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += "<li>" + itemValue + "</li>";
}