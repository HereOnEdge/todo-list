// create a default(factory function) for any project you want to add later
export default function Project(name , description , dueDate, type){
    let projectName = name
    let projectDescription = description;
    let projectDueDate = dueDate;
    let projectType = type

    return {projectName , projectDescription , projectDueDate , projectType}
}
// make a list to store each project in it
export const projectArray = []
const project1 = Project("todo-list", "make a web application for managing your todo's and projects",
'',"Work");
const project2 = Project("Advanced JavaScript", "Read all the Advanced topics in Odin Project",
"1 month", "educate");
projectArray.push(project1,project2);