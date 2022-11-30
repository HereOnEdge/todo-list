
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
export let choosedTag;

export let tagHub = () => {
    // make a Node for a specific Tag
    const showTag = (tagName, projectID, haveHover) => {
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
    const addFullContainer = (projectID, parentNode) => {
        const mainContainer = document.createElement("div");
        mainContainer.classList.add("tags-mainContainer");
        mainContainer.id = `tags-mainContainer-${projectID}`;
        parentNode.appendChild(mainContainer);
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
            // make Tags Container hoverable
            mainContainer.addEventListener("mouseenter", () => {
                showTagOptions(projectID)
            })
            // make a preferred Tag when user clicks on one
            tagContainer.addEventListener("click", () => {
                choosedTag = __chooseTag(i, projectID);
                let choosedTagName = choosedTag.active;
                choosedTag = choosedTagName;
            })
        }
        return { mainContainer };
    }
    // make a specific Tag to show it's name when it's hovered
    function __enableHover(Node, tagName) {
        let tag = Node;
        tag.addEventListener("mouseenter", () => {
            tag.style.width = "60px";
            tag.style.borderRadius = "20px"
            tag.textContent = tagName;
        });
        tag.addEventListener("mouseleave", () => {
            tag.style.width = "20px";
            tag.style.borderRadius = "50%"
            tag.textContent = "";
        })
    };

    // make a function to show all the tags that you can pick from
    function showTagOptions(projectID) {
        let mainContainer = document.querySelector(`#tags-mainContainer-${projectID}`);
        let height = tags.length * 20 + 10;
        mainContainer.style.height = `${height}px`;
        let topPosition = 100 / tags.length;
        for (let i = 0; i < tags.length; i++) {
            let tagContainer = document.querySelector(`#tag-container-${i}-project-${projectID}`);
            setTimeout(() => {
                tagContainer.style.top = `${topPosition * i}%`;
            }, 200);
            tagContainer.addEventListener("mouseenter", () => {
                setTimeout(() => {
                    let idArray = tagContainer.id.split("-");
                    const id = idArray[2];
                    let tagName = document.querySelector(`#tagName-${id}-project${projectID}`);
                    let tagNameStyles = getComputedStyle(tagName);
                    tagName.style.color = tags[id].color;
                    let width = tagNameStyles.width.split("px");
                    tagContainer.style.width = `${+width[0] + 60}px`;
                    tagName.style.display = "inline-block";
                }, 100);
            })
            // go back to normal when mouse in not hovering the tag 
            tagContainer.addEventListener("mouseleave", (tagEvent) => {
                tagContainer.style.width = "20px";
                setTimeout(() => {
                    let idArray = tagContainer.id.split("-");
                    const id = idArray[2];
                    let tagName = document.querySelector(`#tagName-${id}-project${projectID}`);
                    tagName.style.display = "none";
                }, 500);
            })
        }
        mainContainer.addEventListener("mouseleave", (event) => {
            mainContainer.style.height = "20px";
            for (let i = 0; i < tags.length; i++) {
                setTimeout(() => {
                    let tagContainer = document.querySelector(`#tag-container-${i}-project-${projectID}`);
                    tagContainer.style.top = "0";
                }, 200)
            }
        })
    };
    return { showTag, addFullContainer, showTagOptions }
}
// make tags clickable so that on click they be the Tassk's Tag.
function __chooseTag(index, projectID) {
    let tagContainer = document.querySelector(`#tag-container-${index}-project-${projectID}`);
    const tag = document.querySelector(`#tag-${index}-project-${projectID}`);
    const tagObject = tags[index];
    tagContainer.classList.toggle('active');
    if (tagContainer.classList.contains("active")) {
        // add a tick inside tag
        let tick = document.createElement("div");
        tick.classList.add("yes");
        tick.classList.add("tick");
        tag.appendChild(tick)
        tag.style.zIndex = "1";
        return { active: tagObject.name };
    } else {
        tag.style.zIndex = "-1";
        tag.removeChild(tag.firstChild);
        return { active: '' };
    }
}
