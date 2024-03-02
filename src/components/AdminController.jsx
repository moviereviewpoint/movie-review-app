import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminController() {
    const navigator = useNavigate()
  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column" , justifyContent: "space-around", height: "60vh"}}>
        <h1 style={{margin: "30px"}}> AdminController </h1>
            
        <Link to="/">Go to Home</Link>
        <Link to="/:delete" >Delee posts</Link>
        <Link to="/movieform" > Upload Posts</Link>
    </div>
  )
}

export default AdminController