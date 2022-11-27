import { tags } from "./tags";

export const Task = (taskName, taskDate, taskTime,taskTag, taskImportant) => {
    const name = taskName;
    const date = taskDate;
    const time = taskTime;
    const tag = () => {
        for(let i =0; i < tags.length; i++){
            if(tags[i].name === taskTag){
                let myTag = tags[i];
                return myTag.name;
            }
        }
    }
    
    const important = taskImportant;
    const complete = false;
    return {name,date,time,tag,important,complete}
}
