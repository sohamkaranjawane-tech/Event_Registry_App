import React from 'react'
import "./Home.css"
import img from '../src/assets/vite.svg'
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <div className="student">
        <img src={img} alt="student" onClick={()=>{
            navigate('/signup',{
                state:{
                    role:"student"
                }
            })
        }}/>
        <h1>Student</h1>
      </div>
      <div className="admin">
        <img src={img} alt="admin" onClick={()=>{
            navigate('/signup',{
                state:{
                    role:"admin"
                }
            })
        }}/>
        <h1>Admin</h1>
      </div>
    </div>
  )
}

export default Home
