import Project from "./Project.js";
import { projectArray } from "./Project.js";

// display projects on main screen
export default (function projectsDisplayer() {
    const projectsSection = document.querySelector("#projects");
    const mainScreen = document.querySelector(".main-screen");
    projectsSection.addEventListener("click", () => {
        if (document.querySelector("#projectName-input")) {
            return;
        }
        mainScreen.innerHTML = "";
        console.log("clears main screen")
        const title = document.createElement("h2");
        title.textContent = "Projects";
        mainScreen.appendChild(title);
        addProject();

    })
})()
// new project section
let addProject = () => {
    const mainScreen = document.querySelector(".main-screen");
    let newProject = undefined ;
    if(document.querySelector(".newProject")){
        newProject = document.querySelector(".newProject")
    } else {
        newProject = document.createElement("div");
        newProject.classList.add("newProject");
        mainScreen.appendChild(newProject);
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
            console.log(projectArray)
        }
    })
}
// display collapsing window for each navbar item
export let navbarController = (() => {
    const navigators = document.querySelectorAll(".nav");
    for (let nav of navigators) {
        nav.addEventListener("click", () => {
            nav.classList.toggle("open")
        })
    }
})()

// close add project collapsing window
function closeInfo() {
    let newProject = document.querySelector(".newProject");
    newProject.style.height = "35px"
    console.log("height changed")
}