import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  LayoutDashboard as Dashboard,
  UserCircle2 as ProfileIcon,
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

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      const token = localStorage.getItem("token");
      const use = JSON.parse(localStorage.getItem('user'));
      if (!token || !use) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(
          "http://feisty-upliftment-production-6040.up.railway.app/authRoute/profile",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setUser(data);
      } catch (err) {
        alert(err.message);
      }
    }
    getProfile();
  }, [navigate]);

  if (!user) {
    return (
      <div className="profile-loading-container">
        <div className="profile-loading-spinner"></div>
        <h2 className="profile-loading-text">Loading ...</h2>
      </div>
    );
  }

  function nav(route) {
    navigate(route);
  }

  return (
    <div className="profile-container">
      <div className="profile-navbar">
        <div className="profile-nav-left">
          <ProfileIcon size={50} className="profile-nav-icon" />
          <h1 id="profile-heading">Profile</h1>
        </div>

        <div className="profile-nav-right">
          <ProfileIcon size={44} className="profile-profile-icon" />
          <div className="profile-user-info">
            <p className="profile-username">{user.username}</p>
            <p className="profile-useremail">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="profile-main-layout">
        <div className="profile-sidebar">
          <div onClick={() => nav("/dashboard")} className="profile-sidebar-item">
            <Dashboard size={22} />
            <p>Dashboard</p>
          </div>

          <div onClick={() => nav("/browseEvents")} className="profile-sidebar-item">
            <BrowseEvents size={22} />
            <p>Browse Events</p>
          </div>

          <div onClick={() => nav("/myEvents")} className="profile-sidebar-item">
            <MyEvents size={22} />
            <p>My Events</p>
          </div>

          <div onClick={() => nav("/profile")} className="profile-sidebar-item active">
            <ProfileIcon size={22} />
            <p>Profile</p>
          </div>

          <div
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="profile-sidebar-item"
          >
            <Logout size={22} />
            <p>Logout</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <ProfileIcon size={80} className="profile-avatar-icon" />
            </div>
            
            <div className="profile-details">
              <div className="profile-detail-item">
                <span className="profile-detail-label">Name</span>
                <span className="profile-detail-value">{user.username}</span>
              </div>
              
              <div className="profile-detail-item">
                <span className="profile-detail-label">Email</span>
                <span className="profile-detail-value">{user.email}</span>
              </div>
              
              <div className="profile-detail-item">
                <span className="profile-detail-label">Role</span>
                <span className="profile-detail-value profile-role-badge">{user.role}</span>
              </div>
              
              <div className="profile-detail-item">
                <span className="profile-detail-label">Events Registered</span>
                <span className="profile-detail-value profile-events-count">
                  {user.registeredEvents?.length === 0
                    ? "No Events Registered"
                    : `${user.registeredEvents?.length || 0} Events`}
                </span>
              </div>

              {user.registeredEvents?.length > 0 && (
                <div className="profile-events-list">
                  <h4 className="profile-events-title">Registered Events</h4>
                  <ul className="profile-events-ul">
                    {user.registeredEvents.map((event, index) => (
                      <li key={index} className="profile-event-item">
                        <span className="profile-event-number">{index + 1}.</span>
                        {event.name || `Event ${index + 1}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;