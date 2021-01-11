// DOM綁定
const completeBtn   = document.getElementById('completeTodo');
const inputBlock    = document.getElementById('inputPress');
const activeBtn     = document.getElementById('activeTodo');
const selAllBtn     = document.getElementById('selectAll');
const newSelAll     = document.getElementById('newSelectAll')
const delAllBtn     = document.getElementById('clearAll');
const allBtn        = document.getElementById('allTodo');
const listLength    = document.querySelector('.itemNum');
const insertBlock   = document.querySelector('.activeList'); 
const completeBlock = document.querySelector('.completeList'); 
const chevronBlock  = document.querySelector('.chevronIcon');

// 宣告各個陣列
let todoAry       = [];
let activeAry     = [];
let completeAry   = [];

// ,.♫_____________________♪____________________♫,. //
// *新增todolist function
function addTodoItems(){
    let todo = {
        items:''
    }

    // 宣告item的值等於我們輸入input區塊的值
    todo.items = inputBlock.value;

    // 防呆和post資料上去
    if(inputBlock.value.trim() === '' ){
        Swal.fire('請先輸入待辦事項');
    }else{
        todoAry.push(todo);
        activeAry.push(todo);
    }
    
    // 清空原本輸入的資料方便下一次輸入新的todo
    inputBlock.value = '';
    // 將新增成功的話面render出來
    activeRender()

}

// 按下enter鍵後執行function
function pressEnter(e){
    if(e.key === 'Enter')
    addTodoItems()
}

// 綁定新增todo的eventListener
inputBlock.addEventListener('keypress',pressEnter)

// ,.♫_____________________♪____________________♫,. //
// *刪除指定的todo
function delSingle(e){
    if(e.target.nodeName !== 'I'){
        return
    }else if(e.target.className !== "fas fa-times"){
        return
    }

    // 抓取所指定的todo順序
    let currentIdx = e.target.dataset.delindex;

    // 使用splice將該筆資料從todoAry中移除
    todoAry.splice(currentIdx,1)
    activeAry.splice(currentIdx,1)

    activeRender()

}

// 綁定刪除單一todo的eventListener
insertBlock.addEventListener('click',delSingle)

// ,.♫_____________________♪____________________♫,. //
// *刪除指定的complete todo
function delcompleteSingle(e){
    if(e.target.nodeName !== 'I'){
        return
    }else if(e.target.className !== "fas fa-times"){
        return
    }

    // 抓取所指定的todo順序
    let currentIdx = e.target.dataset.completeindex;

    // 使用splice將該筆資料從todoAry中移除
    todoAry.splice(currentIdx,1)
    completeAry.splice(currentIdx,1)

    completeRender()

}

// 綁定刪除單一todo的eventListener
completeBlock.addEventListener('click',delcompleteSingle)

// ,.♫_____________________♪____________________♫,. //
// * 完成指定的todo
function completeSingle(e){

    if(e.target.nodeName !== 'I'){
        return
    }
    else if(e.target.className !== "far fa-circle"){
        return
    }
    // 抓取所指定的todo順序
    let currentIdx = e.target.dataset.completeindex;

    // 測試
    let presentIdx = parseInt(currentIdx)+1
    console.log(`選到第${presentIdx}個todo`);

    // 新增該筆物件到completeAry
    let todo   = { 
        items:'' 
    }
    let value      = activeAry[currentIdx].items;

    todo.items = value;
    completeAry.push(todo)

    
    // 使用splice將該筆資料從activeAry中移除
    activeAry.splice(currentIdx,1);
    
    activeRender();
    completeRender();

}

// 綁定完成單一todo的eventListener
insertBlock.addEventListener('click',completeSingle)

// ,.♫_____________________♪____________________♫,. //
// * 取消指定的todo
function cancleSingle(e){

    if(e.target.nodeName !== 'I'){
        return
    }
    else if(e.target.className !== "far fa-check-circle"){
        return
    }
    // 抓取所指定的todo順序
    let currentIdx = e.target.dataset.completeindex;

    // 測試
    let presentIdx = parseInt(currentIdx)+1
    console.log(`取消第${presentIdx}個todo`);

    // 新增該筆物件到activeAry
    let todo   = { 
        items:'' 
    }
    let value  = completeAry[currentIdx].items;

    todo.items = value;
    activeAry.push(todo);

    
    // 使用splice將該筆資料從completeAry中移除
    completeAry.splice(currentIdx,1);
    
    activeRender()
    completeRender()

}

// 綁定取消單一todo的eventListener
completeBlock.addEventListener('click',cancleSingle)

