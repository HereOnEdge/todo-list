import { tagsMainContainer } from "./projects-page-ui";

export const tags = [];
function __tag(tagName, tagColor) {
    const name = tagName
    const color = tagColor;
    return {name, color};
}
export let creatTag = (tagName,tagColor) => {
    let newTag = __tag(tagName,tagColor);
    tags.push(newTag);
    return newTag;
}
creatTag("Work", "red")
creatTag("Study", "blue")
creatTag("chores", "green")
export let tagDom =() => {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("tags-mainContainer");
    for(let i =0; i < tags.length;i++){
        const tagContainer = document.createElement("div");
        tagContainer.classList.add("tag-container")
        tagContainer.id = `tag-container-${i}`;
        const tag = document.createElement("span");
        tag.classList.add("tag");
        tag.id = `tag${i}`;
        tag.style.backgroundColor = tags[i].color;
        tagContainer.appendChild(tag);
        const tagName = document.createElement("span");
        tagName.classList.add("tag-name");
        tagName.id = `tag-name${i}`;
        tagName.textContent = tags[i].name;
        tagContainer.appendChild(tagName);
        mainContainer.appendChild(tagContainer);
    }
    return mainContainer;
}

export const chooseTag = () => {
    let mainContainer = tagsMainContainer;
    let tagConts = document.querySelectorAll(".tag-container");
    mainContainer.addEventListener("mouseover", () => {
        let height = tags.length * 16;
        mainContainer.style.height = `${height}px`;
        // mainContainer.style.top = "50%";
        let topPosition = 100 / tags.length;
        for (let i = 0; i < tags.length; i++){
            let tagContainer = document.querySelector(`#tag-container-${i}`);
            setTimeout(() => {
                tagContainer.style.top = `${topPosition * i}%`;
            }, 100);
            mainContainer.addEventListener("mouseleave", () => {
                mainContainer.style.height = "20px";
                // for(let tagCont of tagConts){
                //     tagCont.style.top = "0";
                // }
            })
            tagContainer.addEventListener("mouseover", () => {
                let idArray = tagContainer.id.split("-");
                const id = idArray[2];
                const tagName = document.querySelector(`#tag-name${id}`);
                tagContainer.style.width = "100%";
                tagName.style.display = 'inline-block';
                tagContainer.addEventListener("mouseleave", () => {
                    tagName.style.display = "none";
                    tagContainer.style.width = "20px"
                })
            })
        }
    })
    mainContainer.addEventListener("mouseleave", () => {
        mainContainer.style.height = "20px";
        let tagContainers = document.querySelectorAll(".tag-container");
        for(let tagContainer of tagContainers) {
            tagContainer.style.top = "0";
        }
    })
}