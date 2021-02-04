// DOM
const inputBlock    = document.getElementById('inputPress');
const activeBlock   = document.querySelector('.activeList');
const completeBlock = document.querySelector('.completeList');
const listLength    = document.querySelector('.itemNum');

// Button DOM
const selAllBtn     = document.getElementById('selectAll');
const allBtn        = document.getElementById('allTodo');
const activeBtn     = document.getElementById('activeTodo');
const completeBtn   = document.getElementById('completeTodo');
const delAllBtn     = document.getElementById('clearAll');
const chevronBlock  = document.querySelector('.chevronIcon');

// API
const url = "https://guarded-hamlet-24255.herokuapp.com/todo3";

// Array Declared
let activeAry   = [];
let completeAry = [];

// ,.♫_____________________♪____________________♫,. //
// * Get database
// ? axios GET
axios
  .get(url)
  .then(res => {

    activeAry = res.data;
    activeRender();

  });

// * Add New Todo
// ? axios POST
function addTodoItems(e){
    if (e.key === 'Enter'){

        let todo = {
            items:''
        }
    
        todo.items = inputBlock.value;
    
        if(inputBlock.value.trim() === '' ){
            Swal.fire(`請先輸入待辦事項`);
        }else{
            axios
              .post(url,{
                  items:inputBlock.value
              })
              .then( res => {
                activeAry.push(res.data);
                activeRender()
                
              });

        }
    
        inputBlock.value = '';

    }
}
// EventListener
inputBlock.addEventListener('keypress',addTodoItems);


// * Delete Todo
// todo axios DELETE
function delSingleTodo(e){

    if (e.target.nodeName !== 'I'){
        return
    }else if (e.target.className !== "fas fa-times"){
        return
    }else if (e.path[3].className === "activeList"){

        let currentIndex = e.target.dataset.delindex;
        console.log(currentIndex);

        axios
          .delete(`${url}/${currentIndex}`)
          .then(res => {

            axios
            .get(url)
            .then(res => {
          
              activeAry = res.data;
              activeRender();
          
            });

          })

        activeAry.splice(currentIndex,1);

    }else if (e.path[3].className === "completeList"){

        let currentIndex = e.target.dataset.completeindex;

        axios
          .delete(`${url}`)
          .then(res => console.log(res))

        completeAry.splice(currentIndex,1);
        completeRender()
    }

}
// Event Listener
activeBlock.addEventListener('click',delSingleTodo)
completeBlock.addEventListener('click',delSingleTodo)


// * Complete the Todo
function completeSingle(e){

    if (e.target.nodeName !== 'I'){
        return
    }
    else if (e.target.className === "far fa-circle"){

        let currentIndex = parseInt(e.target.dataset.completeindex)-1;
        let todo = {
            items:''
        }

        console.log(activeAry);
        console.log(currentIndex);

        let value  = activeAry[currentIndex].items;
        todo.items = value;
        completeAry.push(todo);

        activeAry.splice(currentIndex,1);
    }
    else if (e.target.className === "far fa-check-circle"){

        let currentIndex = e.target.dataset;
        let todo = {
            items:''
        }
        console.log(activeAry);
        console.log(completeAry);
        console.log(currentIndex);

        let value  = completeAry[currentIndex].items;
        todo.items = value;
        activeAry.push(todo);

        completeAry.splice(currentIndex,1);
    }
    activeRender()
    completeRender()

}
// Event Listener
activeBlock.addEventListener('click',completeSingle)
completeBlock.addEventListener('click',completeSingle)


// * Select All ActiveTodo
function selAllTodo(e){
    console.log(e);

    if (e.target.nodeName !== 'I'){
        return
    }
    else if (e.target.className === "fas fa-chevron-down"){

        let listLength = activeAry.length;
        completeAry    = activeAry.slice(0,listLength);
        activeAry      = [];

        circleRender()

    }
    else if (e.target.className === "fas fa-chevron-circle-down"){

        let listLength = completeAry.length;
        activeAry      = completeAry.slice(0,listLength);
        completeAry    = [];

        orgRender()

    }
    activeRender()
    completeRender()

}
// Event Listener
chevronBlock.addEventListener('click',selAllTodo)


// * Edit Todo
function editTodo(e) {

    if(e.target.nodeName !== 'INPUT'){
        return
    }
    else if(e.path[2].className === "activeList"){
        let currentIdx = e.target.dataset.editindex;
        activeAry[currentIdx].items = e.target.value;
    }
    else if(e.path[2].className === "completeList"){
        let currentIdx = e.target.dataset.editindex;
        completeAry[currentIdx].items = e.target.value;
    }


}
// Event Listener
activeBlock.addEventListener('keypress',editTodo)
completeBlock.addEventListener('keypree',editTodo)


// * Delete All SelectedTodos
function delAllComplete(){
    completeAry = [];
    completeRender()
    orgRender()
}
// Event Listener
delAllBtn.addEventListener('click',delAllComplete)


// * Render All Todos
function allList(){
    activeRender()
    completeRender()
}
// Event Listener
allBtn.addEventListener('click',allList)


// * Render Active Todos
function activeTodoList(){
    completeBlock.innerHTML = '';
    activeRender()
}
// Event Listener
activeBtn.addEventListener('click',activeTodoList)


// * Render Complete Todos
function completeTodoList(){
    activeBlock.innerHTML = '';
    completeRender()
}
// Event Listener
completeBtn.addEventListener('click',completeTodoList)


// ,.♫_____________________♪____________________♫,. //
// * Render ActiveTodo
function activeRender(){
    let strOfItem = '';

    activeAry.forEach((item,index) => {
        strOfItem += `<div class="listText listStyle">
        <span><i class="far fa-circle" data-completeindex=${item.id}></i></span>
        <input type="text" value="${item.items}" data-editindex=${index}>
        <span><i class="fas fa-times" data-delindex=${item.id}></i></span>
      </div>`;
    });
    
    listLength.textContent = `${activeAry.length}`;
    activeBlock.innerHTML = strOfItem;;
}

// * Render completeTodo
function completeRender(){
    let strOfItem = '';

    completeAry.forEach((item,index) => {
        strOfItem += `<div class="listText listStyle">
        <span><i class="far fa-check-circle" data-completeindex=${item.id}></i></span>
        <input class="checkList" type="text" value="${item.items}" data-editindex=${index}>
        <span><i class="fas fa-times" data-delindex=${item.id}></i></span>
      </div>`;
    })
    
    listLength.textContent = `${activeAry.length}`
    completeBlock.innerHTML = strOfItem;
}

// * Chevron Render
function circleRender(){
    let strOfItem          = `<i class="fas fa-chevron-circle-down" id="newSelectAll"></i>`;  
    chevronBlock.innerHTML = strOfItem;

}

function orgRender(){
    let strOfItem          = `<i class="fas fa-chevron-down" id="selectAll"></i>`;  
    chevronBlock.innerHTML = strOfItem;

}