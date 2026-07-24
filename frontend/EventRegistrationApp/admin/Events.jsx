import React, { useEffect, useState } from "react";
import "./Events.css";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCircle2,
  LogOut
} from "lucide-react";
import {
  Laptop,
  Drama,
  PartyPopper,
  GraduationCap,
  Shapes,
  Blocks,
  CalendarPlus 
} from "lucide-react";
import { Trophy } from "lucide-react";
const Events = () => {
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  function nav(route) {
    navigate(route);
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);

    const filter = events.filter((event) => {
      return event.name?.toLowerCase().includes(value.toLowerCase());
    });
    setFilter(filter);
  }
  function handleBtn(btnValue) {
    if (btnValue === "All") {
      setFilter(events);
      return;
    }

    const filtered = events.filter((event) =>
      event.eventType.toLowerCase().includes(btnValue.toLowerCase()),
    );

    setFilter(filtered);
  }

  useEffect(() => {
    async function getApi() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const user = JSON.parse(localStorage.getItem("user"));
      setUsers(user);
      console.log(user);

      const response = await fetch(
        "http://feisty-upliftment-production-6040.up.railway.app/eventRoute/getEvent",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      setEvents(data);
      setFilter(data);
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
    }
    getApi();
  }, []);
  function createEvent() {
    navigate("/createEvent");
  }
  
  return (
    <div className="events-page">
      <div className="events-navbar">
        <div className="same">
        <CalendarDays size={50} />
        <h1>Events</h1>
        </div>
        <div className="events-user-info">
          <UserCircle2 size={44} />
          <p>{users?.username}</p>
          <p>{users?.email}</p>
        </div>
      </div>
      <div className="events-layout">
        <div className="events-sidebar">
          <div onClick={() => nav("/overview")}>
            <LayoutDashboard size={22} />
            <p>Overview</p>
          </div>
          <div onClick={() => nav("/events")}>
            <CalendarDays size={22} />
            <p>Events</p>
          </div>
          <div onClick={() => nav("/users")}>
            <Users size={22} />
            <p>Users</p>
          </div>
          <div onClick={() => nav("/AProfile")}>
            <UserCircle2 size={22} />
            <p>Profile</p>
          </div>
          <div onClick={() => {
            localStorage.clear();
            navigate('/');
            
          }}>
            <LogOut size={22} />
            <p>Logout</p>
          </div>
        </div>
        <div className="events-main">
          <div className="events-search-section">
            <input
              type="text"
              placeholder="Search here..."
              onChange={handleSearch}
            />
            <div className="events-filter-buttons">
              <button onClick={() => handleBtn("All")}> <Blocks size={22} /> All</button>
              <button onClick={() => handleBtn("Technical")}> <Laptop size={22} />Technical</button>
              <button onClick={() => handleBtn("Cultural")}> <Drama size={22} />Cultural</button>
              <button onClick={() => handleBtn("Sports")}> <Trophy size={22} />Sports</button>
              <button onClick={() => handleBtn("Fun")}> <PartyPopper size={22} />Fun</button>
              <button onClick={() => handleBtn("Academics")}> <Shapes size={22} />Academics</button>
            </div>
            <div className="events-create-section">
              <button onClick={createEvent}> <CalendarPlus size={22} />Create Event</button>
            </div>
          </div>
          <div>
            {
              <div className="events-grid">
                {filter?.length === 0 ? (
                  <h2>No Events Found</h2>
                ) : (
                  filter?.map((item) => (
                    <div className="events-card" key={item._id}>
                      <img src={item.imgSrc} alt={item.name} />
                      <div className="events-card-content">
                        <h2>Name : {item.name}</h2>
                        <p>Description : {item.description}</p>

                        <div className="events-details">
                          <span>Date : {item.eventDate}</span>
                          <span>Venue : {item.venue}</span>
                          <span>Type : {item.eventType}</span>
                          <span>Deadline: {item.registrationDeadline}</span>
                        </div>

                        <div className="events-bottom">
                          <span>Status : {item.status}</span>
                          <br />
                          <span>
                            Students Registered :{" "}
                            {item.registeredStudents.length} Students
                          </span>
                          <button
                            onClick={() => {
                              navigate(`/userRegistered/${item._id}`);
                            }}
                          >
                            View Registered Students
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
