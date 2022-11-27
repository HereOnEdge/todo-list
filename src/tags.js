const tags = [];
let tag = (tagName, tagColor) => {
    const name = tagName
    const color = tagColor;
    return {name, color};
}
tags.push(tag("Work", "red"))
tags.push(tag("Study", "blue"))
tags.push(tag("chores", "green"))
export let tagDom =() => {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("tags-mainContainer");
    for(let i =0; i < tags.length;i++){
        const tagContainer = document.createElement("div");
        tagContainer.classList.add("tag-container")
        tagContainer.id = `tag-container${i}`;
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
    let mainContainer = document.querySelector(".tags-mainContainer");
    mainContainer.addEventListener("mouseover", () => {
        let height = tags.length * 16;
        mainContainer.style.height = `${height}px`;
        let topPosition = 100 / tags.length;
        for (let i = 0; i < tags.length; i++){
            let tagContainer = document.querySelector(`#tag-container${i}`);
            setTimeout(() => {
                tagContainer.style.top = `${topPosition * i}%`;
            }, 100);
            mainContainer.addEventListener("mouseleave", () => {
                mainContainer.style.height = "20px";
                tagContainer.style.top = "0";
            })
            tagContainer.addEventListener("mouseover", () => {
                let idArray = tagContainer.id.split("tag-container");
                const id = idArray[1];
                const tagName = document.querySelector(`#tag-name${id}`);
                tagName.style.display = 'inline-block';
                tagContainer.addEventListener("mouseleave", () => {
                    tagName.style.display = "none";
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