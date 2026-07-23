import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Registered.css'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCircle2,
  LogOut,
  ArrowLeft
} from "lucide-react";
const Registered = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [name ,setName] = useState(null);
  useEffect(() => {
    async function getApi() {
      try {
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
        const response = await fetch(
          `http://localhost:3000/eventRoute/getUsersRegistered/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      } catch (err) {
        alert(err.message);
      }
    }

    getApi();
  }, [id, navigate]);

  return (
    <div>
      <div className="navbar">
        <div className="first">
            <button onClick={()=>{
                navigate('/events');
            }} id="madhe"><ArrowLeft size={22} />back</button>
            <p>Registered Users</p>
        </div>
        <div className="info">
            <UserCircle2 size={44} />
            <p>{name?.username}</p>
            <p>{name?.email}</p>
        </div>
      </div>
      <div className="main">
        <h1>Registered Students</h1>

      <div className="users">
        {users.length === 0 ? (
          <h2>No Students Registered</h2>
        ) : (
          users.map((user) => (
            <div key={user._id}>
              <p>Name: {user.username}</p>
              <p>Email: {user.email}</p>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default Registered;
