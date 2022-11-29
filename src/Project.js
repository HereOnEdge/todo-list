import { tags } from "./tags";
import { Task } from "./task";

// create a default(factory function) for any project you want to add later
export default function Project(projectName ,projectID, projectDescription){
    const name= projectName
    let id = projectID;
    const description = projectDescription;
    const addTask = (taskName, taskDate, taskTime,taskTag, taskImportant) => {
        let newTask = Task(taskName, taskDate, taskTime,taskTag, taskImportant);
        tasks.push(newTask);
    }
    const tasks = [];
    const complete = false;

    return {name , description , tasks, complete, addTask, id}
}
// make a list to store each project in it
export const projectArray = []
const project1 = Project("todo-list", 0, "make a web application for managing your todo's and projects","Work");
project1.addTask("new",'','','Study',true);
project1.addTask("a serious task", '', '','Work',false)
const project2 = Project("Advanced JavaScript", 1, "Read all the Advanced topics in Odin Project", "educate");
project2.addTask("real task", '','','Work',true)
projectArray.push(project1,project2);