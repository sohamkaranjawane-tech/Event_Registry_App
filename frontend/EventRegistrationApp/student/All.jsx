import React, { useEffect, useState } from "react";
import "./All.css";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard as Dashboard,
  UserCircle2 as Profile,
  LogOut as Logout,
  Search as BrowseEvents,
  CalendarCheck2 as MyEvents,
} from "lucide-react";

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getApi() {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://feisty-upliftment-production-6040.up.railway.app/authRoute/getUser/${user.id}`,
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

        setEvents(data.registeredEvents || []);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }

    getApi();
  }, [navigate]);

  function nav(route) {
    navigate(route);
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="myevents-container">
      <div className="myevents-navbar">
        <div className="myevents-nav-left">
          <MyEvents size={50} className="myevents-nav-icon" />
          <h1 id="myevents-heading">My Events</h1>
        </div>

        <div className="myevents-nav-right">
          <Profile size={44} className="myevents-profile-icon" />
          <div className="myevents-user-info">
            <p className="myevents-username">{user.username}</p>
            <p className="myevents-useremail">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="myevents-main-layout">
        <div className="myevents-sidebar">
          <div onClick={() => nav("/dashboard")} className="myevents-sidebar-item">
            <Dashboard size={22} />
            <p>Dashboard</p>
          </div>

          <div onClick={() => nav("/browseEvents")} className="myevents-sidebar-item">
            <BrowseEvents size={22} />
            <p>Browse Events</p>
          </div>

          <div onClick={() => nav("/myEvents")} className="myevents-sidebar-item active">
            <MyEvents size={22} />
            <p>My Events</p>
          </div>

          <div onClick={() => nav("/profile")} className="myevents-sidebar-item">
            <Profile size={22} />
            <p>Profile</p>
          </div>

          <div
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="myevents-sidebar-item"
          >
            <Logout size={22} />
            <p>Logout</p>
          </div>
        </div>
        <div className="myevents-content">
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
          </div>
          {events.length === 0 ? (
            <div className="myevents-empty-state">
              <MyEvents size={80} className="myevents-empty-icon" />
              <h2 className="myevents-empty-title">No Events Added Yet</h2>
              <p className="myevents-empty-subtitle">Start browsing and register for events!</p>
              <button 
                onClick={() => nav("/browseEvents")}
                className="myevents-empty-btn"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="myevents-grid">
              {events.map((event) => (
                <div className="myevents-event-card" key={event._id}>
                  <img src={event.imgSrc} alt={event.name} className="myevents-event-image" />
                  <h2 className="myevents-event-title">{event.name}</h2>
                  <p className="myevents-event-description">{event.description}</p>

                  <div className="myevents-event-details">
                    <span>Event Date: {event.eventDate}</span>
                    <span>Registration Deadline: {event.registrationDeadline}</span>
                    <span>Venue: {event.venue}</span>
                    <span>Type: {event.eventType}</span>
                    <span>Created By: {event.createdBy}</span>
                    <span>Students Registered: {event.registeredStudents?.length || 0}</span>
                    <span className="myevents-event-status">Status: {event.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEventsPage;