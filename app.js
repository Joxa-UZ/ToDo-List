let contacts = [];

var siteList = document.querySelector(".site-list");
var siteForm = document.querySelector(".site-form");
var siteInput = document.querySelector(".site-input");
var siteItem = document.querySelector(".site-item");

let elItemOne = document.querySelector(".item-one");
let elItemTwo = document.querySelector(".item-two");
let elItemThree = document.querySelector(".item-three");

let searchInput = document.querySelector(".search-int");
let searchBtn = document.querySelector(".search-form");

let editForm = document.querySelector(".edit-form");
let editInput = document.querySelector(".edit-input");
let editBtn = document.querySelector(".edit-btn");

let text = null
// console.log(elItemOne,elItemTwo,elItemThree);
const todoArray = JSON.parse(window.localStorage.getItem("data")) || [];

let siteTemplate = document.querySelector(".site-template").content;

const siteFragment = new DocumentFragment();

siteForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    
    var siteInputValue = siteInput.value;

    let obj = {
        id: todoArray.length > 0 ? todoArray[todoArray.length -1].id+1 :1,
        name: siteInputValue,
        isComplate: false
    }

    if(siteInput.value !== ""){
        todoArray.push(obj);
    }

    createTodo(todoArray);

    window.localStorage.setItem("data", JSON.stringify(todoArray));
    countArray()
    siteInput.value = "";
})

function createTodo(arr){

    siteList.innerHTML = "";

    arr.forEach(obj => {

        let cloneTemplate = siteTemplate.cloneNode(true)
        text = cloneTemplate.querySelector(".form-check-label")
        cloneTemplate.querySelector(".form-check-label").textContent = obj.name;
        cloneTemplate.querySelector(".site-item");
        cloneTemplate.querySelector(".form-check-input").dataset.did = obj.id;
        cloneTemplate.querySelector(".site-btn").dataset.editid = obj.id;
        cloneTemplate.querySelector(".delete-btn").dataset.mid = obj.id;



        if(obj.isComplate){
            cloneTemplate.querySelector(".form-check-input").checked = true;
            cloneTemplate.querySelector(".form-check-label").style.textDecoration= "line-through";
        }

        siteFragment.appendChild(cloneTemplate);

    })
    siteList.appendChild(siteFragment);

}
createTodo(todoArray);

siteList.addEventListener("click", function(evt){
    if(evt.target.matches(".delete-btn")){
        let btnId = Number(evt.target.dataset.mid);
        console.log(btnId);
        let itemFind = todoArray.findIndex(obj =>  obj.id === btnId);
        // console.log(itemFind);
        todoArray.splice(itemFind, 1);
        window.localStorage.setItem("data", JSON.stringify(todoArray));
        createTodo(todoArray);
        countArray();
    }

    if(evt.target.matches(".form-check-input")){
        let inputId = Number(evt.target.dataset.did);
        let itemIsComplate = todoArray.find(item => item.id == inputId);
        itemIsComplate.isComplate = !itemIsComplate.isComplate;
        window.localStorage.setItem("data", JSON.stringify(todoArray));
        createTodo(todoArray);
        countArray();
    }

    if(evt.target.matches(".site-btn")){
        let editFirstValue = evt.target.parentElement.childNodes[9].childNodes[1];
        let editBtnValue = evt.target.parentElement.childNodes[9].childNodes[3];
        let editDivValue = evt.target.parentElement.childNodes[9];
        
        let textIdBtn = Number(evt.target.dataset.editid);
      
        let editItemFind = todoArray.find(obj => obj.id == textIdBtn);
        editFirstValue.value = editItemFind.name;
        
        editDivValue.classList.remove("d-none")
    
        editBtnValue.addEventListener("click", function(){
            if (editFirstValue.value !== "") {
                editDivValue.classList.add("d-none")
                editItemFind.name = editFirstValue.value;
                window.localStorage.setItem("data", JSON.stringify(todoArray));
                createTodo(todoArray);
            }
        })
    }       
})

function countArray (){
    elItemOne.textContent = todoArray.length;

    let completeItem = todoArray.filter(obj => obj.isComplate === false);
    elItemTwo.textContent = completeItem.length;

    let unCompleteItem = todoArray.filter(obj => obj.isComplate === true);
    elItemThree.textContent = unCompleteItem.length;


    if (Number(elItemOne.textContent) > 0) {
        elItemOne.style.boxShadow = "0 0 5px 1px green"
    } else {
        elItemOne.style.boxShadow = "0 0 5px 1px red"
    }

    if (Number(elItemTwo.textContent) > 0) {
        elItemTwo.style.boxShadow = "0 0 5px 1px green"
    } else {
        elItemTwo.style.boxShadow = "0 0 5px 1px red"
    }

    if (Number(elItemThree.textContent) > 0) {
        elItemThree.style.boxShadow = "0 0 5px 1px green"
    } else {
        elItemThree.style.boxShadow = "0 0 5px 1px red"
    }

    elItemOne.addEventListener("click", function(){
        createTodo(todoArray)
    })
    elItemTwo.addEventListener("click", function(){
        createTodo(completeItem)
    })
    elItemThree.addEventListener("click", function(){
        createTodo(unCompleteItem)
    })


}
countArray();

searchBtn.addEventListener("keyup", function(){
    let searchInputNext = searchInput.value.toLowerCase();
    let searchItemNext = todoArray.filter(obj => {
        return obj.name.toLowerCase().includes(searchInputNext);
    });
    createTodo(searchItemNext);
});

