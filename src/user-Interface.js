import Project from "./Project.js";

// display projects on main screen
export default (function projectsDisplayer(){
    let projects = document.querySelector("#projects");
    console.log(projects)
    let mainScreen = document.querySelector(".main-screen");
    projects.addEventListener("click" , ()=> {
        mainScreen.innerHTML = "";
        console.log("clears main screen")
        let title = document.createElement("h2");
        title.textContent = "Projects";
        mainScreen.appendChild(title);
    })
})()

// display collapsing window for each navbar item
export let navbarController = (() => {
    let navigators = document.querySelectorAll(".nav");
    for(let nav of navigators){
        nav.addEventListener("click" , () => {
            nav.classList.toggle("open")
        })
    }
})()