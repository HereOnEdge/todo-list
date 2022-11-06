import { projectArray } from "./Project";

// display collapsing window for each navbar item
export let navbarController = (() => {
    const navigators = document.querySelectorAll(".nav");
    const titles = ["Daily Task", "Projects", "Tags"];
    let i = 0;
    for (let nav of navigators) {
        const navTitle = document.createElement("span");
        navTitle.textContent = titles[i];
        i++;
        navTitle.id = ("title-span");
        nav.appendChild(navTitle);
        navTitle.addEventListener("click", () => {
            nav.classList.toggle("open");
            if (nav.style.height < "20px") {
                nav.style.height = `${((projectArray.length + 1) * 25) + 5}px`
            } else {
                nav.style.height = "25px";
            }
        })

    }
})();

// show each project in navbar under Projects section
export let myProjects = () => {
    if (document.querySelector(".myProject")) {
        document.querySelector(".myProject").remove();
    }
    let pSection = document.querySelector("#projects");
    let ul = document.createElement("ul");
    ul.classList.add("myProject");
    pSection.appendChild(ul);
    for (let i = 0; i < projectArray.length; i++) {
        let project = document.createElement("li");
        project.classList.add("nav-project");
        project.textContent = projectArray[i].name
        ul.appendChild(project);
    }
};
myProjects();