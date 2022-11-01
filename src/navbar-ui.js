import { projectArray } from "./Project";

// display collapsing window for each navbar item
export let navbarController = (() => {
    const navigators = document.querySelectorAll(".nav");
    let projects = document.querySelectorAll(".project");
    for (let nav of navigators) {
        nav.addEventListener("click", () => {
            nav.classList.toggle("open");
            if(nav.style.height < "20px") {
                nav.style.height = `${(projectArray.length + 1) * 19}px`
            } else {
                nav.style.height = "19px";
            }
        })
    }
})();

// show each project in navbar under Projects section
export let myProjects = () => {
    if(document.querySelector(".myProject")){
        document.querySelector(".myProject").remove();
    }
    let pSection = document.querySelector("#projects");
    let ul = document.createElement("ul");
    ul.classList.add("myProject");
    pSection.appendChild(ul);
    for(let i=0; i < projectArray.length; i++){
        let project = document.createElement("li");
        project.classList.add("project");
        project.textContent = projectArray[i].name
        ul.appendChild(project);
    }
};
myProjects();