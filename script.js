let tasks=[]
let filter="all"

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");

  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    deadline: deadline,
    done: false
  };

  tasks.push(task);

  taskInput.value = "";
  deadlineInput.value = "";

  saveTasks();
  renderTasks();
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

list.innerHTML += `
<li class="task ${task.done ? "done":""}">

<input type="checkbox" ${task.done ? "checked":""} onclick="toggleTask(${index})">

<div class="task-content">
<span class="task-text">${task.priority ? "⭐ " : ""}${task.text}</span>
<small class="deadline">Deadline: ${task.deadline || "tidak ada"}</small>
</div>

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