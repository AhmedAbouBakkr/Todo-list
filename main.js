// let person = prompt("Please Enter your Name","Mohamed");

// Selectors

let urname = document.querySelector(".heading h3 span");
let addBtn = document.querySelector(".add");
let opacity = document.querySelector(".background");
let create = document.querySelector(".create-task");
let container = document.querySelector(".container");
let form = document.querySelector(".create-task .form");
let add_task = document.querySelector(".create-task .form input");
let task_name = document.querySelector(".create-task .form textarea");
let task_catg = document.querySelector(".create-task .form select");
let allTask = document.querySelector(".all-task span");
let allTask_btn = document.querySelector(".all-task");
let complete_btn = document.querySelector(".complete");
let complete_spn = document.querySelector(".complete span");
let man = document.querySelector(".man");
let sa = document.querySelector(".sa");
let op = document.querySelector(".op");
let mar = document.querySelector(".mar");
let hu = document.querySelector(".hu");
let fi = document.querySelector(".fi");
let cs = document.querySelector(".cs");
let all = document.querySelector(".all");
let lists = document.querySelectorAll("a");


Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ((this.getSeconds() < 10)?"0":"") + ":" + this.getSeconds();
}

var datetime = new Date().today() + " - " +  new Date().timeNow();


//urname.innerHTML = person;

let tasks = [];

getFromLS();

let tasks_management = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Managment";
});
let tasks_sale = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Sale";
});
let tasks_opreation = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Opreations";
});
let tasks_marketing = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Marketing";
});
let tasks_hu = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Human Resourses";
});
let tasks_finance = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Finance";
});
let tasks_cs = tasks.filter((tasks)=>{
    return tasks.taskCatg == "Customer Services";
});

let c_tasks = tasks.filter((tasks)=>{
    return tasks.completed == true;
});

addTaskToPage(tasks);

countAllTask();

addBtn.onclick = () => {
    taskScreenOpen();
}

opacity.onclick = () => {
    taskScreenClose();
}

add_task.onclick = () => {

    if (task_catg != "" && task_name != "") {
        addTaskToArray (task_name.value,task_catg.value);
        task_name.value = "";
        taskScreenClose();
        addTaskToPage(tasks);
        countAllTask();
    }
}

all.onclick = () => {
    addActive(all);
    addTaskToPage(tasks);
}

man.onclick = () => {
    addActive(man);
    addTaskToPage(tasks_management);
}

sa.onclick = () => {
    addActive(sa);
    addTaskToPage(tasks_sale);
}

op.onclick = () => {
    addActive(op);
    addTaskToPage(tasks_opreation);
}

mar.onclick = () => {
    addActive(mar);
    addTaskToPage(tasks_marketing);
}

hu.onclick = () => {
    addActive(hu);
    addTaskToPage(tasks_hu);
}

fi.onclick = () => {
    addActive(fi);
    addTaskToPage(tasks_finance);
}

cs.onclick = () => {
    addActive(cs);
    addTaskToPage(tasks_cs);
}

complete_btn.onclick = () => {
    addTaskToPage(c_tasks);
}

allTask_btn.onclick = () => {
    addTaskToPage(tasks);
}

function addActive (element) {
    Array.from(lists).forEach((li)=>{
        li.classList.remove("active");
    })
    element.classList.add("active");
}


function addTaskToPage(tasks) {
    container.innerHTML = "";
    for(let i = 0 ; i < tasks.length ; i++){
        let task = document.createElement("div");
        task.className = "task";
        container.appendChild(task);

        let category = document.createElement("div");
        category.className = "catg";
        category.innerHTML = tasks[i].taskCatg;
        
        switch (tasks[i].taskCatg) {
            case "Managment":
                category.style.color = "#2670db";
                task.style.borderTop = "#2670db solid 2px";
                break;
            case "Sale":
                category.style.color = "#76b5c5";
                task.style.borderTop = "#76b5c5 solid 2px";
                break;
            case "Opreation":
                category.style.color = "#977543";
                task.style.borderTop = "#977543 solid 2px";
                break;
            case "Marketing":
                category.style.color = "#fa8d8d";
                task.style.borderTop = "#fa8d8d solid 2px";
                break;
            case "Human Resourses":
                category.style.color = "#f5b37a";
                task.style.borderTop = "#f5b37a solid 2px";
                break;
            case "Finance":
                category.style.color = "#a1db9a";
                task.style.borderTop = "#a1db9a solid 2px";
                break;
            case "Customer Services":
                category.style.color = "#ab45f6";
                task.style.borderTop = "#ab45f6 solid 2px";
                break;   
        }
        task.appendChild(category);
        

        let description = document.createElement("div");
        description.className = "desc";
        description.innerHTML = tasks[i].taskName;
        task.appendChild(description);

        let date = document.createElement("div");
        date.className = "date";
        date.innerHTML = `Task added at ${tasks[i].date}`;
        task.appendChild(date);

        task.addEventListener("click",() =>{
            complementaryChange(tasks[i]);
            addToLS(tasks);
            getFromLS();
            addTaskToPage(tasks);
            c_tasks = tasks.filter((tasks)=>{
                return tasks.completed == true;
            });
            countAllTask();
        });
        if (tasks[i].completed == true) {
            description.style.textDecoration = "line-through";
            task.classList.add("completed");
        }
    }

}

function addTaskToArray (taskName,taskCatg) {
    const task = {
        id : Date.now(),
        date : datetime,
        taskName : taskName,
        taskCatg : taskCatg,
        completed : false,
    }

    tasks.push(task);
    addToLS(tasks);
    tasks = [];
    getFromLS();
}

function addToLS(arrayOfTasks) {

    window.localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));

}

function getFromLS() {
    let data = window.localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data);
        console.log(tasks);
    }
}
  

function taskScreenOpen () {
    opacity.classList.add("show-bg");
    create.classList.add("show-cr");
    form.style.display = "block";
}

function taskScreenClose () {
    opacity.classList.remove("show-bg");
    create.classList.remove("show-cr");
    form.style.display = "none";
}

function countAllTask () {
    allTask.innerHTML = tasks.length;
    complete_spn.innerHTML = c_tasks.length;
}

function complementaryChange (task) {
    if (task.completed == false) {
        task.completed = true;
    }else {
        task.completed = false;
    }
}



