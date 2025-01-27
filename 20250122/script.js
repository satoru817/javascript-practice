var target1 = document.getElementById("target1");
var highlight_me = document.querySelector(".highlight-me");

target1.style.color = "red";
highlight_me.style.backgroundColor = "yellow";

var btn1 = document.getElementById("btn1");
var output1 = document.getElementById("output1");
var count = 1;

btn1.addEventListener('click',()=>{
    output1.textContent = "クリックされました 回数："+count;
    count++;
});

var addBtn = document.getElementById("addBtn");
var itemList = document.getElementById('itemList');

// addBtn.addEventListener('click',(e)=>{
//     e.preventDefault();
//     var inputText = document.getElementById("newItem").value;

//     console.log(inputText);

//     const li = document.createElement('li');
//     li.innerText = inputText;
//     itemList.appendChild(li);
// });

// 入力フィールドのクリア
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputField = document.getElementById("newItem");
    const inputText = inputField.value;
    
    if (inputText.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = inputText;  // innerTextよりtextContentを推奨
        itemList.appendChild(li);
        inputField.value = "";  // 入力クリア
    }
});


var toggleBtn = document.getElementById("toggleBtn");
var colorBox = document.getElementById("toggleBox");

toggleBtn.addEventListener('click',()=>{
    if(colorBox.style.backgroundColor == "blue"){
        colorBox.style.backgroundColor = "yellow";
    }else{
        colorBox.style.backgroundColor = "blue";
    }
})

const nameInput = document.getElementById("username");

const myForm = document.getElementById("myForm");

myForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = nameInput.value;

    if(name.trim()==""){
        alert("有効な名前が入力されていません");
    }else{
        alert("送信成功");
    }
})