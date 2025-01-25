import React from "react"
import {Navigate} from "react-router-dom"
import Cookies from "js-cookie"


const ProtectedRoute=({ element, ...rest })=>{
const jwtToken=Cookies.get("jwtToken")
if(jwtToken===undefined){
    return <Navigate to="/login"/>
}
return element

}

export default ProtectedRoute