import React, { useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCircle2,
  LogOut,
  ArrowLeft
} from "lucide-react";
const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [src, setSrc] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [venue, setVenue] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  function calStat(date, dead) {
    const today = new Date().setHours(0, 0, 0, 0);
    const eventDate = new Date(date).setHours(0, 0, 0, 0);
    const deadlineDate = new Date(dead).setHours(0, 0, 0, 0);

    if (today < eventDate) {
      return "upcoming";
    } else if (today <= deadlineDate) {
      return "ongoing";
    } else {
      return "completed";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const status = calStat(date, deadline);

      const response = await fetch(
        "http://feisty-upliftment-production-6040.up.railway.app/eventRoute/postEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
            description: desc,
            imgSrc: src,
            eventDate: date,
            registrationDeadline: deadline,
            venue,
            type,
            createdBy: user.username ,
            status,
            registeredStudents: [],
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      alert("Event Created Successfully");

      setName("");
      setDesc("");
      setSrc("");
      setDate("");
      setDeadline("");
      setVenue("");
      setType("");

      navigate("/events");
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="container">
        <div className="navbar">
        <div className="first">
            <button onClick={()=>{
                navigate('/events');
            }} id="madhe"><ArrowLeft size={22} />back</button>
            <p>Registered Users</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Event Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <div className="two">
          <label>Event Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="two">
          <label>Registration Deadline</label>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Enter Image URL..."
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Venue..."
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Event Type..."
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />

        <button type="submit">
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default Create;
