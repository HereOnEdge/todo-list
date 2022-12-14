import Project, { projectArray } from "./Project.js";
import { myProjects as navProjects } from "./navbar-ui.js";
import stickyBackgroundUrl from "./img/sticky.jpg";
import coffeeBackgroundUrl from "./img/coffe.jpg";
import loader, { startLoading } from "./loading.js";
import { tagHub , choosedTag } from "./tags.js";
import { displayTasks } from "./displayTasks-DOM.js";

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
    const background = new Image();
    background.src = coffeeBackgroundUrl;
    mainScreen.style.backgroundImage = `url(${coffeeBackgroundUrl})`;
    background.addEventListener("load", () => {
      setTimeout(() => {
        loader();
      }, 1300);
    });
  });
})();
// new project section
const addProject = () => {
  const topScreen = document.querySelector(".top-screen");
  let newProject;
  if (document.querySelector(".newProject")) {
    newProject = document.querySelector(".newProject");
  } else {
    const containsNewProject = document.createElement("div");
    containsNewProject.classList.add("contains-newProject");
    newProject = document.createElement("div");
    newProject.classList.add("newProject");
    containsNewProject.appendChild(newProject);
    topScreen.appendChild(containsNewProject);
  }
  const projectName = document.createElement("input");
  projectName.type = "text";
  projectName.placeholder = "Add Project";
  projectName.id = "projectName-input";
  newProject.appendChild(projectName);
  addSign();
  projectName.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      document.querySelector(".plusSign").click();
    }
  });
  projectName.addEventListener("click", projectInfo);
};
// Plus Button for adding new project
const addSign = () => {
  const newProject = document.querySelector(".newProject");
  const addSign = document.createElement("div");
  addSign.textContent = "+";
  addSign.classList.add("plusSign");
  newProject.appendChild(addSign);
  projectAdder();
};
// collapsing window for adding new project
const projectInfo = () => {
  if (document.querySelector("#projectDesc-input")) {
        
  } else {
    const projectname = document.querySelector("#projectName-input");
    projectname.placeholder += "(Name)";
    const newProject = document.querySelector(".newProject");
    const projectDesc = document.createElement("input");
    projectDesc.type = "text";
    projectDesc.placeholder = "Add Description (Optional)";
    projectDesc.id = "projectDesc-input";
    // make a div to store projectType and close button in it
    const lastColumn = document.createElement("div");
    lastColumn.classList.add("newProject-lastColumn");
    // make a select button for selecting project type
    const projectType = document.createElement("select");
    projectType.name = "type";
    projectType.id = "projectType-input";
    lastColumn.appendChild(projectType);

    // make a button for closing the collapsing window
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("closeBtn-container");
    const btn = document.createElement("div");
    btn.classList.add("arrow");
    btnContainer.appendChild(btn);
    lastColumn.appendChild(btnContainer);
    // make arrow btn functional
    const plusSign = document.querySelector(".plusSign");
    btnContainer.addEventListener("click", () => {
      closeInfo();
      setTimeout(() => {
        projectname.remove();
        projectDesc.remove();
        lastColumn.remove();
        plusSign.remove();
        addProject();
      }, 600);
    });

    // create an option for each tag available
    const tags = ["Work", "Workout", "Educate", "Personal", "Day To Day"];
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Project's Tag";
    defaultOption.setAttribute("disabled", "");
    defaultOption.setAttribute("selected", "");
    projectType.appendChild(defaultOption);
    for (let i = 0; i < tags.length; i++) {
      const option = document.createElement("option");
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
    });
  }
};
// when plus button is clicked check for required information before adding a new project
const projectAdder = () => {
  const addSign = document.querySelector(".plusSign");
  // disable the button if project name is empty and focus on name input
  addSign.addEventListener("click", () => {
    const projectName = document.querySelector("#projectName-input");
    if (projectName.value === "") {
      projectName.focus();
      projectInfo();
    } else {
      projectInfo();
      const projectDesc = document.querySelector("#projectDesc-input");
      const projectType = document.querySelector("#projectType-input");
      const lastColumn = document.querySelector(".newProject-lastColumn");
      const plusSign = document.querySelector(".plusSign");
      const project = Project(
        projectName.value,
        projectArray.length,
        projectDesc.value,
        projectType.value
      );
      projectArray.push(project);
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
      }, 600);
    }
  });
};
// close add project collapsing window
function closeInfo() {
  const newProject = document.querySelector(".newProject");
  newProject.style.height = "45px";
}

