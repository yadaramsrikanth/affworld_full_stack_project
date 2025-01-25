import React, { useState,useEffect } from "react";
import {DragDropContext,Draggable,Droppable} from "react-beautiful-dnd"
import Delete from "../Delete";
import Header from "../Header";
import "./index.css"
const Home=()=>{
    
    const [tasks,setTasks]=useState([])
    console.log(tasks)
    const [taskName,setTaskname]=useState("")
    const [taskdescription,setTaskdescription]=useState("")
    const [error,seterror]=useState("")

    const onhandletask=(id)=>{
        const filteredData=tasks.filter((task)=>task.id!==id)
        setTasks(filteredData)
    }



const getTasks=async()=>{
    const url="https://affworld-backend-1.onrender.com/tasks"
    const response=await fetch(url)
    console.log(response)
    const responseData=await response.json()
    console.log(responseData.tasks)
    setTasks(responseData.tasks)
}

useEffect(()=>{
    getTasks()
},[])

const onClickAddTask=async(event)=>{
    event.preventDefault()
   if(!taskName||!taskdescription){
    seterror("Fields are empty")
   }else{

   
    const details={name:taskName,description:taskdescription}
    const url="https://affworld-backend-1.onrender.com/tasks"
    const options={
        method:"POST",
        headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(details)
}
const response=await fetch(url,options)
console.log(response)
const responsedata=await response.json()
console.log(responsedata)
setTasks((previousTask)=>[...previousTask,responsedata.taskResponse])
setTaskname("")
setTaskdescription("")
seterror("")
}
}

const updateTaskStatus = async (taskid, status) => {
    const url = `https://affworld-backend-1.onrender.com/tasks/${taskid}`;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to update task status");
        }
        const updatedResponse = await response.json();
        console.log(updatedResponse);

        
        setTasks((prevtask) =>
            prevtask.map((eachtaskItem) =>
                eachtaskItem.id === taskid ? { ...eachtaskItem, status: status } : eachtaskItem
            )
        );
    } catch (error) {
        console.error("Error updating task status:", error);
    }
};
const onEnd = (result) => {
    const { destination, source } = result;
  
   
    if (!destination) return;
  
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1); 
    movedTask.status = destination.droppableId; 
    updatedTasks.splice(destination.index, 0, movedTask); 
  
   
    setTasks(updatedTasks);
  
    
    updateTaskStatus(movedTask.id, destination.droppableId);
  };
  





return (<>
<Header />
<form className="task-form-container" onSubmit={onClickAddTask}>
    <input value={taskName} type="text" placeholder="Enter Task Name..." className="task-name" onChange={(e)=>setTaskname(e.target.value)}/>
    <textarea value={taskdescription} className="text-area-element" placeholder="Enter task description...." onChange={(e)=>setTaskdescription(e.target.value)}/>
<button type="submit" className="add-task-button">Add Task</button>
</form>
{error!==""&&<p style={{"color":"red","textAlign":"center"}}>{error}</p>}   

<DragDropContext onDragEnd={onEnd}>
<div className="class-tasks-container">
    {/*Pending Column */}
    <Droppable droppableId="Pending">
        {(provided)=>(
            <div className="task-column"  
            ref={provided.innerRef}
            {...provided.droppableProps}>
                <h2>Pending</h2>
                { tasks.filter((task) => task.status === "Pending").length === 0 ? (
            <p style={{"color":"red","fontSize":"18px","textAlign":"center","marginTop":"10px"}}>No tasks in Pending</p>
          ) :tasks
                .filter((task)=>task.status==="Pending")
                .map((task,index)=>(
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided)=>(
                             <div
                             className="task-card"
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                                <p className="table-cell name">{task.name}</p>
                                <p className="table-cell description">{task.description}</p>
                                <p className="table-cell status">{task.status}</p>
                                <Delete task={task} onhandletask={onhandletask}/>
                             </div>
                                )}
                        </Draggable>
                        ))}
                        
            {provided.placeholder}
            </div>
            )}
    </Droppable>
    {/*Completed Column*/}
    <Droppable droppableId="Completed">
        {(provided)=>(
            <div className="task-column"  
            ref={provided.innerRef}
            {...provided.droppableProps}>
                <h2>Completed</h2>
                {tasks.filter((task) => task.status === "Completed").length === 0 ? (
            <p style={{"color":"red","fontSize":"18px","textAlign":"center","marginTop":"10px"}}>No tasks in Completed</p>
          ) :tasks
                .filter((task)=>(task.status==="Completed"))
                .map((task,index)=>(
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided)=>(
                             <div
                             className="task-card"
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                                <p className="table-cell name">{task.name}</p>
                                <p className="table-cell description">{task.description}</p>
                                <p className="table-cell status completed">{task.status}</p>
                                <Delete task={task} onhandletask={onhandletask}/>
                             </div>
                                )}
                        </Draggable>
                        ))}
                        
            {provided.placeholder}
            </div>
            )}
    </Droppable>
{/*Done Column*/}
<Droppable droppableId="Done">
        {(provided)=>(
            <div className="task-column"  
            ref={provided.innerRef}
            {...provided.droppableProps}>
                <h2>Done</h2>
                {tasks.filter((task) => task.status === "Done").length === 0 ? (
            <p style={{"color":"red","fontSize":"18px","textAlign":"center","marginTop":"10px"}}>No tasks in Done</p>
          ) :tasks
                .filter((task)=>(task.status==="Done"))
                .map((task,index)=>(
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided)=>(
                             <div
                             className="task-card"
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}>
                               <p className="table-cell name">{task.name}</p>
                                <p className="table-cell description">{task.description}</p>
                                <p className="table-cell status done">{task.status}</p>
                                <Delete task={task} onhandletask={onhandletask}/>
                             </div>
                                )}
                        </Draggable>
                        ))}
                        
            {provided.placeholder}
            </div>
            )}
    </Droppable>



</div>

</DragDropContext>




    </>)
}


export default Home