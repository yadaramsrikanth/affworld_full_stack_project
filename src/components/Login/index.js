import React,{useState} from "react"
import { useNavigate,Navigate,Link } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Login=()=>{
   const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [Errormsg,seterrorMsg]=useState("")

    const jwtToken=Cookies.get("jwtToken")

const Loginwithuseremail=event=>{
    setEmail(event.target.value)
}
const loginwithuserpassword=event=>{
    setPassword(event.target.value)
}
const onSubmitLoginSuccess=(jwtToken)=>{
    Cookies.set("jwtToken",jwtToken,{expires:30})
        //const {history}=this.props
        //history.replace("/todos")  
        console.log(jwtToken)
        console.log("success login") 
        navigate("/") 
}

const onsubmitFailure=Errormsg=>{
    seterrorMsg(Errormsg)
}


const     onClickLogin=async (event)=>{
        event.preventDefault()
        
        const userdetails={email:email,password:password}
        const url="https://affworld-backend-1.onrender.com/login"
        const options={
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(userdetails)
        }
        
        const response=await fetch(url,options)
        console.log(response)
        const data=await response.json()
        console.log(data)
        if(response.ok){
            
            onSubmitLoginSuccess(data.jwtToken)
        }else{
            onsubmitFailure(data.User)
        }
        
       
        setEmail("")
        setPassword("")
    }

    if(jwtToken!==undefined){
        return <Navigate to="/"/>
    } 
    
        
        return (
            
            <div className="register-container">
            <form className="form-container" onSubmit={onClickLogin}>
            <h1 className="create-account">LOGIN TO YOURACCOUNT</h1>
            <label>Email</label>
            <input value={email} type="email" required placeholder="Enter Email..." onChange={Loginwithuseremail}/>
            <label>Password</label>
            <input value={password} required type="password" placeholder="Enter Password..." onChange={loginwithuserpassword}/>
            <p className="msg-para"><Link  className="login-link" to="/forgotpassword">Forgot Password</Link></p>
            <button type="submit" className="register-submit-button">Login</button>
            {Errormsg!=="" &&<p className="error-message">{Errormsg}</p>}
           <p className="msg-para">Don't have an account? <Link className="login-link" to="/register">Register</Link></p>
            </form>
            
            
        </div>


        
    )}


export default Login