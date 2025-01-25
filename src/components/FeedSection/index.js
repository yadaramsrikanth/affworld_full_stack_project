import React,{useState,useEffect} from "react"
import Header from "../Header"
import "./index.css"

const FeedSection=()=>{
        const [posts,setPosts]=useState([])
        const [caption,setCaption]=useState("")
        const [file,setFile]=useState(null)
        const [error,seterror]=useState("")

 const getPosts=async()=>{
    const url="https://affworld-backend-1.onrender.com/posts"
    const response=await fetch(url)
    console.log(response)
    const responsedata=await response.json()
    console.log(responsedata)
    setPosts(responsedata.posts)
 }   

    useEffect(()=>{
        getPosts()
    },[])

    const onChangeCaption=(event)=>{
        setCaption(event.target.value)
    }

    const onchangeFile=(event)=>{
        setFile(event.target.files[0])
    }


    


    const onaddPost=async(event)=>{
        event.preventDefault()
        if(!caption||!file){
            seterror("Fields are empty")
        }else{
        const formData=new FormData()
        formData.append("caption",caption)
        formData.append("file",file)
        const url="https://affworld-backend-1.onrender.com/posts"
        const options={
            method:"POST",
            body:formData
        }
        const response=await fetch(url,options)
        console.log(response)
        const data=await response.json()
        console.log(data)
        setPosts((previousPosts)=>[...previousPosts,data.uploadedItem])
        setCaption("")
        setFile(null)
        seterror("")
    }
    }
    return <>
    <Header/>
    <div className="feed-section-container">Captured Moments</div>
    <form className="posts-form-container" onSubmit={onaddPost}>
        <input name="file" type="file" className="input-element" onChange={onchangeFile}/>
        <textarea value={caption} onChange={onChangeCaption} width="300" placeholder="Enter a caption..." className="text-area-element"></textarea>
        <button type="submit" className="add-post-button">ADD POST</button>
    </form>
    {error!==""&&<p style={{"color":"red","textAlign":"center"}}>{error}</p>}   
    <ul className="unordered-posts-container">
        {posts.map((eachPost)=>{
            console.log(eachPost.photo_url)
            return <li key={eachPost.id} className="posts-list-item">
                
                <img src={eachPost.photo_url} alt={eachPost.caption}/>
                <div className="caption-date-container">
                <p className="caption">{eachPost.caption}</p>
                <p className="date">{new Date(eachPost.created_at).toLocaleDateString()}</p>
                </div>
                
            </li>
        })}
    </ul>
    </> 
}
export default FeedSection