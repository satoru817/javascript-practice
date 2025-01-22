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

addBtn.addEventListener('click',(e)=>{
    e.preventDefault;
    var inputText = document.getElementById("newItem").value;

    console.log(inputText);

    const li = document.createElement('li');
    li.innerText = inputText;
    itemList.appendChild(li);
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