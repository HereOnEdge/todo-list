import { importantButton } from "./projects-page-ui";
import { displayObject } from "./projects-page-ui";

// add a function to Task that marks a task's DOM and the task's object as complete
export function CompleteTask(taskNode, Task) {
    taskNode.addEventListener("click", () => {
        taskNode.classList.add("active");
        setTimeout(() => {
            Task.isComplete = true;
            displayObject.none();
            displayObject.all();
            importantButton();
            console.log("I DID WORK")
        }, 1000);
    })
}