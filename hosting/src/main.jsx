import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page.jsx";
import { Auth } from "./Components/Auth.jsx";
import NavBar from "./Components/navbar.jsx";
import Rooms from "./Components/Rooms.jsx";
import RoomPage from "./routes/roomPage.jsx";
import Account from "./Components/Account.jsx";

const router = createBrowserRouter([
  //Router Paths. All the paths are currently children of NavBar so the NavBar is always showing. Can be
  //changed if needed, though.
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/room/:roomID",
        element: <RoomPage />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