// show projects that are already in progress
function myProjects() {
  if (document.querySelector(".myProjects")) {
    document.querySelector(".myProjects").remove();
    document.querySelector(".bottom-title").remove();
  }
  if (projectArray.length === 0) {
    return;
  }
  const bottomScreen = document.querySelector(".bottom-screen");
  const projectsSection = document.createElement("div");
  projectsSection.classList.add("myProjects");
  const ul = document.createElement("ul");
  ul.classList.add("Projects-ul");
  const title = document.createElement("span");
  title.classList.add("bottom-title");
  title.textContent = "Here is what's next";
  projectsSection.appendChild(ul);
  bottomScreen.appendChild(title);
  bottomScreen.appendChild(projectsSection);
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].complete) {
      continue;
    }
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    const project = document.createElement("li");
    project.classList.add("project");
    project.id = `project-num-${i}`;
    projectContainer.appendChild(project);
    const editSpan = document.createElement("span");
    editSpan.classList.add("edit-span");
    editSpan.id = `eSpan${i}`;
    const dots = document.createElement("span");
    dots.classList.add("dots");
    dots.textContent = "...";
    editSpan.appendChild(dots);
    projectContainer.appendChild(editSpan);
    ul.appendChild(projectContainer);
    // set each project a name
    const spanTitle = document.createElement("a");
    spanTitle.href = `javascript:setTimeout(()=>{window.location = '#spanTitle${i}' },300)`;
    spanTitle.classList.add("pp-spanTitle");
    spanTitle.id = `spanTitle${i}`;
    project.appendChild(spanTitle);
    spanTitle.textContent = `${projectArray[i].name}`;
    // show how many tasks each project have
    const taskCounter = document.createElement("span");
    taskCounter.classList.add("taskCounter");
    taskCounter.id = `taskCounter${projectArray[i].id}`;
    taskCounter.textContent = `${projectArray[i].tasks.length}`;
    project.appendChild(taskCounter);
  }
  detailShower();
  editDots();
}
// show completed projects
function completedProjects() {
  // store each project that is complete in a array
  const completedProjectsArray = [];
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].complete) {
      completedProjectsArray.push(projectArray[i]);
    }
  }
  // if we have any completed projects show the section. if not quit the function
  if (completedProjectsArray.length === 0) {
    return;
  }
  const bottomScreen = document.querySelector(".bottom-screen");
  const completeProjectsContainer = document.createElement("div");
  completeProjectsContainer.classList.add("completed-section");
  bottomScreen.appendChild(completeProjectsContainer);
  const showCompleted = document.createElement("div");
  showCompleted.classList.add("show-completed-button");
  completeProjectsContainer.appendChild(showCompleted);
  const completeProjects = document.createElement("div");
  completeProjects.classList.add("complete-projects");
  completeProjectsContainer.appendChild(completeProjects);
  for (let i = 0; i < completedProjectsArray.length; i++) {}
}
// make some variables to export some functions from detailShower
export let importantButton;
export let displayObject;

