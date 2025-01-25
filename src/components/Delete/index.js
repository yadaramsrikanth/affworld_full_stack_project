import { MdDelete } from "react-icons/md";
import "./index.css"

const Delete=(props)=>{
    const {task,onhandletask}=props
    const {id}=task

    const onClickDelete=async()=>{
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed){
            const url=`https://affworld-backend-1.onrender.com/tasks/${id}`
        const options={method:"DELETE"}
        const response=await fetch(url,options)
        console.log(response)
        onhandletask(id)
        }
        
        
    


    }

    return <button className="delete-button" onClick={onClickDelete}><MdDelete size={25}/></button>
}

export default Delete