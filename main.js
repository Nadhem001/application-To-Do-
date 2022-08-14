let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
 
//empty array 

let arrayOfTasks = [];
//check if theres tasks in localStorage
if(localStorage.getItem('tasks')){
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}

//get data from localStorage
getDataFromLocalStorage();



// Add Task
submit.onclick = function(){
    if(input.value !==""){
        addTaskToArray(input.value); 
        input.value ="";
    }
}


function addTaskToArray(taskText){
    const task = {
        id:Date.now(),
        title:taskText,
        completed: false,
    };
    //push task To Array Of Tascks
    arrayOfTasks.push(task)
    //Add Tasks To page
    addElementToPageFrom(arrayOfTasks);
    //Add Tasks To Local Storage 
    AddDataToLocalStoragrFrom(arrayOfTasks);
}

//Click On Task Element 
tasksDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
        
        //Remove task from Loacal Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

        //Rmove Element From Page
        e.target.parentElement.remove();
    }

    //Task Element 
    if(e.target.classList.contains("task")){
        // toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        //toggle Done Class
        e.target.classList.toggle("done");
    }
})




function addElementToPageFrom(arrayOfTasks){
    //Empty tasks Div
    tasksDiv.innerHTML = "";
    //Looping On Array Of Tasks
    arrayOfTasks.forEach((task)=>{
        let div = document.createElement("div");
        div.className = "task";
        //check if task is Done
        if(task.completed){
            div.className = "task done"; 
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        //create Delete Button 
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode('delete'));
        //append  button to Main Div
        div.appendChild(span);
        //Add Task div To Tasks Container
        tasksDiv.appendChild(div)

    });
}

function AddDataToLocalStoragrFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId){
   arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
   AddDataToLocalStoragrFrom(arrayOfTasks);

}

function toggleStatusTaskWith(taskId){

    for(let i = 0; i<arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
            console.log(arrayOfTasks[i].completed)
        }
    }
    AddDataToLocalStoragrFrom(arrayOfTasks);
}