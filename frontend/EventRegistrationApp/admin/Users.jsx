import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Users.css';
import {
  LayoutDashboard,
  CalendarDays,
  Users as UsersIcon,
  UserCircle2,
  LogOut
} from "lucide-react";
const Users = () => {
    const navigate = useNavigate();
    const [name , setName] = useState(null);
    const [totalUser , setTotalUser] = useState([])
    const [search , setSearch] = useState('');
    const [filter , setFilter] = useState([]);
    function nav(route){
        navigate(route);
    }
    function handleSearch(e){
        const value = e.target.value;
        setSearch(value);

        const filtered = totalUser.filter((user)=>{
            return user.username.toLowerCase().includes(value.toLocaleLowerCase());
        })
        setFilter(filtered)
    }
    useEffect(()=>{
        async function getApi(){
        try{
            const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate("/login");
          return;
        }
        console.log("User: ",user);
        setName(user);

        const response = await fetch("http://feisty-upliftment-production-6040.up.railway.app/authRoute/getAllUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setTotalUser(data);
        setFilter(data);
        }
        catch(err){
            alert(err.message);
        }
    }
    getApi();
    },[]);
  return (
    <div className="userbox">
      <div className="usernavbar">
        <div className="same">
        <UsersIcon size={50} />
        <h1>Users</h1>
        </div>
        <div className="userinfo">
          <UserCircle2 size={44} />
          <p>{name?.username}</p>
          <p>{name?.email}</p>
        </div>
      </div>
      <div className="usercontents">
        <div className="usersidebar">
          <div onClick={()=>nav('/overview')}>
            <LayoutDashboard size={22} />
            <p>Overview</p>
          </div>
          <div onClick={()=>nav('/events')}>
            <CalendarDays size={22} />
            <p>Events</p>
          </div>
          <div onClick={()=>nav('/users')}>
            <UsersIcon size={22} />
            <p>Users</p>
          </div>
          <div onClick={()=>nav('/AProfile')}>
            <UserCircle2 size={22} />
            <p>Profile</p>
          </div>
          <div onClick={()=>{
            localStorage.clear();
            navigate('/');
          }}>
            <LogOut size={22} />
            <p>Logout</p>
          </div>
        </div>
        <div className="usermain">
            <div className="usersearch">
                <input 
                type="text" 
                placeholder="Search here..." 
                value={search}
                onChange={handleSearch}
                />
            </div>
            <div className="userusers">
                {
                    filter.length === 0 
                    ?
                    (
                        <h2>No User Found</h2>
                    )
                    :
                    (
                        filter.map((user)=>(
                            <div className="useruser">
                                <p>UserName : {user.username}</p>
                                <p>Email : {user.email}</p>
                                <p>Role : {user.role}</p>
                                <p>Registered Events : {user.registeredEvents.length}</p>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Users
