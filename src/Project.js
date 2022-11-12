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
let project1Task2 = project1.addTask("a serious task", '',false)
project1.tasks.push(project1Task);
project1.tasks.push(project1Task2)
const project2 = Project("Advanced JavaScript", "Read all the Advanced topics in Odin Project", "educate");
let project2Task = project2.addTask("real task", '',true)
project2.tasks.push(project2Task);
projectArray.push(project1,project2);