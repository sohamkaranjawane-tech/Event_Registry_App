import React, { useEffect, useState } from "react";
import "./Overview.css";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCircle2,
  LogOut
} from "lucide-react";
import {
  ClipboardCheck,
  IndianRupee
} from "lucide-react";
const Overview = () => {
  const [users, setUsers] = useState(null);
  const [event, setEvent] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const [reg, setReg] = useState(0);
  const [rev, setRev] = useState(0);
  const navigate = useNavigate();

  function nav(route) {
    navigate(route);
  }

  function total(usersList) {
    let registration = 0;
    let revenue = 0;
    if (Array.isArray(usersList)) {
      usersList.forEach((item) => {
        if (item.registeredEvents) {
          registration += item.registeredEvents.length;
        }
      });
    }
    revenue = registration * 100;
    return { registration, revenue };
  }

  useEffect(() => {
    async function getApi() {
      const user = JSON.parse(localStorage.getItem("user"));
      setUsers(user);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://feisty-upliftment-production-6040.up.railway.app/eventRoute/getEvent", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEvent(data);

        const userResponse = await fetch("https://feisty-upliftment-production-6040.up.railway.app/authRoute/getAllUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userdata = await userResponse.json();
        setTotalUser(userdata);

        const { registration, revenue } = total(userdata);
        setReg(registration);
        setRev(revenue);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }
    getApi();
  }, [navigate]);
  
  return (
    <div className="overview-container">
      <header className="navbar">
        <div className="same">
          <LayoutDashboard size={50} /><h1 className="navbar-title">Dashboard Overview</h1>
        </div>
        <div className="user-profile">
          <div className="user-info">
            <UserCircle2 size={44} />
            <span className="username">{users?.username || "Admin User"}</span>
            <span className="email">{users?.email || "admin@campus.edu"}</span>
          </div>
        </div>
      </header>

      <div className="dashboard-body">
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
          <div onClick={()=>{
            localStorage.clear();
            navigate('/')
          }}>
            <LogOut size={22} />
            <p>Logout</p>
          </div>
        </div>

        <main className="usercontent">
          <section className="welcome-banner">
            <h2>Welcome back, {users?.username || "Admin"}! </h2>
            <p>Here's a quick summary of what's happening on your campus today.</p>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <span className="stat-title">Total Events</span> <CalendarDays size={30} />
              <span className="stat-value">{event?.length || 0}</span>
            </div>

            <div className="stat-card">
              <span className="stat-title">Total Users</span> <Users size={30} />
              <span className="stat-value">{totalUser?.length || 0}</span>
            </div>

            <div className="stat-card">
              <span className="stat-title">Total Registrations</span> <ClipboardCheck size={30} />
              <span className="stat-value">{reg}</span>
            </div>

            <div className="stat-card">
              <span className="stat-title">Total Revenue</span> <IndianRupee size={30} />
              <span className="stat-value">₹{rev.toLocaleString()}</span>
            </div>
          </section>

          {/* Descriptive Cards */}
          <section className="usersection">
            <div className="usercard">
              <h3>Campus Event Management System</h3>
              <p>
                A centralized platform designed to simplify the organization and management
                of campus events. It enables administrators to create, update, and monitor
                events while providing students with an easy way to discover, register for,
                and participate in various technical, cultural, sports, and academic activities.
              </p>
            </div>

            <div className="usercard">
              <h3>Admin Dashboard</h3>
              <p>
                Serves as the central control panel for managing all campus events and users.
                It provides quick access to event statistics, user management, registrations, and
                system insights, allowing administrators to monitor activities efficiently and make
                informed decisions.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Overview;