// ,.♫_____________________♪____________________♫,. //
// * 點擊向下icon選取全部todo
function selAllTodo(e){

    if(e.target.nodeName !== 'I'){
        return
    }else if(e.target.className !== "fas fa-chevron-down"){
        return
    }
    console.log(e);
    let listLength = activeAry.length;
    completeAry    = activeAry.slice(0,listLength);
    activeAry      = [];

    activeRender()
    completeRender()
    circleRender()

}

// 綁定向下icon的eventListener
selAllBtn.addEventListener('click',selAllTodo)

// ,.♫_____________________♪____________________♫,. //
// todo 點擊圓形向下icon取消選取全部todo
function cancleSelAll(e){
    
    if(e.target.nodeName !== 'I'){
        return
    }else if(e.target.className !== "fas fa-chevron-circle-down"){
        return
    }

    let listLength = activeAry.length;
    activeAry    = completeAry.slice(0,listLength);
    completeAry      = [];

    origRender()
    activeRender()
    completeRender()

}

// 綁定向下icon的eventListener
selAllBtn.addEventListener('click',cancleSelAll)

// ,.♫_____________________♪____________________♫,. //
// *修改todo的function
function editTodo(e){
    if(e.target.nodeName !== 'INPUT'){
        return
    }

    // 抓取所指定的todo順序
    let currentIdx = e.target.dataset.editindex;
    // 將該筆資料的物件值更新為新的value
    todoAry[currentIdx].items = e.target.value;

}
// 綁定修改完後點擊enter的eventListener
insertBlock.addEventListener('keypress',editTodo)

// ,.♫_____________________♪____________________♫,. //
// * 將active的todo render出來的function
function activeRender(){
    let strOfItem = '';

    activeAry.forEach((item,index) => {
        strOfItem += `<div class="listText listStyle">
        <span><i class="far fa-circle" data-completeindex=${index}></i></span>
        <input type="text" value="${item.items}" data-editindex=${index}>
        <span><i class="fas fa-times" data-delindex=${index}></i></span>
      </div>`;
    })
    
    // 更新todo的數量
    listLength.textContent = `${activeAry.length}`
    // 將新增的string插入綁定的DOM
    insertBlock.innerHTML = strOfItem;
}

// ,.♫_____________________♪____________________♫,. //
// * 將complete的todo render出來的function
function completeRender(){
    let strOfItem = '';

    completeAry.forEach((item,index) => {
        strOfItem += `<div class="listText listStyle">
        <span><i class="far fa-check-circle" data-completeindex=${index}></i></span>
        <input class="checkList" type="text" value="${item.items}" data-editindex=${index}>
        <span><i class="fas fa-times" data-delindex=${index}></i></span>
      </div>`;
    })
    
    // 更新todo的數量
    listLength.textContent = `${activeAry.length}`
    // 將新增的string插入綁定的DOM
    completeBlock.innerHTML = strOfItem;
}

// ,.♫_____________________♪____________________♫,. //
// * 點擊All顯示全部的todo
function allList(){
    activeRender()
    completeRender()
}

// 綁定All按鈕的eventListener
allBtn.addEventListener('click',allList)

// ,.♫_____________________♪____________________♫,. //
// * 點擊Active顯示全部active todo
function activeTodoList(){
    completeBlock.innerHTML = '';
    activeRender()
}

// 綁定Active按鈕的eventListener
activeBtn.addEventListener('click',activeTodoList)

// ,.♫_____________________♪____________________♫,. //
// * 點擊Complete顯示全部的todo
function completeTodoList(){
    insertBlock.innerHTML = '';
    completeRender()
}

// 綁定Complete按鈕的eventListener
completeBtn.addEventListener('click',completeTodoList)

// ,.♫_____________________♪____________________♫,. //
// * 點擊向下icon後render成新的圓形icon
function circleRender(){
    let strOfItem          = `<i class="fas fa-chevron-circle-down" id="newSelectAll"></i>`;  
    chevronBlock.innerHTML = strOfItem;

}

function origRender(){
    let strOfItem          = `<i class="fas fa-chevron-down" id="selectAll"></i>`;  
    chevronBlock.innerHTML = strOfItem;

}

// ,.♫_____________________♪____________________♫,. //
// * 點擊Clear complete刪除全部完成的todo
function delAllComplete(){
    completeAry = [];
    completeRender()
    origRender()
}

// 綁定Clear complete按鈕的eventListener
delAllBtn.addEventListener('click',delAllComplete)

// ,.♫_____________________♪____________________♫,. //
// *檢查用eventListener
inputBlock.addEventListener('keypress',(e) => {
    if(e.key === 'Enter')
    console.log('enter成功！')
})

