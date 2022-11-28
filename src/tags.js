
export const tags = [];
function __tag(tagName, tagColor) {
    const name = tagName
    const color = tagColor;
    return { name, color };
}
export let creatTag = (tagName, tagColor) => {
    let newTag = __tag(tagName, tagColor);
    tags.push(newTag);
    return newTag;
}
creatTag("Work", "red")
creatTag("Study", "blue")
creatTag("chores", "green")
export let tagHub = () => {
    // make a Node for a specific Tag
    const showTag = (tagName, projectID, haveHover)=> {
        for (let i = 0; tags.length; i++) {
            if (tags[i].name === tagName) {
                const tag = document.createElement("span");
                tag.classList.add("tag");
                tag.id = `tag-${i}-project-${projectID}`;
                tag.style.backgroundColor = tags[i].color;
                if (haveHover === true) {
                    __enableHover(tag, tagName);
                }
                return tag;
            }
        }
    };
    const addFullContainer = (projectID) => {
        const mainContainer = document.createElement("div");
        mainContainer.classList.add("tags-mainContainer");
        mainContainer.id = `tags-mainContainer-${projectID}`;
        for (let i = 0; i < tags.length; i++) {
            let tag = showTag(tags[i].name, projectID, false);
            const tagContainer = document.createElement("div");
            tagContainer.classList.add("tag-container")
            tagContainer.id = `tag-container-${i}-project-${projectID}`;
            tagContainer.appendChild(tag);
            const tagName = document.createElement("span");
            tagName.classList.add("tag-name");
            tagName.id = `tagName-${i}-project${projectID}`;
            tagName.textContent = tags[i].name;
            tagContainer.appendChild(tagName);
            mainContainer.appendChild(tagContainer);
        }
        return mainContainer;
    }
    // make a specific Tag to show it's name when it's hovered
    function __enableHover(Node, tagName) {
        let tag = Node;
        tag.addEventListener("mouseover", () => {
            tag.width = "60px";
            tag.textContent = tagName;
        });
        tag.addEventListener("mouseleave", () => {
            tag.width = "20px";
            tag.textContent = "";
        })
    };
    
    // make a function to show all the tags that you can pick from
    function showTagOptions(projectID) {
        let mainContainer = document.querySelector(`#tags-mainContainer-${projectID}`);
        mainContainer.addEventListener("mouseover", () => {
            let height = tags.length * 20 + 10;
            mainContainer.style.height = `${height}px`;
            let topPosition = 100 / tags.length + 5;
            for (let i = 0; i < tags.length; i++) {
                let tagContainer = document.querySelector(`#tag-container-${i}-project-${projectID}`);
                setTimeout(() => {
                    tagContainer.style.top = `${topPosition * i}%`;
                    console.log("changed position")
                }, 100);
                tagContainer.addEventListener("mouseover", () => {
                    let idArray = tagContainer.id.split("-");
                    const id = idArray[2];
                    let tagName = document.querySelector(`#tagName-${id}-project${projectID}`);
                    let tagNameStyles = getComputedStyle(tagName);
                    tagName.style.color = tags[id].color;
                    let width = tagNameStyles.width.split("px");
                    tagContainer.style.width = `${+width[0] + 60}px`;
                    tagName.style.display = "inline-block";
                    // go back to normal when mouse in not hovering the tag 
                    tagContainer.addEventListener("mouseleave", () => {
                        tagName.style.display = "none";
                        tagContainer.style.width = "20px";
                    })
                })
    
            }
        })
        mainContainer.addEventListener("mouseleave", () => {
            mainContainer.style.height = "20px";
            for (let i = 0; i < tags.length; i++) {
                let tagContainer = document.querySelector(`#tag-container-${i}-project-${projectID}`);
                console.log("position restored");
                tagContainer.style.top = "0";
            }
        })
    };
    return {showTag,addFullContainer, showTagOptions}
}
