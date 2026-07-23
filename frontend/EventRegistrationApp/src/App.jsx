import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../student/Login";
import SignIn from "../student/SignIn";
import Dashboard from "../student/Dashboard";
import Home from "../student/Home";
import Browse from "../student/Browse";
import All from "../student/All";
import Profile from "../student/Profile";
import Overview from "../admin/Overview";
import Events from "../admin/Events";
import Users from "../admin/Users";
import Create from "../admin/Create";
import Registered from "../admin/Registered";
import Aprofile from "../admin/Aprofile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignIn />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/browseEvents",
    element: <Browse />,
  },
  {
    path: "/myEvents",
    element: <All />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/overview",
    element: <Overview />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/createEvent",
    element: <Create />,
  },
  {
    path: "/userRegistered/:id",
    element: <Registered />,
  },
  {
    path: "/AProfile",
    element: <Aprofile />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;