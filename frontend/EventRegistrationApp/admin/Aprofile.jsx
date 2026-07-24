import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Aprofile.css'
import porfile from '../src/assets/login.png'
import Profile from '../student/Profile';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCircle2,
  LogOut
} from "lucide-react";
const Aprofile = () => {
    const navigate = useNavigate();
    function nav(route){
        navigate(route);
    }
    const [user,setUser] = useState([]);
    function getCredential(){
        try{
            const users = JSON.parse(localStorage.getItem('user'));
            console.log(users)
            setUser(users);
            console.log(user)
        }
        catch(err){
            alert(err.message);
        }
    }
    useEffect(()=>getCredential(),[])
  return (
    <div className="profilebox">
      <div className="profilenavbar">
        <div className="same">
          <UserCircle2 size={50} />
          <h1>Profile</h1>
        </div>
        <div className="profileinfo">
          <UserCircle2 size={44} />
          <p>{user?.username}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="profilecontents">
        <div className="profilesidebar">
          <div onClick={()=>nav('/overview')}>
            <LayoutDashboard size={22} />
            <p>Overview</p>
          </div>
          <div onClick={()=>nav('/events')}>
            <CalendarDays size={22} />
            <p>Events</p>
          </div>
          <div onClick={()=>nav('/users')}>
            <Users size={22} />
            <p>Users</p>
          </div>
          <div onClick={()=>nav('/AProfile')}>
            <UserCircle2 size={22} />
            <p>Profile</p>
          </div>
          <div onClick={()=>{
            localStorage.clear();
            navigate('/')
          }}>
            <LogOut size={22} />
            <p>Logout</p>
          </div>
        </div>
        <div className="profilemain">
            <div className="namee">
                <p>Name : </p>
                <p>{user.username}</p>
            </div>
            <div className="email">
                <p>Email : </p>
                <p>{user.email}</p>
            </div>
            <div className="email">
                <p>Role : </p>
                <p>{user.role}</p>
            </div>
            <div className="email">
                <p>Event Created : </p>
                <p>{user.email}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Aprofile;
