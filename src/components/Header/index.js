import React from "react"
import {Link,useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Header=()=>{
    const navigate=useNavigate()
    const onClicktoLogout=()=>{
        Cookies.remove("jwtToken")
        navigate('/login')
    }

    return <nav className="nav-bar">
        <Link to="/" className="link-element">
        <h1 className="logo-heading">AFFWORLD</h1></Link>
        <div className="list-items-container">
         <Link className="link-element" to="/">  <li className="list-item">HOME</li></Link> 
         <Link className="link-element" to="/feed">    <li className="list-item">PHOTOS</li></Link> 
        </div>
        <button className="logout-button" onClick={onClicktoLogout}>LOGOUT</button>
    </nav>
}
export default Header
