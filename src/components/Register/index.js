import React,{useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import "./index.css"

const Register =()=>{
    const navigate =useNavigate()
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [errorMsg,seterrorMsg]=useState("")
    const [email,setEmail]=useState("")

const registerusername=event=>{
    setUsername(event.target.value)
}
const registeruserpassword=event=>{
setPassword(event.target.value)
}

const registeruserEmail=(event)=>{
    setEmail(event.target.value)
}



const onSubmitSuccess=()=>{
  
   navigate("/login")
   console.log("success")
}

const onClickregister=async (event)=>{
        event.preventDefault()
       
        const userdetails={name:username,email:email,password:password}
        const url="https://affworld-backend-1.onrender.com/register"
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
        if (response.ok){
            onSubmitSuccess()
        }else{
            seterrorMsg(data.user)
        }
        
       
        
        
        setUsername("")
        setPassword("")
        setEmail("")
    }

    
        
        return <div className="register-container">
            <form className="form-container" onSubmit={onClickregister}>
            <h1 className="create-account">CREATE ACCOUNT</h1>
            <label>Username</label>
            <input value={username} type="text" placeholder="Enter Your Username..." required onChange={registerusername}/>
            <label>Email</label>
            <input value={email} type="email" placeholder="Enter Your Email.." required onChange={registeruserEmail}/>
            
            <label>Password</label>
            <input value={password} type="password" placeholder="Enter Your Password...." required onChange={registeruserpassword}/>
            <button type="submit" className="register-submit-button">Register</button>
            {errorMsg!==""&&<p className="error-message">{errorMsg}</p>}
           <p className="msg-para">Already have an account? <Link className="login-link" to="/login">Login</Link></p>
            </form>
            
            
        </div>


        
    }


export default Register