// create a default(factory function) for any project you want to add later
export default function Project(projectName , projectDescription, projectType){
    let name= projectName
    let description = projectDescription;
    let type = projectType

    return {name , description , type}
}
// make a list to store each project in it
export const projectArray = []
const project1 = Project("todo-list", "make a web application for managing your todo's and projects","Work");
const project2 = Project("Advanced JavaScript", "Read all the Advanced topics in Odin Project", "educate");
projectArray.push(project1,project2);