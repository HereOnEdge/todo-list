// create a default(factory function) for any project you want to add later
export default function Project(projectName , projectDescription, projectType){
    const name= projectName
    const description = projectDescription;
    const tag = projectType
    const addTask = (taskName, taskDate, taskImportant) => {
        const name = taskName;
        const date = taskDate;
        const important = taskImportant;
        const complete = false;
        return {name,date,important,complete}
    }
    const tasks = [];
    const complete = false;

    return {name , description , tag, tasks, complete, addTask}
}
// make a list to store each project in it
export const projectArray = []
const project1 = Project("todo-list", "make a web application for managing your todo's and projects","Work");
let project1Task = project1.addTask("new",'',true);
project1.tasks.push(project1Task);
const project2 = Project("Advanced JavaScript", "Read all the Advanced topics in Odin Project", "educate");
projectArray.push(project1,project2);