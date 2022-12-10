import { projectArray } from "./Project";

// display collapsing window for each navbar item
export const navbarController = (() => {
  const navigators = document.querySelectorAll(".nav");
  const titles = ["Daily Task", "Projects", "Tags"];
  let i = 0;
  for (const nav of navigators) {
    const navTitle = document.createElement("span");
    navTitle.textContent = titles[i];
    i++;
    navTitle.id = "title-span";
    nav.appendChild(navTitle);
    navTitle.addEventListener("click", () => {
      nav.classList.toggle("open");
      if (nav.style.height < "20px") {
        nav.style.height = `${(projectArray.length + 1) * 25 + 5}px`;
      } else {
        nav.style.height = "25px";
      }
    });
  }
})();

// show each project in navbar under Projects section
export const myProjects = () => {
  if (document.querySelector(".myProject")) {
    document.querySelector(".myProject").remove();
  }
  const pSection = document.querySelector("#projects");
  const ul = document.createElement("ul");
  ul.classList.add("myProject");
  pSection.appendChild(ul);
  for (let i = 0; i < projectArray.length; i++) {
    const project = document.createElement("li");
    project.classList.add("nav-project");
    project.textContent = projectArray[i].name;
    ul.appendChild(project);
  }
};
myProjects();
