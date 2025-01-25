import React from "react" 
import {useNavigate} from "react-router-dom"
import "./index.css"

const NotFound=()=>{
    const navigate=useNavigate()

    const onclicktoHome=()=>{
        navigate("/")
    }

    return (<div className="notfoundcontainer">
    <div className="not-found-container">
        <h1 className="not-found">404 Not Found</h1>
        <button onClick={onclicktoHome} className="not-found-button">Home</button>
    </div>
    </div>
)}
export default NotFound