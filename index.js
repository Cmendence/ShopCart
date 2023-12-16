import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
   databaseURL: "https://shopcartcm-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopListDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById('shopping-list')

function addItem(item){
shoppingList.innerHTML += `<li>${item}</li>`
}

function clearInput(){
   inputFieldEl.value = ''
 }


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value


    push(shopListDB, inputValue)

    addItem(inputValue);
    clearInput();

})