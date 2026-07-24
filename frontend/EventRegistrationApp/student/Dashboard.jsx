import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  UserCircle2 as Profile,
  LogOut as Logout,
  Search as BrowseEvents,
  CalendarCheck2 as MyEvents,
} from "lucide-react";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getApi() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(
          "http://feisty-upliftment-production-6040.up.railway.app/eventRoute/getEvent",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setEvents(data);
      } catch (err) {
        alert(err.message);
      }
    }

    getApi();
  }, [navigate]);

  async function addItem(eventId) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await fetch(
        `http://feisty-upliftment-production-6040.up.railway.app/eventRoute/addEvent/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            registerEvent: eventId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Event Registered Successfully!");
    } catch (err) {
      alert(err.message);
    }
  }

  function nav(route) {
    navigate(route);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dash-container">
      <div className="dash-navbar">
        <div className="dash-nav-left">
          <DashboardIcon size={50} className="dash-nav-icon" />
          <h1 id="dash-heading">Dashboard</h1>
        </div>
        
        <div className="dash-nav-right">
          <Profile size={44} className="dash-profile-icon" />
          <div className="dash-user-info">
            <p className="dash-username">{user.username}</p>
            <p className="dash-useremail">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="dash-main-layout">
        <div className="dash-sidebar">
          <div onClick={() => nav("/dashboard")} className="dash-sidebar-item active">
            <DashboardIcon size={22} />
            <p>Dashboard</p>
          </div>
          <div onClick={() => nav("/browseEvents")} className="dash-sidebar-item">
            <BrowseEvents size={22} />
            <p>Browse Events</p>
          </div>
          <div onClick={() => nav("/myEvents")} className="dash-sidebar-item">
            <MyEvents size={22} />
            <p>My Events</p>
          </div>
          <div onClick={() => nav("/profile")} className="dash-sidebar-item">
            <Profile size={22} />
            <p>Profile</p>
          </div>
          <div
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="dash-sidebar-item"
          >
            <Logout size={22} />
            <p>Logout</p>
          </div>
        </div>

        <div className="dash-content">
          <marquee
            className="dash-announcement"
            behavior="scroll"
            direction="left"
            scrollamount="6"
            onMouseEnter={(e) => e.currentTarget.stop()}
            onMouseLeave={(e) => e.currentTarget.start()}
          >
            Available Events: Technical • Cultural • Sports • Workshops •
            Seminars • Hackathons • Competitions
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; To Register: Open an event
            card → Click <strong>Register</strong>  Confirm your participation
            before the registration deadline.
          </marquee>

          <div className="dash-events-grid">
            {events.map((event) => {
              const registrationClosed = new Date(event.registrationDeadline) < new Date();
              return (
                <div className="dash-event-card" key={event._id}>
                  <img src={event.imgSrc} alt={event.name} className="dash-event-image" />
                  <h2 className="dash-event-title">Name: {event.name}</h2>
                  <p className="dash-event-description">Description: {event.description}</p>

                  <div className="dash-event-details">
                    <span>Event Date: {event.eventDate}</span>
                    <span>Registration Deadline: {event.registrationDeadline}</span>
                    <span>Venue: {event.venue}</span>
                    <span>Type: {event.eventType}</span>
                    <span>Created By: {event.createdBy}</span>
                    <span className="dash-event-status">
                      Registered Students: {event.registeredStudents?.length || 0}
                    </span>
                  </div>

                  <button
                    disabled={registrationClosed}
                    onClick={() => addItem(event._id)}
                    className="dash-register-btn"
                  >
                    {registrationClosed ? "Registration Closed" : "Register Now"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;