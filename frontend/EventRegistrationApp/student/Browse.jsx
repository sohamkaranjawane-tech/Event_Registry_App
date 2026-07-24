import React, { useEffect, useState } from "react";
import "./Browse.css";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard as Dashboard,
  UserCircle2 as Profile,
  LogOut as Logout,
  Search as BrowseEvents,
  CalendarCheck2 as MyEvents,
  ClipboardPlus as RegisterNow,
  Code2 as Technical,
  Drama as Cultural,
  LayoutGrid as All,
  GraduationCap as Academics,
  PartyPopper as Fun,
  Shapes as Others,
} from "lucide-react";
import { Trophy } from "lucide-react";

const Browse = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [fil, setFil] = useState([]);
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
        setFil(data);
      } catch (err) {
        alert(err.message);
      }
    }

    getApi();
  }, [navigate]);

  function nav(route) {
    navigate(route);
  }

  function handleCategory(type) {
    setCategory(type);

    const filtered = events.filter((event) => {
      const match = event.name?.toLowerCase().includes(search.toLowerCase());
      const cat =
        type === "All" ||
        event.eventType?.toLowerCase().includes(type.toLowerCase());
      return match && cat;
    });

    setFil(filtered);
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);

    const filtered = events.filter((event) => {
      const match = event.name?.toLowerCase().includes(value.toLowerCase());
      const cat =
        category === "All" ||
        event.eventType?.toLowerCase().includes(category.toLowerCase());
      return match && cat;
    });

    setFil(filtered);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login");
    return null;
  }

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

  return (
    <div className="browse-container">
      <div className="browse-navbar">
        <div className="browse-nav-left">
          <BrowseEvents size={50} className="browse-nav-icon" />
          <h1 id="browse-heading">Browse Events</h1>
        </div>

        <div className="browse-nav-right">
          <Profile size={44} className="browse-profile-icon" />
          <div className="browse-user-info">
            <p className="browse-username">{user.username}</p>
            <p className="browse-useremail">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="browse-main-layout">
        <div className="browse-sidebar">
          <div onClick={() => nav("/dashboard")} className="browse-sidebar-item">
            <Dashboard size={22} />
            <p>Dashboard</p>
          </div>

          <div onClick={() => nav("/browseEvents")} className="browse-sidebar-item active">
            <BrowseEvents size={22} />
            <p>Browse Events</p>
          </div>

          <div onClick={() => nav("/myEvents")} className="browse-sidebar-item">
            <MyEvents size={22} />
            <p>My Events</p>
          </div>

          <div onClick={() => nav("/profile")} className="browse-sidebar-item">
            <Profile size={22} />
            <p>Profile</p>
          </div>

          <div
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="browse-sidebar-item"
          >
            <Logout size={22} />
            <p>Logout</p>
          </div>
        </div>

        <div className="browse-content">
          <marquee
            className="browse-announcement"
            behavior="scroll"
            direction="left"
            scrollamount="6"
            onMouseEnter={(e) => e.currentTarget.stop()}
            onMouseLeave={(e) => e.currentTarget.start()}
          >
            Available Events: Technical • Cultural • Sports • Workshops •
            Seminars • Hackathons • Competitions
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;  To Register: Open an event
            card  Click <strong>Register</strong>  Confirm your participation
            before the registration deadline.
          </marquee>

          <div className="browse-search-section">
            <input
              type="text"
              placeholder="Search here...."
              value={search}
              onChange={handleSearch}
              className="browse-search-input"
            />

            <div className="browse-category-buttons">
              <button onClick={() => handleCategory("All")} className={category === "All" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <All size={22} />
                All
              </button>

              <button onClick={() => handleCategory("Technical")} className={category === "Technical" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <Technical size={22} />
                Technical
              </button>

              <button onClick={() => handleCategory("Cultural")} className={category === "Cultural" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <Cultural size={22} />
                Cultural
              </button>

              <button onClick={() => handleCategory("Academics")} className={category === "Academics" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <Academics size={22} />
                Academics
              </button>

              <button onClick={() => handleCategory("Fun")} className={category === "Fun" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <Fun size={22} />
                Fun
              </button>

              <button onClick={() => handleCategory("Sports")} className={category === "Sports" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <Trophy size={22} />
                Sports
              </button>

              <button onClick={() => handleCategory("Other")} className={category === "Other" ? "browse-cat-btn active" : "browse-cat-btn"}>
                <Others size={22} />
                Other
              </button>
            </div>
          </div>

          <div className="browse-events-grid">
            {fil.length > 0 ? (
              fil.map((event) => {
                const registrationClosed = new Date(event.registrationDeadline) < new Date();
                return (
                  <div className="browse-event-card" key={event._id}>
                    <img src={event.imgSrc} alt={event.name} className="browse-event-image" />
                    <h2 className="browse-event-title">Name: {event.name}</h2>
                    <p className="browse-event-description">Description: {event.description}</p>

                    <div className="browse-event-details">
                      <span>Event Date: {event.eventDate}</span>
                      <span>Registration Deadline: {event.registrationDeadline}</span>
                      <span>Venue: {event.venue}</span>
                      <span>Type: {event.eventType}</span>
                      <span>Created By: {event.createdBy}</span>
                      <span>Students Registered: {event.registeredStudents?.length || 0}</span>
                      <span className="browse-event-status">Status: {event.status}</span>
                    </div>

                    <button
                      disabled={registrationClosed}
                      onClick={() => addItem(event._id)}
                      className="browse-register-btn"
                    >
                      {registrationClosed ? "Registration Closed" : "Register Now"}
                    </button>
                  </div>
                );
              })
            ) : (
              <h2 className="browse-no-events">No Events Found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;