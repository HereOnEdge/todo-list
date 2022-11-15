import Project from "./Project.js";
import { projectArray } from "./Project.js";
import { myProjects as navProjects } from "./navbar-ui.js";
import doneImgUrl from "./img/checklist.png";
import editImgUrl from "./img/edit-icon.png";
import removeImgUrl from "./img/remove-icon.png";
import infoImgUrl from "./img/info-icon.png";
import calendarImgUrl from "./img/calendar.png";
import importantImgUrl from "./img/important.png";

// display projects on main screen
export default (function projectsDisplayer() {
    const projectsSection = document.querySelector("#projects");
    const mainScreen = document.querySelector(".main-screen");
    projectsSection.addEventListener("click", () => {
        if (document.querySelector("#projectName-input")) {
            return;
        }
        mainScreen.innerHTML = "";
        const topScreen = document.createElement("div");
        topScreen.classList.add("top-screen");
        const bottomScreen = document.createElement("div");
        bottomScreen.classList.add("bottom-screen");
        mainScreen.appendChild(topScreen);
        mainScreen.appendChild(bottomScreen);
        const title = document.createElement("h2");
        title.textContent = "Project Manager";
        topScreen.appendChild(title);
        addProject();
        myProjects();

    })
})()
// new project section
let addProject = () => {
    const topScreen = document.querySelector(".top-screen");
    let newProject = undefined;
    if (document.querySelector(".newProject")) {
        newProject = document.querySelector(".newProject")
    } else {
        const containsNewProject = document.createElement("div");
        containsNewProject.classList.add("contains-newProject")
        newProject = document.createElement("div");
        newProject.classList.add("newProject");
        containsNewProject.appendChild(newProject);
        topScreen.appendChild(containsNewProject);
    }
    let projectName = document.createElement("input");
    projectName.type = "text";
    projectName.placeholder = "Add Project";
    projectName.id = "projectName-input";
    newProject.appendChild(projectName);
    addSign();
    projectName.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            document.querySelector(".plusSign").click();
        }
    })
    projectName.addEventListener("click", projectInfo)

}
// Plus Button for adding new project
let addSign = () => {
    let newProject = document.querySelector(".newProject")
    let addSign = document.createElement("div");
    addSign.textContent = "+"
    addSign.classList.add("plusSign");
    newProject.appendChild(addSign);
    projectAdder();

}
// collapsing window for adding new project 
let projectInfo = () => {
    if (document.querySelector("#projectDesc-input")) {
        return;
    } else {
        const projectname = document.querySelector("#projectName-input");
        projectname.placeholder += "(Name)";
        const newProject = document.querySelector(".newProject");
        const projectDesc = document.createElement("input")
        projectDesc.type = "text"
        projectDesc.placeholder = "Add Description (Optional)";
        projectDesc.id = "projectDesc-input";
        // make a div to store projectType and close button in it
        let lastColumn = document.createElement("div");
        lastColumn.classList.add("newProject-lastColumn");
        // make a select button for selecting project type
        const projectType = document.createElement("select");
        projectType.name = "type";
        projectType.id = "projectType-input";
        lastColumn.appendChild(projectType);

        // make a button for closing the collapsing window
        let btnContainer = document.createElement("div");
        btnContainer.classList.add("closeBtn-container");
        let btn = document.createElement("div");
        btn.classList.add("arrow");
        btnContainer.appendChild(btn);
        lastColumn.appendChild(btnContainer);
        // make arrow btn functional
        let plusSign = document.querySelector(".plusSign");
        btnContainer.addEventListener("click", () => {
            closeInfo();
            setTimeout(() => {
                projectname.remove();
                projectDesc.remove();
                lastColumn.remove();
                plusSign.remove();
                addProject();
            }, 600)
        });

        // create an option for each tag available
        let tags = ["Work", "Workout", "Educate", "Personal", "Day To Day"];
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Project's Tag"
        defaultOption.setAttribute("disabled", '');
        defaultOption.setAttribute("selected", '');
        projectType.appendChild(defaultOption);
        for (let i = 0; i < tags.length; i++) {
            let option = document.createElement("option");
            option.value = tags[i];
            option.textContent = tags[i];
            projectType.appendChild(option);
        }
        newProject.style.height = "135px";
        newProject.appendChild(projectDesc);
        newProject.appendChild(lastColumn);
        // make enter key save the new project on description input
        projectDesc.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                document.querySelector(".plusSign").click();
            }
        });
        // make enter button work on tag input too
        projectType.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                document.querySelector(".plusSign").click();
            }
        })
    }
}
// when plus button is clicked check for required information before adding a new project 
let projectAdder = () => {
    let addSign = document.querySelector(".plusSign");
    // disable the button if project name is empty and focus on name input
    addSign.addEventListener("click", () => {
        let projectName = document.querySelector("#projectName-input");
        if (projectName.value == "") {
            projectName.focus();
            projectInfo();
        } else {
            let projectDesc = document.querySelector("#projectDesc-input");
            let projectType = document.querySelector("#projectType-input");
            let lastColumn = document.querySelector(".newProject-lastColumn");
            let plusSign = document.querySelector(".plusSign");
            let project = Project(projectName.value, projectArray.length, projectDesc.value, projectType.value);
            projectArray.push(project)
            projectName.value = "";
            projectDesc.value = "";
            projectType.value = "";
            closeInfo();
            myProjects();
            navProjects();
            setTimeout(() => {
                projectName.remove();
                projectDesc.remove();
                lastColumn.remove();
                plusSign.remove();
                addProject();
            }, 600)

        }
    })
}
// close add project collapsing window
function closeInfo() {
    let newProject = document.querySelector(".newProject");
    newProject.style.height = "45px"
}

