import Project from "./Project.js";
import { projectArray } from "./Project.js";
import { myProjects as navProjects } from "./navbar-ui.js";
import doneImgUrl from "./img/checklist.png";
import editImgUrl from "./img/edit-icon.png";
import removeImgUrl from "./img/remove-icon.png";
import infoImgUrl from "./img/info-icon.png";

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
        console.log("clears main screen")
        const title = document.createElement("h2");
        title.textContent = "Title here";
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
        newProject = document.createElement("div");
        newProject.classList.add("newProject");
        topScreen.appendChild(newProject);
    }
    let projectName = document.createElement("input");
    projectName.type = "text";
    projectName.placeholder = "Add Project";
    projectName.id = "projectName-input"
    newProject.appendChild(projectName);
    addSign();
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
        const projectType = document.createElement("select");
        projectType.name = "type";
        projectType.id = "projectType-input";
        // create an option for each type available
        let types = ["Work", "Workout", "Educate", "Personal", "Day To Day"];
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Project Type"
        defaultOption.setAttribute("disabled", '');
        defaultOption.setAttribute("selected", '');
        projectType.appendChild(defaultOption);
        for (let i = 0; i < types.length; i++) {
            let option = document.createElement("option");
            option.value = types[i];
            option.textContent = types[i];
            projectType.appendChild(option);
        }
        newProject.style.height = "105px";
        newProject.appendChild(projectDesc);
        newProject.appendChild(projectType);
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
            let projectType = document.querySelector("#projectType-input")
            let plusSign = document.querySelector(".plusSign");
            // let typeValue = projectType.options[projectType.selectedIndex].value;
            let project = Project(projectName.value, projectDesc.value, projectType.value);
            projectArray.push(project)
            closeInfo();
            projectName.value = "";
            projectDesc.value = "";
            projectType.value = "";
            // projectName.addEventListener("click", () => {
            //     let newProject = document.querySelector(".newProject");
            //     newProject.style.height = "105px";
            // });
            projectName.remove();
            projectDesc.remove();
            projectType.remove();
            plusSign.remove();
            addProject();
            myProjects();
            navProjects();
            console.log(projectArray)
        }
    })
}

// close add project collapsing window
function closeInfo() {
    let newProject = document.querySelector(".newProject");
    newProject.style.height = "35px"
    console.log("height changed")
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
    let title = document.createElement("h3");
    title.classList.add("bottom-title");
    title.textContent = "title here";
    projectsSection.appendChild(ul);
    bottomScreen.appendChild(title);
    bottomScreen.appendChild(projectsSection);
    for (let i = 0; i < projectArray.length; i++) {
        let projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        let project = document.createElement("li");
        project.classList.add("project")
        projectContainer.appendChild(project)
        let editSpan = document.createElement("span");
        editSpan.classList.add("edit-span");
        let dots = document.createElement("span")
        dots.classList.add("dots");
        dots.textContent = "..."
        editSpan.appendChild(dots);
        projectContainer.appendChild(editSpan);
        ul.appendChild(projectContainer);
    }
    detailShower();
    editDots();
}
// open each project info on click
let detailShower = () => {
    let projects = document.querySelectorAll(".project");
    let i = 0;
    for (let project of projects) {
        const spanTitle = document.createElement("span");
        spanTitle.classList.add("pp-spanTitle")
        project.appendChild(spanTitle);
        spanTitle.textContent = `${projectArray[i].name}`
        i++;
        spanTitle.addEventListener("click", () => {
            project.classList.toggle("open")
        })
    }
}
// make each 3dot edit button functional
let editDots = () => {
    let container = document.querySelector(".Projects-ul");
    let dotsButtons = document.querySelectorAll(".edit-span");
    for (let i = 0; i < dotsButtons.length; i++) {
        dotsButtons[i].addEventListener("click", () => {
            if(document.querySelector(`#layout${i}`)){
                document.querySelector(`#layout${i}`).remove();
                return;
            };
            if(document.querySelector(".layout-container")) {
                document.querySelector(".layout-container").remove();
            }; 
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