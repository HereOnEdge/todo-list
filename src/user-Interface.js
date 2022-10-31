import Project from "./Project.js";

// display projects on main screen
export default (function projectsDisplayer() {
    const projectsSection = document.querySelector("#projects");
    const mainScreen = document.querySelector(".main-screen");
    projectsSection.addEventListener("click", () => {
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
    let newProject = document.createElement("div")
    newProject.classList.add("newProject")
    let projectName = document.createElement("input");
    projectName.type = "text";
    projectName.placeholder = "Add Project";
    projectName.id = "projectName-input"
    newProject.appendChild(projectName);
    mainScreen.appendChild(newProject)
    addSign();
    projectName.addEventListener("click" , projectInfo)
    
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
    const newProject = document.querySelector(".newProject");
    const projectDesc = document.createElement("input")
    projectDesc.type = "text"
    projectDesc.placeholder = "Add Description (Optional)";
    projectDesc.id = "projectDesc-input";
    const projectDate = document.createElement("input");
    projectDate.type = "date";
    projectDate.id = "projectDate-input";
    const projectType = document.createElement("select");
    projectType.name = "type";
    projectType.id = "projectType-input";
    // create an option for each type available
    let types = ["Work" , "Workout", "Educate", "Personal", "Day To Day"];
    for(let i=0; i< types.length; i++ ){
        let option = document.createElement("option");
        option.value = types[i];
        option.textContent = types[i];
        projectType.appendChild(option);
    }
    
    newProject.appendChild(projectDesc);
    newProject.appendChild(projectDate);
    newProject.appendChild(projectType)
    
}
// when plus button is clicked check for required information before adding a new project 
let projectAdder = () => {
    let addSign = document.querySelector(".plusSign");
    // disable the button if project name is empty and focus on name input
    addSign.addEventListener("click", () => {
        let projectName = document.querySelector("#projectName-input");
        if(projectName.value == ""){
            projectName.focus();
            projectInfo();
        }
    })
}
// collapsing window for adding new project

// display collapsing window for each navbar item
export let navbarController = (() => {
    const navigators = document.querySelectorAll(".nav");
    for (let nav of navigators) {
        nav.addEventListener("click", () => {
            nav.classList.toggle("open")
        })
    }
})()