// open each project info on click
const detailShower = () => {
  // let display =
  const projects = document.querySelectorAll(".project");
  let i = 0;
  for (const project of projects) {
    const spanTitle = document.querySelector(`#spanTitle${i}`);
    const projectObject = projectArray[i];
    const tasks = projectObject.tasks;
    i++;
    spanTitle.addEventListener("click", () => {
      let openProject;
      if (project.classList.contains("open")) {
        const splitedProject = project.id.split("-");
        const id = splitedProject[2];
        if (document.querySelector(`#tasks-container-${id}`)) {
          document.querySelector(`#tasks-container-${id}`).remove();
        }
        project.classList.toggle("open");
        project.style.height = "40px";
        return;
      }
      for (const p of projects) {
        if (p.classList.contains("open")) {
          openProject = p;
        }
      }
      if (openProject) {
        const splitedOpenProject = openProject.id.split("-");
        const id = splitedOpenProject[2];
        const openProjectNode = document.querySelector(`#project-num-${id}`);
        openProjectNode.classList.remove("open");
        document.querySelector(`#tasks-container-${id}`).remove();
        openProject.style.height = "40px";
      }
      project.classList.toggle("open");
      project.style.height = `${100 + tasks.length * 50}px`;
      const tasksContainer = document.createElement("ul");
      tasksContainer.classList.add("tasks-container");
      const splitedProject = project.id.split("-");
      const id = splitedProject[2];
      tasksContainer.id = `tasks-container-${id}`;
      project.appendChild(tasksContainer);
      // set a input to add new tasks to each project

      const newTaskContainer = document.createElement("div");
      newTaskContainer.classList.add("new-task-container");
      const flippingCard = document.createElement("div");
      flippingCard.classList.add("flipping-card");
      flippingCard.id = `flipping-card${id}`;
      flippingCard.appendChild(newTaskContainer);
      const input_btnContainer = document.createElement("div");
      input_btnContainer.classList.add("input-btn-container");
      const btn = document.createElement("div");
      btn.classList.add("taskAdder");
      btn.textContent = "+";
      input_btnContainer.appendChild(btn);
      const newTask = document.createElement("input");
      newTask.type = "text";
      newTask.placeholder = "Add Task";
      newTask.id = "newTask-input";
      input_btnContainer.appendChild(newTask);
      const dateContainer = document.createElement("div");
      dateContainer.classList.add("datepicker-container");
      dateContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="datepicker-icon datepicker${projectObject.id}" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"></svg>`;
      const timeContainer = document.createElement("div");
      timeContainer.classList.add("timepicker-container");
      timeContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="timepicker-icon timepicker${projectObject.id}" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"></svg>`;
      const options = document.createElement("div");
      options.classList.add("newTask-options");
      const newTaskDate = document.createElement("input");
      newTaskDate.type = "date";
      newTaskDate.id = "newTaskDate-input";
      newTaskDate.tabIndex = "-1";
      const newTaskTime = document.createElement("input");
      newTaskTime.type = "time";
      newTaskTime.id = "newTaskTime-input";
      newTaskTime.tabIndex = "-1";
      timeContainer.appendChild(newTaskTime);
      dateContainer.appendChild(newTaskDate);
      options.appendChild(timeContainer);
      options.appendChild(dateContainer);
      // create a button that if clicked, new task inputs appear
      function addTaskButton() {
        const addTask = document.createElement("div");
        addTask.classList.add("addTask-button");
        const addTaskTxt = document.createElement("span");
        addTaskTxt.textContent = "Add Task";
        addTaskTxt.classList.add("addTask-button-txt");
        addTask.appendChild(addTaskTxt);
        const addTaskPLus = document.createElement("span");
        addTaskPLus.classList.add("addTask-button-plus");
        addTaskPLus.textContent = "+";
        addTask.appendChild(addTaskPLus);
        newTaskContainer.appendChild(addTask);
        // hide the button on click and show inputs
        addTask.addEventListener("click", () => {
          addTask.classList.add("hidden");
          const sortButton = document.querySelector(`#sort${projectObject.id}`);
          sortButton.classList.add("hidden");
          setTimeout(() => {
            addTask.remove();
            sortButton.remove();
            newTaskContainer.appendChild(input_btnContainer);
            newTaskContainer.appendChild(options);
            // make tags and append it in Options Section
            const tagsMainContainer = tagHub();
            tagsMainContainer.addFullContainer(projectObject.id, options);
            // make date and time icons and append them
            const dateIcon = document.querySelector(
              `.datepicker${projectObject.id}`
            );
            dateIcon.innerHTML =
              '<path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z"/>';
            dateIcon.innerHTML +=
              '<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>';
            const timeIcon = document.querySelector(
              `.timepicker${projectObject.id}`
            );
            timeIcon.innerHTML =
              '<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>';
            timeIcon.innerHTML +=
              '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>';
            newTask.focus();
          }, 600);
        });
      }
      tasksContainer.appendChild(flippingCard);
      // store displayTasks function inside a new Object
      const display = displayTasks(projectObject, project, tasksContainer);
      // store display inside a global varibale so we can export it
      displayObject = display;
      sortImportant();
      addTaskButton();
      // make a button to sort tasks that are important
      function sortImportant() {
        const sorted = document.querySelector(`.sorted${projectObject.id}`);
        console.log(sorted);
        if (sorted) {
          console.log("sorted exists");
          sorted.addEventListener("click", () => {
            sorted.textContent = "Important";
            sorted.classList.remove(`sorted${projectObject.id}`);
            display.none();
            display.all();
            sortImportant();
          });
        } else {
          let sortButton = null;
          if (document.querySelector(`#sort${projectObject.id}`)) {
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
          });
        }
      }
      importantButton = sortImportant;
      // set a listener on task adder button
      (function taskAdder() {
        btn.addEventListener("click", () => {
          if (newTask.value === "") {
            newTask.focus();
            return;
          }
          let taskName = "";
          let taskDate = "";
          let taskTime = "";
          let taskTag = "";
          let taskImportance = false;
          // flip the new task's section to ask if the task is important or not
          const flippingCard = document.querySelector(
            `#flipping-card${projectObject.id}`
          );
          flippingCard.classList.add("flipped");
          const importanceSide = document.createElement("div");
          importanceSide.classList.add("newTask-backSide");
          const question = document.createElement("span");
          question.textContent = "is this shit realy important?";
          question.classList.add("importance-question");
          const buttons = document.createElement("div");
          buttons.classList.add("importance-buttons");
          // make two buttons for no and yes
          const yesButton = document.createElement("div");
          yesButton.classList.add("yes-button");
          yesButton.tabIndex = "2";
          const yes = document.createElement("div");
          yes.classList.add("yes");
          const noButton = document.createElement("div");
          noButton.classList.add("no-button");
          noButton.tabIndex = "1";
          const no = document.createElement("div");
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
            taskTag = choosedTag;
            taskHandler();
          });
          noButton.addEventListener("click", () => {
            taskImportance = false;
            taskName = newTask.value;
            taskDate = newTaskDate.value;
            taskTime = newTaskTime.value;
            taskTag = choosedTag;
            taskHandler();
          });
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
          });
          // make a function to add the task and display everything in it's place
          function taskHandler() {
            projectObject.addTask(
              taskName,
              taskDate,
              taskTime,
              taskTag,
              taskImportance
            );
            flippingCard.classList.remove("flipped");
            // remove task inputs and put newtask button back in its place
            newTaskContainer.removeChild(input_btnContainer);
            options.removeChild(options.lastChild);
            newTaskContainer.removeChild(options);
            // let tagsMainContainer = document.querySelector('.tags-mainContainer');
            // tagsMainContainer.remove();
            newTask.value = "";
            newTaskDate.value = "";
            newTaskTime.value = "";
            taskTag = "";
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
          }
        });
        // make task adder button work on calender when you click enter key
        newTaskDate.addEventListener("keypress", (event) => {
          if (event.keyCode === 13) {
            btn.click();
          }
        });
      })();
      // if project doesnt have any tasks , quit
      if (tasks.length === 0) {
        return;
      }
      display.all();
    });
  }
};
// make each 3dot edit button functional
const editDots = () => {
  const dotsButtons = document.querySelectorAll(".edit-span");
  let openDots = ""; // it contains the id number of 3dot edit button that is currently open
  for (let i = 0; i < dotsButtons.length; i++) {
    dotsButtons[i].addEventListener("click", () => {
      if (document.querySelector(`#layout${i}`)) {
        document.querySelector(`#layout${i}`).remove();
        dotsButtons[i].classList.toggle("open");
        return;
      }
      if (document.querySelector(".layout-container")) {
        document.querySelector(".layout-container").remove();
        document.querySelector(openDots).classList.toggle("open");
      }
      openDots = displayOptions(i);
    });
  }
};
// display edit options for 3dot edit button
const displayOptions = (index) => {
  const container = document.querySelector(".Projects-ul");
  const dotsButtons = document.querySelectorAll(".edit-span");
  dotsButtons[index].classList.add("open");
  const openDots = `#eSpan${index}`;
  const layoutContainer = document.createElement("div");
  layoutContainer.classList.add("layout-container");
  layoutContainer.id = `layout${index}`;
  container.appendChild(layoutContainer);
  layoutContainer.style["grid-area"] = `${index + 1} / 2 / span 1 / span 1`;
  const triangle = document.createElement("div");
  triangle.classList.add("triangle");
  layoutContainer.appendChild(triangle);
  const mainBox = document.createElement("div");
  mainBox.classList.add("edit-mainBox");
  layoutContainer.appendChild(mainBox);
  const delButton = document.createElement("div");
  delButton.classList.add("del-button");
  delButton.classList.add("option");
  delButton.id = `option-${projectArray[index].id}`;
  const removeIcon = document.createElement("div");
  removeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>`;
  removeIcon.classList.add("icon");
  delButton.appendChild(removeIcon);
  mainBox.appendChild(delButton);
  const completeButton = document.createElement("div");
  completeButton.classList.add("complete-button");
  completeButton.classList.add("option");
  completeButton.id = `option-${projectArray[index].id}`;
  const doneIcon = document.createElement("div");
  doneIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
  </svg>`;
  doneIcon.classList.add("icon");
  completeButton.appendChild(doneIcon);
  mainBox.appendChild(completeButton);
  removeProject(projectArray[index].id);
  return openDots;
};
// remove or complete the project on click on it's 3Dot button's options
function removeProject(projectID) {
  const removeButton = document.querySelector(".del-button");
  removeButton.addEventListener("click", () => {
    projectArray.splice(projectID, 1);
    // change other project's IDs that still exist
    for (let i = 0; i < projectArray.length; i++) {
      projectArray[i].id = i;
    }
    myProjects();
  });
}
// make a function to get and store new taaks

// make a function to display how many days you have
// to complete each task in front of it
// make day counter smart

// make a function to sort tasks based on important tag
// also make a mark for important tag

// make a radio input to mark a task as complete
