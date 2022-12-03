import { tagHub } from "./tags";
import { CompleteTask } from "./completeTask";

// add project's tasks to it
export function displayTasks(project, projectNode, tasksContainer) {
    let tasks = project.tasks;
    let tasksToShow = [];
    // coby tagHub into a new object
    let tagsCenter = tagHub();
    const __TaskDisplayer = () => {
        // create Nodes for each Task's parts(Task's completion, Name, time, tags) 
        for (let y = 0; y < tasksToShow.length; y++) {
            let domTask = document.createElement("li");
            tasksContainer.appendChild(domTask);
            let taskIsDoneContainer = document.createElement("div");
            taskIsDoneContainer.classList.add("doneTask-container");
            let doneMark = document.createElement("div");
            doneMark.classList.add("doneMark");
            taskIsDoneContainer.appendChild(doneMark);
            domTask.appendChild(taskIsDoneContainer);
            let taskName = document.createElement("span");
            taskName.classList.add("task-name");
            taskName.textContent = tasksToShow[y].name;
            domTask.appendChild(taskName);
            // time and date of task Container
            let taskDateTimeContainer = document.createElement("div");
            taskDateTimeContainer.classList.add("task-dateTime-container")
            domTask.appendChild(taskDateTimeContainer);
                // task's date container
            let taskDateContainer = document.createElement("div");
            taskDateContainer.classList.add("task-date-container");
            taskDateTimeContainer.appendChild(taskDateContainer);
                // check if task does have a date. if not dont show the container
                if(tasksToShow[y].date !== ''){
                    taskDateContainer.style.display = "flex";
                    // check if task have a time. if it does add a border bottom to date
                    if(tasksToShow[y].time !== ""){
                        taskDateContainer.style.borderWidth = "0 0 1px 0";
                    }
                }
                    // task's date icon
            taskDateContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="task-date-icon${tasksToShow[y].ID} task-icon"  width="16" height="16" fill="currentColor" viewBox="0 0 16 16"></svg>`;
            let dateIcon = document.querySelector(`.task-date-icon${tasksToShow[y].ID}`);
            dateIcon.innerHTML = '<path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z"/>'
            dateIcon.innerHTML += '<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>';
                    // task's date
            let taskDate = document.createElement("span");
            taskDate.classList.add("task-date");
            taskDate.textContent = tasksToShow[y].date;
            taskDateContainer.appendChild(taskDate);
                // task's time container
            let taskTimeContainer = document.createElement("div");
            taskTimeContainer.classList.add("task-time-container");
            taskDateTimeContainer.appendChild(taskTimeContainer);
                // check if task does have a time. if not dont show the container
                if(tasksToShow[y].time !== ''){
                    taskTimeContainer.style.display = "flex";
                }
                    // task's time icon
            taskTimeContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="task-time-icon${tasksToShow[y].ID} task-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"></svg>`;
            let timeIcon = document.querySelector(`.task-time-icon${tasksToShow[y].ID}`);
            timeIcon.innerHTML = '<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>';
            timeIcon.innerHTML += '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>';
            taskTimeContainer.appendChild(timeIcon);
                    // task's time
            let taskTime = document.createElement("span")
            taskTime.classList.add("task-time");
            taskTime.textContent = tasksToShow[y].time;
            taskTimeContainer.appendChild(taskTime)
            // task's tags container
            let taskTags = document.createElement("div");
            taskTags.classList.add("task-tags");
                // task's primary tag
            let tag = tagsCenter.showTag(tasksToShow[y].tag(), project.id, true)
            taskTags.appendChild(tag);
            domTask.appendChild(taskTags);
            domTask.classList.add("task");
            domTask.id = `task${project.id}`
            if (tasksToShow[y].important === true) {
                domTask.classList.add("important");
            };
            // check if user clicked on complete button, task removes from DOM Tree
            CompleteTask(taskIsDoneContainer, tasksToShow[y])
        }
        let combinedHeight = 0;
        let taskNodes = document.querySelectorAll(`#task${project.id}`);
        for (let node of taskNodes) {
            let style = getComputedStyle(node)
            let height = style.height;
            let splitted = height.split("px")
            combinedHeight += +splitted[0];
        }
        projectNode.style.height = `${100 + combinedHeight + (tasksToShow.length * 10)}px`;
        let taskCounter = document.querySelector(`#taskCounter${project.id}`);
        taskCounter.textContent = tasksToShow.length;
    }
    const none = () => {
        // if project doesnt have any tasks yet, don't do anything
        if(!document.querySelector(`#task${project.id}`)){
            return;
        }
        let oldTasks = document.querySelectorAll(`#task${project.id}`);
        for (let oldTask of oldTasks) {
            console.log(oldTask)
            tasksToShow.pop();
            oldTask.remove();
        }
    }
    const all = () => {
        for (let y = 0; y < tasks.length; y++) {
            // first check if task is not complete
            if (tasks[y].isComplete === false) {
                tasksToShow.push(tasks[y])
            }
        };
        __TaskDisplayer();
    };
    const important = () => {
        for (let y = 0; y < tasks.length; y++) {
            // first check if task is not complete
            if (tasks[y].isComplete === false) {
                // then check if it's importANT
                if (tasks[y].important) {
                    // AND ADD IT TO ARRAY
                    tasksToShow.push(tasks[y])
                }
            }
        }
        __TaskDisplayer();
    }
    return { all, important, none };
};