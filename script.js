let tasks=[]
let filter="all"

function addTask(){

let input=document.getElementById("taskInput")
let text=input.value.trim()

if(text==="") return

tasks.push({
text:text,
done:false,
priority:false
})

input.value=""

renderTasks()
}

function toggleTask(index){
tasks[index].done=!tasks[index].done
renderTasks()
}

function deleteTask(index){
tasks.splice(index,1)
renderTasks()
}

function togglePriority(index){
tasks[index].priority=!tasks[index].priority
renderTasks()
}

function setFilter(type){
filter=type
renderTasks()
}

function renderTasks(){

let list=document.getElementById("taskList")
let counter=document.getElementById("taskCounter")
let empty=document.getElementById("emptyText")

list.innerHTML=""

let done=0
let visible=0

tasks.forEach((task,index)=>{

if(filter==="active" && task.done) return
if(filter==="done" && !task.done) return

visible++

if(task.done) done++

list.innerHTML+=`
<li class="task ${task.done ? "done":""}">

<input type="checkbox" ${task.done ? "checked":""} onclick="toggleTask(${index})">

<span>${task.priority ? "⭐ " : ""}${task.text}</span>

<button onclick="togglePriority(${index})">⭐</button>
<button onclick="deleteTask(${index})">🗑</button>

</li>
`
})

counter.innerText=`${done} selesai dari ${tasks.length} tugas`

empty.style.display = tasks.length===0 ? "block" : "none"

let percent = tasks.length ? (done/tasks.length)*100 : 0
document.getElementById("progressFill").style.width = percent + "%"

}

function toggleDark(){
document.body.classList.toggle("dark")
}