import React from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from "./components/Register/index.js"
import Login from "./components/Login/index.js"
import ForgotPassword from "./components/ForgotPassword/index.js"
import FeedSection from "./components/FeedSection/index.js"
import Home from "./components/Home/index.js"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/NotFound/index.js"

import "./App.css"
const App=()=> {
return <BrowserRouter>
<Routes>
<Route
          path="/register"
          element={<Register />} 
        />
        <Route
          path="/login"
          element= {<Login />} 
        />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword />} 
        />
        <Route
          path="/feed"
          element={<ProtectedRoute element={<FeedSection />} />}
        />
        <Route
          path="/"
          element={<ProtectedRoute element={<Home />} />}
        />
   <Route path="*" element={<NotFound/>}/>
   
</Routes>
</BrowserRouter>
}


export default App