// show projects that are already in progress
function myProjects() {
    if (document.querySelector(".myProjects")) {
        document.querySelector(".myProjects").remove();
        document.querySelector(".bottom-title").remove();
    }
    let bottomScreen = document.querySelector(".bottom-screen");
    let projectsSection = document.createElement("div")
    projectsSection.classList.add("myProjects")
    let ul = document.createElement("ul");
    ul.classList.add("Projects-ul");
    let title = document.createElement("span");
    title.classList.add("bottom-title");
    title.textContent = "Here is what's next";
    projectsSection.appendChild(ul);
    bottomScreen.appendChild(title);
    bottomScreen.appendChild(projectsSection);
    for (let i = 0; i < projectArray.length; i++) {
        let projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        let project = document.createElement("li");
        project.classList.add("project")
        project.id = `project-num${i}`;
        projectContainer.appendChild(project)
        let editSpan = document.createElement("span");
        editSpan.classList.add("edit-span");
        editSpan.id = `eSpan${i}`;
        let dots = document.createElement("span")
        dots.classList.add("dots");
        dots.textContent = "..."
        editSpan.appendChild(dots);
        projectContainer.appendChild(editSpan);
        ul.appendChild(projectContainer);
        // set each project a name 
        const spanTitle = document.createElement("span");
        spanTitle.classList.add("pp-spanTitle");
        spanTitle.id = `spanTitle${i}`;
        project.appendChild(spanTitle);
        spanTitle.textContent = `${projectArray[i].name}`;
        // show how many tasks each project have
        const taskCounter = document.createElement("span");
        taskCounter.classList.add("taskCounter")
        taskCounter.id = `taskCounter${projectArray[i].id}`
        taskCounter.textContent = `${projectArray[i].tasks.length}`;
        project.appendChild(taskCounter);
    }
    detailShower();
    editDots();
}
// open each project info on click
let detailShower = () => {
    let projects = document.querySelectorAll(".project");
    let i = 0;
    for (let project of projects) {
        let spanTitle = document.querySelector(`#spanTitle${i}`);
        let projectObject = projectArray[i];
        let tasks = projectObject.tasks;
        i++;
        spanTitle.addEventListener("click", () => {
            if (project.classList.contains("open")) {
                let splitedProject = project.id.split('');
                let id = splitedProject[splitedProject.length - 1];
                if (document.querySelector(`#tasks-container${id}`)) {
                    document.querySelector(`#tasks-container${id}`).remove();
                }
                project.classList.toggle("open")
                project.style.height = "40px";
                return;
            }
            project.classList.toggle("open");
            project.style.height = `${100 + tasks.length * 30}px`;
            let tasksContainer = document.createElement("ul");
            tasksContainer.classList.add("tasks-container");
            let splitedProject = project.id.split('');
            let id = splitedProject[splitedProject.length - 1];
            tasksContainer.id = `tasks-container${id}`;
            project.appendChild(tasksContainer);
            // set a input to add new tasks to each project

            let newTaskContainer = document.createElement("div");
            newTaskContainer.classList.add("new-task-container");
            let input_btnContainer = document.createElement("div");
            input_btnContainer.classList.add("input-btn-container");
            let btn = document.createElement("div");
            btn.classList.add("taskAdder");
            btn.textContent = "+";
            input_btnContainer.appendChild(btn);
            let newTask = document.createElement("input");
            newTask.type = "text";
            newTask.placeholder = "Add Task";
            newTask.id = "newTask-input";
            input_btnContainer.appendChild(newTask);
            let dateContainer = document.createElement("div");
            dateContainer.classList.add("datepicker-container");
            let dateIcon = document.createElement("img");
            dateIcon.classList.add("datepicker-icon");
            dateIcon.src = calendarImgUrl;
            dateIcon.alt = "calendar icon";
            let newTaskTime = document.createElement("input");
            newTaskTime.type = "date";
            newTaskTime.id = "newTaskTime-input";
            let options = document.createElement("div");
            options.classList.add("newTask-options");
            dateContainer.appendChild(dateIcon);
            dateContainer.appendChild(newTaskTime);
            options.appendChild(dateContainer);
            newTaskContainer.appendChild(input_btnContainer);
            newTaskContainer.appendChild(options);
            // make a button for setting a task as important or not
            let important_btn = document.createElement("div");
            important_btn.classList.add("important-btn");
            let important_img = document.createElement("img");
            important_img.classList.add("important-img");
            important_img.src = importantImgUrl;
            important_img.alt = "important icon";
            important_btn.appendChild(important_img);
            options.appendChild(important_btn);
            tasksContainer.appendChild(newTaskContainer);
            
            // set a listener on task adder button 
            btn.addEventListener("click", () => {
                if (newTask.value === "") {
                    newTask.focus();
                    return;
                };
                console.log("i clicked");
                let taskName = newTask.value;
                let taskDate = newTaskTime.value;
                let task = projectObject.addTask(taskName, taskDate, true);
                projectObject.tasks.push(task);
                newTask.value = '';
                newTaskTime.value = '';
                let oldTasks = document.querySelectorAll(`#task${projectObject.id}`);
                for( let oldTask of oldTasks){
                    oldTask.remove();
                }
                displayTasks();
                project.style.height = `${100 + tasks.length * 30}px`;
                let taskCounter = document.querySelector(`#taskCounter${projectObject.id}`);
                taskCounter.textContent = tasks.length;
            })
            // if project doesnt have any tasks , quit
            if (tasks.length == 0) {
                return
            }

            // add project's tasks to it
            function displayTasks() {
                for (let y = 0; y < tasks.length; y++) {
                    let domTask = document.createElement("li");
                    domTask.classList.add("task");
                    domTask.id = `task${projectObject.id}`
                    domTask.textContent = tasks[y].name;
                    tasksContainer.appendChild(domTask);
                }
            };
            displayTasks();
        })
    }
}
// make each 3dot edit button functional
let editDots = () => {
    let container = document.querySelector(".Projects-ul");
    let dotsButtons = document.querySelectorAll(".edit-span");
    let openDots = "";                           // it contains the id number of 3dot edit button that is currently open
    for (let i = 0; i < dotsButtons.length; i++) {
        dotsButtons[i].addEventListener("click", () => {
            if (document.querySelector(`#layout${i}`)) {
                document.querySelector(`#layout${i}`).remove();
                dotsButtons[i].classList.toggle("open");
                return;
            };
            if (document.querySelector(".layout-container")) {
                document.querySelector(".layout-container").remove();
                document.querySelector(openDots).classList.toggle("open");
            };
            dotsButtons[i].classList.add("open");
            openDots = `#eSpan${i}`;
            let layoutContainer = document.createElement("div");
            layoutContainer.classList.add("layout-container");
            layoutContainer.id = `layout${i}`;
            container.appendChild(layoutContainer);
            layoutContainer.style["grid-area"] = `${i + 1} / 2 / span 1 / span 1`
            let triangle = document.createElement("div");
            triangle.classList.add("triangle");
            layoutContainer.appendChild(triangle);
            let mainBox = document.createElement("div");
            mainBox.classList.add("edit-mainBox");
            layoutContainer.appendChild(mainBox);
            let delButton = document.createElement("div");
            delButton.classList.add("del-button");
            delButton.classList.add("option");
            let removeIcon = document.createElement("img");
            removeIcon.classList.add("icon");
            removeIcon.src = removeImgUrl;
            removeIcon.alt = "remove icon";
            delButton.appendChild(removeIcon);
            mainBox.appendChild(delButton);
            let editButton = document.createElement("div");
            editButton.classList.add("edit-button");
            editButton.classList.add("option")
            let editIcon = document.createElement("img");
            editIcon.src = editImgUrl;
            editIcon.alt = "edit icon"
            editIcon.classList.add("icon");
            editButton.appendChild(editIcon);
            mainBox.appendChild(editButton);
            let completeButton = document.createElement("div");
            completeButton.classList.add("complete-button");
            completeButton.classList.add("option");
            let doneIcon = document.createElement("img")
            doneIcon.classList.add("icon");
            doneIcon.src = doneImgUrl;
            doneIcon.alt = "done icon";
            completeButton.appendChild(doneIcon);
            mainBox.appendChild(completeButton);
            let infoButton = document.createElement("div");
            infoButton.classList.add("info-button");
            infoButton.classList.add("option");
            let infoIcon = document.createElement("img");
            infoIcon.classList.add("icon");
            infoIcon.src = infoImgUrl;
            infoIcon.alt = "info icon";
            infoButton.appendChild(infoIcon);
            mainBox.appendChild(infoButton);
        })
    }


}
// display edit options for 3dot edit button
let disOptions = () => {

}

// make a function to get and store new taaks

// make a function to display how many days you have
// to complete each task in front of it
// make day counter smart

// make a function to sort tasks based on important tag
// also make a mark for important tag

// make a radio input to mark a task as complete