import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
   databaseURL: "https://shopcartcm-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopListDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById('shopping-list')

function deleteItem(exactId){
   remove(exactId)
}

function addItem(item){
   let newLi = document.createElement('li')
   let itemId = item[0]
   let itemValue = item[1]
   newLi.textContent = itemValue
   newLi.addEventListener('click', ()=> {
      let exactLocationLi = ref(database, `shoppingList/${itemId}`)
      deleteItem(exactLocationLi);
     })
   shoppingList.append(newLi)
}

function clearInput(){
   inputFieldEl.value = ''
 }

 function clearShopList(){
   shoppingList.innerHTML=''
 }

onValue(shopListDB, snapshot => {
   if(snapshot.exists()) {


  
      let shoppingListArray = Object.entries(snapshot.val())
      
      
      clearShopList()
      for(let i = 0; i< shoppingListArray.length; i++){
         let currentItem = shoppingListArray[i];
         let currentItemId = currentItem[0];
         let currentItemValue = currentItem[1];
         addItem(currentItem)
      }

   } else {
      shoppingList.innerHTML= "Nothing here...yet"
   }
   })
   
   addButtonEl.addEventListener("click", () => {
      let inputValue = inputFieldEl.value
      push(shopListDB, inputValue)
      clearInput();
      
   })
