import { importantButton , displayObject } from "./projects-page-ui";

// add a function to Task that marks a task's DOM and the task's object as complete
export function CompleteTask(taskNode, Task) {
  taskNode.addEventListener("click", () => {
    const nodeChild = taskNode.firstChild;
    const tick = document.createElement("div");
    tick.classList.add("yes");
    tick.classList.add("completeTick");
    nodeChild.appendChild(tick);
    taskNode.classList.add("active");
    setTimeout(() => {
      tick.classList.add("done");
      setTimeout(() => {
        Task.isComplete = true;
        displayObject.none();
        displayObject.all();
        importantButton();
        console.log("I DID WORK");
      }, 600);
    }, 1000);
  });
}
