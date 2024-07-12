import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";



const appSettings = {
    databaseURL : "https://playground-8b704-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

console.log(app);

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value;
    console.log(inputValue);
});