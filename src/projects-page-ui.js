import Project from "./Project.js";
import { projectArray } from "./Project.js";
import { myProjects as navProjects } from "./navbar-ui.js";
import doneImgUrl from "./img/checklist.png";
import editImgUrl from "./img/edit-icon.png";
import removeImgUrl from "./img/remove-icon.png";
import infoImgUrl from "./img/info-icon.png";
import stickyBackgroundUrl from "./img/sticky.jpg";
import coffeeBackgroundUrl from "./img/coffe.jpg";
import { startLoading } from "./loading.js";
import loader from "./loading.js";

// display projects on main screen
export default (function projectsDisplayer() {
    const projectsSection = document.querySelector("#projects");
    projectsSection.addEventListener("click", () => {
        if (document.querySelector("#projectName-input")) {
            return;
        }
        document.querySelector(".main-screen").remove();
        startLoading();
        const mainScreen = document.createElement("div");
        mainScreen.classList.add("main-screen");
        mainScreen.style.display = "none";
        document.querySelector("main").appendChild(mainScreen);
        // mainScreen.style.backgroundImage = `url(${stickyBackgroundUrl})`;
        // mainScreen.style.backgroundImage = `url(${laptopBackgroundUrl})`;
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
        let background = new Image();
        background.src = coffeeBackgroundUrl;
        mainScreen.style.backgroundImage = `url(${coffeeBackgroundUrl})`;
        background.addEventListener("load", () => {
            setTimeout(() => {
                loader();
            }, 1300);
        })
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
            projectInfo();
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
            project.style.height = `${100 + tasks.length * 50}px`;
            let tasksContainer = document.createElement("ul");
            tasksContainer.classList.add("tasks-container");
            let splitedProject = project.id.split('');
            let id = splitedProject[splitedProject.length - 1];
            tasksContainer.id = `tasks-container${id}`;
            project.appendChild(tasksContainer);
            // set a input to add new tasks to each project

            let newTaskContainer = document.createElement("div");
            newTaskContainer.classList.add("new-task-container");
            let flippingCard = document.createElement("div");
            flippingCard.classList.add("flipping-card");
            flippingCard.id = `flipping-card${id}`;
            flippingCard.appendChild(newTaskContainer);
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
            dateContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="datepicker-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"></svg>';
            let timeContainer = document.createElement("div");
            timeContainer.classList.add("timepicker-container");
            timeContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="timepicker-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"></svg>';
            let options = document.createElement("div");
            options.classList.add("newTask-options");
            let newTaskDate = document.createElement("input");
            newTaskDate.type = "date";
            newTaskDate.id = "newTaskDate-input";
            newTaskDate.tabIndex = "-1";
            let newTaskTime = document.createElement("input");
            newTaskTime.type = "time";
            newTaskTime.id = "newTaskTime-input";
            newTaskTime.tabIndex = "-1"; 
            timeContainer.appendChild(newTaskTime);
            dateContainer.appendChild(newTaskDate);
            options.appendChild(timeContainer);
            options.appendChild(dateContainer);
            // create a button that if clicked, new task inputs appear
            function addTaskButton() {
                let addTask = document.createElement("div");
                addTask.classList.add("addTask-button");
                let addTaskTxt = document.createElement("span");
                addTaskTxt.textContent = "Add Task";
                addTaskTxt.classList.add("addTask-button-txt");
                addTask.appendChild(addTaskTxt);
                let addTaskPLus = document.createElement("span");
                addTaskPLus.classList.add("addTask-button-plus");
                addTaskPLus.textContent = "+";
                addTask.appendChild(addTaskPLus);
                newTaskContainer.appendChild(addTask);
                // hide the button on click and show inputs
                addTask.addEventListener("click", () => {
                    addTask.classList.add("hidden");
                    let sortButton = document.querySelector(`#sort${projectObject.id}`);
                    sortButton.classList.add("hidden")
                    setTimeout(() => {
                        addTask.remove();
                        sortButton.remove();
                        newTaskContainer.appendChild(input_btnContainer);
                        newTaskContainer.appendChild(options)
                        let dateIcon = document.querySelector(".datepicker-icon");
                        dateIcon.innerHTML = '<path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z"/>'
                        dateIcon.innerHTML += '<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>';
                        let timeIcon = document.querySelector(".timepicker-icon");
                        timeIcon.innerHTML = '<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>';
                        timeIcon.innerHTML += '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>'
                    }, 600);
                })
            }
            sortImportant();
            addTaskButton();
            tasksContainer.appendChild(flippingCard);
            // make a button to sort tasks that are important
            function sortImportant() {
                let sorted = document.querySelector(`.sorted${projectObject.id}`);
                console.log(sorted)
                if (sorted) {
                    console.log("sorted exists")
                    sorted.addEventListener("click", () => {
                        sorted.textContent = "Important"
                        sorted.classList.remove(`sorted${projectObject.id}`);
                        display.none();
                        display.all();
                        sortImportant();
                    })
                } else {
                    let sortButton = null;
                    if(document.querySelector(`#sort${projectObject.id}`)) {
                        sortButton = document.querySelector(`#sort${projectObject.id}`);
                    } else {
                        sortButton = document.createElement("div");
                        sortButton.textContent = "Important";
                        sortButton.classList.add("sort-button");
                        sortButton.id = `sort${projectObject.id}`;
                        newTaskContainer.appendChild(sortButton);
                    }
                    // if clicked, remove every task from dom and only add those that are important
                    sortButton.addEventListener("click", () => {
                        sortButton.classList.add(`sorted${projectObject.id}`);
                        sortButton.textContent = "All";
                        display.none();
                        display.important();
                        sortImportant();
                    })
                }
            }
            // set a listener on task adder button 
            (function taskAdder() {
                btn.addEventListener("click", () => {
                    if (newTask.value === "") {
                        newTask.focus();
                        return;
                    };
                    let taskName = '';
                    let taskDate = '';
                    let taskTime = '';
                    let taskImportance = false;
                    // flip the new task's section to ask if the task is important or not
                    let flippingCard = document.querySelector(`#flipping-card${projectObject.id}`);
                    flippingCard.classList.add("flipped");
                    let importanceSide = document.createElement("div");
                    importanceSide.classList.add("newTask-backSide");
                    let question = document.createElement("span");
                    question.textContent = "is this shit realy important?";
                    question.classList.add("importance-question");
                    let buttons = document.createElement('div');
                    buttons.classList.add("importance-buttons");
                    // make two buttons for no and yes
                    let yesButton = document.createElement("div");
                    yesButton.classList.add("yes-button");
                    yesButton.tabIndex = "2";
                    let yes = document.createElement("div")
                    yes.classList.add("yes");
                    let noButton = document.createElement("div");
                    noButton.classList.add("no-button");
                    noButton.tabIndex = "1";
                    let no = document.createElement("div");
                    no.classList.add("no");
                    no.textContent = "x";
                    yesButton.appendChild(yes);
                    noButton.appendChild(no);
                    buttons.appendChild(noButton);
                    buttons.appendChild(yesButton);
                    importanceSide.appendChild(buttons);
                    importanceSide.appendChild(question);
                    flippingCard.appendChild(importanceSide);
                    // focus yesButton so you can easily press enter to pass your answer
                    setTimeout(() => {
                        noButton.focus();
                    }, 300);
                    // check for an answer that if task is important or not
                    yesButton.addEventListener("click", () => {
                        taskImportance = true;
                        taskName = newTask.value;
                        taskDate = newTaskDate.value;
                        taskTime = newTaskTime.value;
                        taskHandler();
                    });
                    noButton.addEventListener("click", () => {
                        taskImportance = false;
                        taskName = newTask.value;
                        taskDate = newTaskDate.value;
                        taskTime = newTaskTime.value;
                        taskHandler();
                    })
                    // click yes or no buttons using enter key on keyboard
                    yesButton.addEventListener("keyup", (event) => {
                        if (event.keyCode === 13) {
                            yesButton.click();
                        }
                    });
                    noButton.addEventListener("keyup", (event) => {
                        if (event.keyCode === 13) {
                            noButton.click();
                        }
                    })
                    // make a function to add the task and display everything in it's place 
                    function taskHandler() {
                        let task = projectObject.addTask(taskName, taskDate, taskTime, taskImportance);
                        flippingCard.classList.remove("flipped");
                        projectObject.tasks.push(task);
                        // remove task inputs and put newtask button back in its place
                        newTaskContainer.removeChild(input_btnContainer);
                        newTaskContainer.removeChild(options);
                        newTask.value = "";
                        newTaskDate.value = "";
                        newTaskTime.value = "";
                        sortImportant();
                        addTaskButton();
                        display.none();
                        // let oldTasks = document.querySelectorAll(`#task${projectObject.id}`);
                        // for (let oldTask of oldTasks) {
                        //     oldTask.remove();
                        // }
                        display.all();
                    }
                });
                // make task adder button work on enter button when you are on task name input
                newTask.addEventListener("keypress", (event) => {
                    if (event.keyCode === 13) {
                        btn.click();
                    };
                });
                // make task adder button work on calender when you click enter key
                newTaskDate.addEventListener("keypress", (event) => {
                    if (event.keyCode === 13) {
                        btn.click();
                    };
                });
            })();
            // if project doesnt have any tasks , quit
            if (tasks.length == 0) {
                return
            }

            // add project's tasks to it
            function displayTasks() {
                let tasksToShow = [];
                const __TaskDisplayer = () => {
                    for (let y = 0; y < tasksToShow.length; y++) {
                        let domTask = document.createElement("li");
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
                        let taskDate = document.createElement("span");
                        taskDate.classList.add("task-date");
                        taskDate.textContent = tasksToShow[y].date;
                        domTask.appendChild(taskDate);
                        let taskTags = document.createElement("div");
                        taskTags.classList.add("task-tags");
                        domTask.appendChild(taskTags);
                        domTask.classList.add("task");
                        domTask.id = `task${projectObject.id}`
                        if (tasksToShow[y].important === true) {
                            domTask.classList.add("important");
                        };
                        tasksContainer.appendChild(domTask);
                    }
                    let combinedHeight = 0;
                    let taskNodes = document.querySelectorAll(`#task${id}`);
                    for(let node of taskNodes) {
                        let style = getComputedStyle(node)
                        let height = style.height;
                        let splitted = height.split("px")
                        combinedHeight += +splitted[0];
                    }
                    project.style.height = `${100 + combinedHeight + (tasksToShow.length * 10)}px`;
                    let taskCounter = document.querySelector(`#taskCounter${projectObject.id}`);
                    taskCounter.textContent = tasksToShow.length;
                }
                const none = () => {
                    let oldTasks = document.querySelectorAll(`#task${projectObject.id}`); 
                    for (let oldTask of oldTasks) {
                        tasksToShow.pop();
                        oldTask.remove();
                    }
                }
                const all = () => {
                    for (let y = 0; y < tasks.length; y++) {
                        tasksToShow.push(tasks[y])
                    };
                    __TaskDisplayer();
                };
                const important = () => {
                    for (let y = 0; y < tasks.length; y++) {
                        if (tasks[y].important) {
                            tasksToShow.push(tasks[y])
                        }
                    }
                    __TaskDisplayer();
                }
                return { all, important, none };
            };
            let display = displayTasks();
            display.all();

            // check for important tasks and give them priority and design
            function importance() {
                let importantOnes = [];
                for (let i = 0; i < projectObject.tasks; i++) {
                    if (projectObject.tasks[i].important === true) {
                        importantOnes.push(projectObject.tasks[i]);
                    }
                }
            }
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