import React,{useState} from "react"
import {Link} from "react-router-dom"

import "./index.css"

const ForgotPassword=()=>{
   
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [Errormsg,seterrorMsg]=useState("")
    const [successmsg,setSuccessMsg]=useState("")

const Loginwithuseremail=event=>{
    setEmail(event.target.value)
}
const loginwithuserpassword=event=>{
    setPassword(event.target.value)
}
const onSubmitLoginSuccess=(msg)=>{
    
        setSuccessMsg(msg)
}

const onsubmitFailure=Errormsg=>{
    seterrorMsg(Errormsg)
}


const     onClickLogin=async (event)=>{
        event.preventDefault()
        
        const userdetails={email:email,password:password}
        const url="https://affworld-backend-1.onrender.com/forgotpassword"
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
            
            onSubmitLoginSuccess(data.user)
            seterrorMsg("")
        }else{
            onsubmitFailure(data.user)
        }
        
       
        setEmail("")
        setPassword("")
    }

    
        
        return <div className="register-container">
            <form className="form-container" onSubmit={onClickLogin}>
            <h1 className="create-account">Forgot Your Password</h1>
            <label>Email</label>
            <input value={email} type="email" required placeholder="Enter Email..." onChange={Loginwithuseremail}/>
            <label>Enter New Password</label>
            <input value={password} required type="password" placeholder="Enter Password..." onChange={loginwithuserpassword}/>
           
            <button type="submit" className="register-submit-button">Reset Password</button>
            {Errormsg!=="" &&<p className="error-message">{Errormsg}</p>}
            {successmsg!==""&&<p className="error-message">{successmsg}</p>}
           <p className="msg-para">{`<`} <Link className="login-link" to="/login">Back to login</Link></p>
            </form>
            
            
        </div>


        
    }


export default ForgotPassword